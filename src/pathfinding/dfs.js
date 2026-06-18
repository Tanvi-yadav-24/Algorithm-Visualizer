import { getNeighbors, reconstructPath } from './gridHelpers';

// DFS - Depth First Search
export function dfs(grid, startNode, endNode) {
  const visitedOrder = [];
  const visited = new Set();
  const parent = {};

  function dfsHelper(node) {
    const key = `${node.row}-${node.col}`;
    if (visited.has(key)) return false;
    visited.add(key);
    visitedOrder.push(node);

    if (node.row === endNode.row && node.col === endNode.col) return true;

    const neighbors = getNeighbors(node, grid);
    for (const neighbor of neighbors) {
      const nKey = `${neighbor.row}-${neighbor.col}`;
      if (!visited.has(nKey) && !neighbor.isWall) {
        parent[nKey] = node;
        if (dfsHelper(neighbor)) return true;
      }
    }
    return false;
  }

  dfsHelper(startNode);
  return { visitedOrder, path: reconstructPath(parent, endNode) };
}

export const dfsInfo = {
  name: 'DFS',
  fullName: 'Depth-First Search',
  weighted: false,
  guaranteed: false,
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V)',
  description: 'Explores as far as possible along each branch before backtracking. Does NOT guarantee the shortest path.',
};
