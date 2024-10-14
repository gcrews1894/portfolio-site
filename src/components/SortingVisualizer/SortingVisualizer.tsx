import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';

export const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < 100; i++) {
      newArray.push(Math.floor(Math.random() * 500) + 5); // Random number between 5 and 504
    }
    setArray(newArray);
  };

  const mergeSort = async () => {
    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>;
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? 'turquoise' : '#FF6B00';
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 10);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 10);
      }
    }
  };

  // Add new sorting algorithms
  const bubbleSort = async () => {
    const animations = getBubbleSortAnimations(array.slice());
    animateSort(animations);
  };

  const quickSort = async () => {
    const animations = getQuickSortAnimations(array.slice());
    animateSort(animations);
  };

  const selectionSort = async () => {
    const animations = getSelectionSortAnimations(array.slice());
    animateSort(animations);
  };

  // Helper function to animate sorting
  const animateSort = (animations: number[][]) => {
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>;
      const [barOneIdx, barTwoIdx, swap] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      setTimeout(() => {
        barOneStyle.backgroundColor = 'turquoise';
        barTwoStyle.backgroundColor = 'turquoise';
      }, i * 10);

      setTimeout(() => {
        barOneStyle.backgroundColor = '#FF6B00';
        barTwoStyle.backgroundColor = '#FF6B00';
        if (swap) {
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
        }
      }, (i + 1) * 10);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ my: 4 }}>
        <Button onClick={resetArray} variant="contained" sx={{ mr: 1 }}>
          Generate New Array
        </Button>
        <Button onClick={mergeSort} variant="contained" color="secondary" sx={{ mr: 1 }}>
          Merge Sort
        </Button>
        <Button onClick={bubbleSort} variant="contained" color="success" sx={{ mr: 1 }}>
          Bubble Sort
        </Button>
        <Button onClick={quickSort} variant="contained" color="warning" sx={{ mr: 1 }}>
          Quick Sort
        </Button>
        <Button onClick={selectionSort} variant="contained" color="info">
          Selection Sort
        </Button>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end', // This aligns items to the bottom
        height: '500px',
        width: '100%',
      }}>
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: '#FF6B00',
              height: `${value}px`,
              width: '8px',
              margin: '0 1px',
              display: 'inline-block', // Ensures bars are side by side
            }}
          ></div>
        ))}
      </Box>
    </Box>
  );
};

function getMergeSortAnimations(array: number[]): number[][] {
  const animations: number[][] = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray: number[],
  startIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: number[][]
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray: number[],
  startIdx: number,
  middleIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: number[][]
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

function getBubbleSortAnimations(array: number[]): number[][] {
  const animations: number[][] = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      animations.push([j, j + 1, false]);
      if (array[j] > array[j + 1]) {
        animations.push([j, j + 1, true]);
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return animations;
}

function getQuickSortAnimations(array: number[]): number[][] {
  const animations: number[][] = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array: number[], low: number, high: number, animations: number[][]) {
  if (low < high) {
    const pi = partition(array, low, high, animations);
    quickSortHelper(array, low, pi - 1, animations);
    quickSortHelper(array, pi + 1, high, animations);
  }
}

function partition(array: number[], low: number, high: number, animations: number[][]): number {
  const pivot = array[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    animations.push([j, high, false]);
    if (array[j] < pivot) {
      i++;
      animations.push([i, j, true]);
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  animations.push([i + 1, high, true]);
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  return i + 1;
}

function getSelectionSortAnimations(array: number[]): number[][] {
  const animations: number[][] = [];
  for (let i = 0; i < array.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < array.length; j++) {
      animations.push([minIdx, j, false]);
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      animations.push([i, minIdx, true]);
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
    }
  }
  return animations;
}
