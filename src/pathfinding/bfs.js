import { getNeighbors, reconstructPath } from './gridHelpers';

// BFS - Breadth First Search
// Returns { visitedOrder: [{row,col}], path: [{row,col}] }

export function bfs(grid, startNode, endNode) {
  const visitedOrder = [];
  const queue = [startNode];
  const visited = new Set();
  const parent = {};

  visited.add(`${startNode.row}-${startNode.col}`);

  while (queue.length > 0) {
    const current = queue.shift();
    visitedOrder.push(current);

    if (current.row === endNode.row && current.col === endNode.col) {
      return { visitedOrder, path: reconstructPath(parent, endNode) };
    }

    const neighbors = getNeighbors(current, grid);
    for (const neighbor of neighbors) {
      const key = `${neighbor.row}-${neighbor.col}`;
      if (!visited.has(key) && !neighbor.isWall) {
        visited.add(key);
        parent[key] = current;
        queue.push(neighbor);
      }
    }
  }

  return { visitedOrder, path: [] };
}

export const bfsInfo = {
  name: 'BFS',
  fullName: 'Breadth-First Search',
  weighted: false,
  guaranteed: true,
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V)',
  description: 'Explores all nodes at the current depth before moving to the next level. Guarantees the shortest path on unweighted grids.',
};
