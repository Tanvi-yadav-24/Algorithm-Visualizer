// Shared helpers used by all pathfinding algorithms

export function getNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;
  const rows = grid.length;
  const cols = grid[0].length;

  if (row > 0)        neighbors.push(grid[row - 1][col]);
  if (row < rows - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0)        neighbors.push(grid[row][col - 1]);
  if (col < cols - 1) neighbors.push(grid[row][col + 1]);

  return neighbors;
}

export function reconstructPath(parent, endNode) {
  const path = [];
  let current = endNode;
  while (current) {
    path.unshift(current);
    const key = `${current.row}-${current.col}`;
    current = parent[key];
  }
  return path.length > 1 ? path : [];
}

export function createGrid(rows, cols) {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      row: r,
      col: c,
      isWall: false,
      isStart: false,
      isEnd: false,
    }))
  );
}
