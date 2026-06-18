export function getInsertionSortAnimations(arr) {
  const animations = [];
  const array = [...arr];
  const n = array.length;

  animations.push({ type: 'sorted', indices: [0], array: [...array] });

  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0) {
      animations.push({ type: 'compare', indices: [j - 1, j], array: [...array] });
      if (array[j] < array[j - 1]) {
        [array[j], array[j - 1]] = [array[j - 1], array[j]];
        animations.push({ type: 'swap', indices: [j - 1, j], array: [...array] });
        j--;
      } else {
        break;
      }
    }
    animations.push({ type: 'sorted', indices: [i], array: [...array] });
  }
  animations.push({ type: 'done', indices: [], array: [...array] });
  return animations;
}

export const insertionSortInfo = {
  name: 'Insertion Sort',
  timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
  spaceComplexity: 'O(1)',
  stable: true,
  description:
    'Builds the sorted array one item at a time by taking each element and inserting it into its correct position among the previously sorted elements.',
  steps: [
    'Take next unsorted element',
    'Compare with sorted elements (right to left)',
    'Insert in correct position',
  ],
};
