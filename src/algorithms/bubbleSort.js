// Returns array of animation frames: [type, i, j, newArray?]
// types: "compare", "swap", "sorted", "done"

export function getBubbleSortAnimations(arr) {
  const animations = [];
  const array = [...arr];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push({ type: 'compare', indices: [j, j + 1], array: [...array] });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        animations.push({ type: 'swap', indices: [j, j + 1], array: [...array] });
      }
    }
    animations.push({ type: 'sorted', indices: [n - i - 1], array: [...array] });
  }
  animations.push({ type: 'sorted', indices: [0], array: [...array] });
  animations.push({ type: 'done', indices: [], array: [...array] });
  return animations;
}

export const bubbleSortInfo = {
  name: 'Bubble Sort',
  timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
  spaceComplexity: 'O(1)',
  stable: true,
  description:
    'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The largest unsorted element "bubbles up" to its correct position each pass.',
  steps: [
    'Compare adjacent elements',
    'Swap if left > right',
    'Repeat until no swaps needed',
  ],
};
