import { useState, useRef, useCallback } from 'react';
import { createGrid } from '../pathfinding/gridHelpers';
import { bfs, bfsInfo } from '../pathfinding/bfs';
import { dfs, dfsInfo } from '../pathfinding/dfs';
import { dijkstra, dijkstraInfo } from '../pathfinding/dijkstra';
import { astar, astarInfo } from '../pathfinding/astar';

const ROWS = 20;
const COLS = 45;
const START = { row: 10, col: 5 };
const END   = { row: 10, col: 39 };

const ALGO_MAP = {
  bfs:      { fn: bfs,      info: bfsInfo },
  dfs:      { fn: dfs,      info: dfsInfo },
  dijkstra: { fn: dijkstra, info: dijkstraInfo },
  astar:    { fn: astar,    info: astarInfo },
};

function makeGrid() {
  const grid = createGrid(ROWS, COLS);
  grid[START.row][START.col].isStart = true;
  grid[END.row][END.col].isEnd = true;
  return grid;
}

export function usePathfinder() {
  const [grid, setGrid] = useState(makeGrid);
  const [algorithm, setAlgorithm] = useState('bfs');
  const [speed, setSpeed] = useState(15);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [stats, setStats] = useState({ visited: 0, pathLength: 0 });
  const [mouseMode, setMouseMode] = useState(null); // 'wall' | 'erase' | 'moveStart' | 'moveEnd'

  const timerRef = useRef(null);
  const isMouseDown = useRef(false);

  const algoInfo = ALGO_MAP[algorithm].info;

  // ---- Grid helpers ----
  const updateCell = useCallback((r, c, updates) => {
    setGrid(prev => {
      const next = prev.map(row => row.map(cell => ({ ...cell })));
      Object.assign(next[r][c], updates);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    clearTimeout(timerRef.current);
    setIsRunning(false);
    setIsDone(false);
    setStats({ visited: 0, pathLength: 0 });
    setGrid(makeGrid());
  }, []);

  const clearPath = useCallback(() => {
    clearTimeout(timerRef.current);
    setIsRunning(false);
    setIsDone(false);
    setStats({ visited: 0, pathLength: 0 });
    setGrid(prev =>
      prev.map(row =>
        row.map(cell => ({
          ...cell,
          isVisited: false,
          isPath: false,
        }))
      )
    );
  }, []);

  // ---- Mouse interactions for drawing walls ----
  const handleMouseDown = useCallback((r, c) => {
    if (isRunning) return;
    isMouseDown.current = true;
    const cell = grid[r][c];
    if (cell.isStart || cell.isEnd) return;

    const newMode = cell.isWall ? 'erase' : 'wall';
    setMouseMode(newMode);
    updateCell(r, c, { isWall: !cell.isWall });
  }, [grid, isRunning, updateCell]);

  const handleMouseEnter = useCallback((r, c) => {
    if (!isMouseDown.current || isRunning) return;
    const cell = grid[r][c];
    if (cell.isStart || cell.isEnd) return;
    updateCell(r, c, { isWall: mouseMode === 'wall' });
  }, [grid, isRunning, mouseMode, updateCell]);

  const handleMouseUp = useCallback(() => {
    isMouseDown.current = false;
    setMouseMode(null);
  }, []);

  // ---- Run animation ----
  const runAnimation = useCallback((visitedOrder, path, speedMs, idx) => {
    if (idx < visitedOrder.length) {
      const { row, col } = visitedOrder[idx];
      setGrid(prev => {
        const next = prev.map(r => r.map(c => ({ ...c })));
        if (!next[row][col].isStart && !next[row][col].isEnd) {
          next[row][col].isVisited = true;
        }
        return next;
      });
      setStats(s => ({ ...s, visited: idx + 1 }));
      timerRef.current = setTimeout(
        () => runAnimation(visitedOrder, path, speedMs, idx + 1),
        speedMs
      );
    } else {
      // Animate path
      animatePath(path, speedMs, 0);
    }
  }, []);

  const animatePath = useCallback((path, speedMs, idx) => {
    if (idx < path.length) {
      const { row, col } = path[idx];
      setGrid(prev => {
        const next = prev.map(r => r.map(c => ({ ...c })));
        if (!next[row][col].isStart && !next[row][col].isEnd) {
          next[row][col].isPath = true;
        }
        return next;
      });
      setStats(s => ({ ...s, pathLength: idx + 1 }));
      timerRef.current = setTimeout(
        () => animatePath(path, speedMs, idx + 1),
        speedMs * 3
      );
    } else {
      setIsRunning(false);
      setIsDone(true);
    }
  }, []);

  const start = useCallback(() => {
    if (isDone) return;
    clearPath();

    setTimeout(() => {
      setGrid(prev => {
        const flatGrid = prev;
        const startNode = flatGrid[START.row][START.col];
        const endNode   = flatGrid[END.row][END.col];

        const { visitedOrder, path } = ALGO_MAP[algorithm].fn(flatGrid, startNode, endNode);
        setIsRunning(true);
        runAnimation(visitedOrder, path, speed, 0);
        return prev;
      });
    }, 50);
  }, [algorithm, clearPath, isDone, runAnimation, speed]);

  const pause = useCallback(() => {
    clearTimeout(timerRef.current);
    setIsRunning(false);
  }, []);

  const handleAlgoChange = useCallback((algo) => {
    clearPath();
    setAlgorithm(algo);
  }, [clearPath]);

  return {
    grid, algorithm, speed, isRunning, isDone, stats, algoInfo,
    setSpeed, handleAlgoChange,
    handleMouseDown, handleMouseEnter, handleMouseUp,
    start, pause, reset, clearPath,
    ROWS, COLS,
  };
}
