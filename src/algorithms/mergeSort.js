export function getMergeSortAnimations(arr) {
  const animations = [];
  const array = [...arr];
  mergeSortHelper(array, 0, array.length - 1, animations);
  animations.push({ type: 'done', indices: [], array: [...array] });
  return animations;
}

function mergeSortHelper(array, left, right, animations) {
  if (left >= right) return;
  const mid = Math.floor((left + right) / 2);
  mergeSortHelper(array, left, mid, animations);
  mergeSortHelper(array, mid + 1, right, animations);
  merge(array, left, mid, right, animations);
}

function merge(array, left, mid, right, animations) {
  const leftArr = array.slice(left, mid + 1);
  const rightArr = array.slice(mid + 1, right + 1);
  let i = 0, j = 0, k = left;

  while (i < leftArr.length && j < rightArr.length) {
    animations.push({ type: 'compare', indices: [left + i, mid + 1 + j], array: [...array] });
    if (leftArr[i] <= rightArr[j]) {
      array[k] = leftArr[i++];
    } else {
      array[k] = rightArr[j++];
    }
    animations.push({ type: 'swap', indices: [k], array: [...array] });
    k++;
  }

  while (i < leftArr.length) {
    array[k] = leftArr[i++];
    animations.push({ type: 'swap', indices: [k], array: [...array] });
    k++;
  }
  while (j < rightArr.length) {
    array[k] = rightArr[j++];
    animations.push({ type: 'swap', indices: [k], array: [...array] });
    k++;
  }

  // Mark merged section as sorted
  for (let idx = left; idx <= right; idx++) {
    animations.push({ type: 'sorted', indices: [idx], array: [...array] });
  }
}

export const mergeSortInfo = {
  name: 'Merge Sort',
  timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
  spaceComplexity: 'O(n)',
  stable: true,
  description:
    'A divide and conquer algorithm that splits the array in half, recursively sorts each half, then merges the two sorted halves back together.',
  steps: [
    'Divide array in half',
    'Recursively sort each half',
    'Merge the two sorted halves',
  ],
};
