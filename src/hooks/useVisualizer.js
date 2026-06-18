import { useState, useRef, useCallback } from 'react';
import { getBubbleSortAnimations, bubbleSortInfo } from '../algorithms/bubbleSort';
import { getSelectionSortAnimations, selectionSortInfo } from '../algorithms/selectionSort';
import { getInsertionSortAnimations, insertionSortInfo } from '../algorithms/insertionSort';
import { getMergeSortAnimations, mergeSortInfo } from '../algorithms/mergeSort';
import { getQuickSortAnimations, quickSortInfo } from '../algorithms/quickSort';

const ALGO_MAP = {
  bubble:    { fn: getBubbleSortAnimations,    info: bubbleSortInfo },
  selection: { fn: getSelectionSortAnimations, info: selectionSortInfo },
  insertion: { fn: getInsertionSortAnimations, info: insertionSortInfo },
  merge:     { fn: getMergeSortAnimations,     info: mergeSortInfo },
  quick:     { fn: getQuickSortAnimations,     info: quickSortInfo },
};

function generateArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
}

export function useVisualizer() {
  const [arraySize, setArraySize] = useState(40);
  const [array, setArray] = useState(() => generateArray(40));
  const [colorMap, setColorMap] = useState({});   // index -> color class
  const [algorithm, setAlgorithm] = useState('bubble');
  const [speed, setSpeed] = useState(50);          // ms delay
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0 });

  const rafRef = useRef(null);
  const frameRef = useRef(0);
  const animationsRef = useRef([]);
  const statsRef = useRef({ comparisons: 0, swaps: 0 });

  const algoInfo = ALGO_MAP[algorithm].info;

  const reset = useCallback((size = arraySize) => {
    cancelAnimationFrame(rafRef.current);
    setIsRunning(false);
    setIsDone(false);
    setColorMap({});
    setStats({ comparisons: 0, swaps: 0 });
    const newArr = generateArray(size);
    setArray(newArr);
    frameRef.current = 0;
    animationsRef.current = [];
    statsRef.current = { comparisons: 0, swaps: 0 };
  }, [arraySize]);

  const handleSizeChange = useCallback((newSize) => {
    setArraySize(newSize);
    reset(newSize);
  }, [reset]);

  const handleAlgoChange = useCallback((algo) => {
    setAlgorithm(algo);
    cancelAnimationFrame(rafRef.current);
    setIsRunning(false);
    setIsDone(false);
    setColorMap({});
    setStats({ comparisons: 0, swaps: 0 });
    frameRef.current = 0;
    animationsRef.current = [];
    statsRef.current = { comparisons: 0, swaps: 0 };
  }, []);

  const runAnimation = useCallback((frames, startFrame, arr, speedMs) => {
    if (startFrame >= frames.length) {
      setIsRunning(false);
      setIsDone(true);
      return;
    }

    const frame = frames[startFrame];

    // Update array state
    if (frame.array) setArray(frame.array);

    // Update color map
    setColorMap(prev => {
      const next = { ...prev };
      // Clear previous compare/swap/pivot highlights
      Object.keys(next).forEach(k => {
        if (next[k] === 'compare' || next[k] === 'swap' || next[k] === 'pivot') {
          delete next[k];
        }
      });

      if (frame.type === 'compare') {
        frame.indices.forEach(i => { next[i] = 'compare'; });
        statsRef.current.comparisons++;
        setStats(s => ({ ...s, comparisons: s.comparisons + 1 }));
      } else if (frame.type === 'swap') {
        frame.indices.forEach(i => { next[i] = 'swap'; });
        statsRef.current.swaps++;
        setStats(s => ({ ...s, swaps: s.swaps + 1 }));
      } else if (frame.type === 'sorted') {
        frame.indices.forEach(i => { next[i] = 'sorted'; });
      } else if (frame.type === 'pivot') {
        frame.indices.forEach(i => { next[i] = 'pivot'; });
      } else if (frame.type === 'done') {
        // Mark everything sorted
        arr.forEach((_, i) => { next[i] = 'sorted'; });
      }
      return next;
    });

    frameRef.current = startFrame + 1;
    rafRef.current = setTimeout(
      () => runAnimation(frames, startFrame + 1, arr, speedMs),
      speedMs
    );
  }, []);

  const start = useCallback(() => {
    if (isDone) return;

    if (animationsRef.current.length === 0) {
      // First run — generate all frames
      animationsRef.current = ALGO_MAP[algorithm].fn(array);
      frameRef.current = 0;
    }

    setIsRunning(true);
    runAnimation(animationsRef.current, frameRef.current, array, speed);
  }, [algorithm, array, isDone, runAnimation, speed]);

  const pause = useCallback(() => {
    clearTimeout(rafRef.current);
    setIsRunning(false);
  }, []);

  return {
    array,
    colorMap,
    algorithm,
    arraySize,
    speed,
    isRunning,
    isDone,
    stats,
    algoInfo,
    setSpeed,
    handleAlgoChange,
    handleSizeChange,
    start,
    pause,
    reset: () => reset(arraySize),
  };
}
