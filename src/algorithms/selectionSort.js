export function getSelectionSortAnimations(arr) {
  const animations = [];
  const array = [...arr];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      animations.push({ type: 'compare', indices: [minIdx, j], array: [...array] });
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      animations.push({ type: 'swap', indices: [i, minIdx], array: [...array] });
    }
    animations.push({ type: 'sorted', indices: [i], array: [...array] });
  }
  animations.push({ type: 'sorted', indices: [n - 1], array: [...array] });
  animations.push({ type: 'done', indices: [], array: [...array] });
  return animations;
}

export const selectionSortInfo = {
  name: 'Selection Sort',
  timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
  spaceComplexity: 'O(1)',
  stable: false,
  description:
    'Divides the array into sorted and unsorted regions. Repeatedly finds the minimum element from the unsorted region and places it at the beginning of the sorted region.',
  steps: [
    'Find minimum in unsorted region',
    'Swap it to sorted region end',
    'Expand sorted region by 1',
  ],
};
