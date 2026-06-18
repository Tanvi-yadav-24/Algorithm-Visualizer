export function getQuickSortAnimations(arr) {
  const animations = [];
  const array = [...arr];
  quickSortHelper(array, 0, array.length - 1, animations);
  animations.push({ type: 'done', indices: [], array: [...array] });
  return animations;
}

function quickSortHelper(array, low, high, animations) {
  if (low < high) {
    const pivotIndex = partition(array, low, high, animations);
    animations.push({ type: 'sorted', indices: [pivotIndex], array: [...array] });
    quickSortHelper(array, low, pivotIndex - 1, animations);
    quickSortHelper(array, pivotIndex + 1, high, animations);
  } else if (low === high) {
    animations.push({ type: 'sorted', indices: [low], array: [...array] });
  }
}

function partition(array, low, high, animations) {
  const pivot = array[high];
  animations.push({ type: 'pivot', indices: [high], array: [...array] });
  let i = low - 1;

  for (let j = low; j < high; j++) {
    animations.push({ type: 'compare', indices: [j, high], array: [...array] });
    if (array[j] <= pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      if (i !== j) {
        animations.push({ type: 'swap', indices: [i, j], array: [...array] });
      }
    }
  }

  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  if (i + 1 !== high) {
    animations.push({ type: 'swap', indices: [i + 1, high], array: [...array] });
  }
  return i + 1;
}

export const quickSortInfo = {
  name: 'Quick Sort',
  timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
  spaceComplexity: 'O(log n)',
  stable: false,
  description:
    'Picks a pivot element and partitions the array around it so elements smaller than pivot come before it and larger elements come after. Recursively applies to sub-arrays.',
  steps: [
    'Pick last element as pivot',
    'Partition: smaller left, larger right',
    'Recursively sort partitions',
  ],
};
