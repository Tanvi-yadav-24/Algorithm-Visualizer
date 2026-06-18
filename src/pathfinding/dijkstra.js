import { getNeighbors, reconstructPath } from './gridHelpers';

// Dijkstra's Algorithm
export function dijkstra(grid, startNode, endNode) {
  const visitedOrder = [];
  const parent = {};
  const dist = {};
  const unvisited = [];

  // Init distances
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      const key = `${r}-${c}`;
      dist[key] = Infinity;
    }
  }

  const startKey = `${startNode.row}-${startNode.col}`;
  dist[startKey] = 0;
  unvisited.push({ ...startNode, dist: 0 });

  while (unvisited.length > 0) {
    // Sort by distance (simple priority queue)
    unvisited.sort((a, b) => a.dist - b.dist);
    const current = unvisited.shift();
    const currentKey = `${current.row}-${current.col}`;

    if (current.isWall) continue;
    if (dist[currentKey] === Infinity) break;

    visitedOrder.push(current);

    if (current.row === endNode.row && current.col === endNode.col) {
      return { visitedOrder, path: reconstructPath(parent, endNode) };
    }

    const neighbors = getNeighbors(current, grid);
    for (const neighbor of neighbors) {
      if (neighbor.isWall) continue;
      const nKey = `${neighbor.row}-${neighbor.col}`;
      const newDist = dist[currentKey] + 1;
      if (newDist < dist[nKey]) {
        dist[nKey] = newDist;
        parent[nKey] = current;
        unvisited.push({ ...neighbor, dist: newDist });
      }
    }
  }

  return { visitedOrder, path: [] };
}

export const dijkstraInfo = {
  name: "Dijkstra's",
  fullName: "Dijkstra's Algorithm",
  weighted: true,
  guaranteed: true,
  timeComplexity: 'O(V²)',
  spaceComplexity: 'O(V)',
  description: "Explores nodes in order of their distance from the start. Guarantees the shortest path. The gold standard for weighted graphs.",
};
