import { getNeighbors, reconstructPath } from './gridHelpers';

// A* Algorithm
function heuristic(a, b) {
  // Manhattan distance
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export function astar(grid, startNode, endNode) {
  const visitedOrder = [];
  const parent = {};
  const gScore = {};
  const fScore = {};
  const open = [];
  const openSet = new Set();
  const closed = new Set();

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      gScore[`${r}-${c}`] = Infinity;
      fScore[`${r}-${c}`] = Infinity;
    }
  }

  const startKey = `${startNode.row}-${startNode.col}`;
  gScore[startKey] = 0;
  fScore[startKey] = heuristic(startNode, endNode);
  open.push({ ...startNode, f: fScore[startKey] });
  openSet.add(startKey);

  while (open.length > 0) {
    open.sort((a, b) => a.f - b.f);
    const current = open.shift();
    const currentKey = `${current.row}-${current.col}`;
    openSet.delete(currentKey);

    if (closed.has(currentKey)) continue;
    closed.add(currentKey);

    if (current.isWall) continue;
    visitedOrder.push(current);

    if (current.row === endNode.row && current.col === endNode.col) {
      return { visitedOrder, path: reconstructPath(parent, endNode) };
    }

    const neighbors = getNeighbors(current, grid);
    for (const neighbor of neighbors) {
      if (neighbor.isWall) continue;
      const nKey = `${neighbor.row}-${neighbor.col}`;
      if (closed.has(nKey)) continue;

      const tentativeG = gScore[currentKey] + 1;
      if (tentativeG < gScore[nKey]) {
        parent[nKey] = current;
        gScore[nKey] = tentativeG;
        fScore[nKey] = tentativeG + heuristic(neighbor, endNode);
        if (!openSet.has(nKey)) {
          open.push({ ...neighbor, f: fScore[nKey] });
          openSet.add(nKey);
        }
      }
    }
  }

  return { visitedOrder, path: [] };
}

export const astarInfo = {
  name: 'A*',
  fullName: 'A* Search',
  weighted: true,
  guaranteed: true,
  timeComplexity: 'O(E log V)',
  spaceComplexity: 'O(V)',
  description: 'Uses a heuristic (Manhattan distance) to guide the search toward the goal. Faster than Dijkstra\'s in practice. Guarantees shortest path.',
};
