const barsContainer = document.getElementById("barsContainer");
const algorithmSelect = document.getElementById("algorithm");
const generateBtn = document.getElementById("generateBtn");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const speedSlider = document.getElementById("speedSlider");
const sizeSlider = document.getElementById("sizeSlider");
const algorithmName = document.getElementById("algorithmName");
const swapCountText = document.getElementById("swapCount");
const logicTitle = document.getElementById("logicTitle");
const logicContent = document.getElementById("logicContent");
const logicText = document.getElementById("logicText");
const logicSteps = document.getElementById("logicSteps");
const cppCode = document.getElementById("cppCode");
const codeToggleBtn = document.getElementById("codeToggleBtn");
const complexityBox = document.getElementById("complexityBox");
const extraInfo = document.getElementById("extraInfo");

let array = [];
let isSorting = false;
let stopSorting = false;
let swaps = 0;
let isCodeVisible = false;

const algorithmDetails = {
  bubble: {
    name: "Bubble Sort",
    logic: "Bubble Sort compares two nearby values again and again. If the left value is bigger, it swaps them. After every round, the biggest value reaches the end.",
    steps: [
      "Start from the first element.",
      "Compare the current element with the next element.",
      "Swap them if they are in the wrong order.",
      "Repeat until the largest element moves to the end.",
      "Do the same for the remaining unsorted part."
    ],
    complexity: {
      best: "O(n)",
      average: "O(n^2)",
      worst: "O(n^2)",
      space: "O(1)",
      stable: "Yes"
    },
    info: "Very easy to understand, so it is good for learning. It is not used much for large data because it becomes slow.",
    code: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`
  },
  selection: {
    name: "Selection Sort",
    logic: "Selection Sort finds the smallest value from the unsorted part and places it at the beginning.",
    steps: [
      "Assume the first unsorted element is the minimum.",
      "Search the remaining array for a smaller value.",
      "Swap the smallest value with the first unsorted position.",
      "Move the sorted boundary one step forward.",
      "Repeat until the whole array is sorted."
    ],
    complexity: {
      best: "O(n^2)",
      average: "O(n^2)",
      worst: "O(n^2)",
      space: "O(1)",
      stable: "No"
    },
    info: "Simple and uses very few swaps. It still checks many pairs, so it is slow for big arrays.",
    code: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;

        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        swap(arr[i], arr[minIndex]);
    }
}`
  },
  insertion: {
    name: "Insertion Sort",
    logic: "Insertion Sort builds the sorted array one value at a time. It takes one value and inserts it into the correct position on the left side.",
    steps: [
      "Treat the first element as already sorted.",
      "Pick the next element as the key.",
      "Move bigger elements one position to the right.",
      "Place the key in the empty correct position.",
      "Repeat for all remaining elements."
    ],
    complexity: {
      best: "O(n)",
      average: "O(n^2)",
      worst: "O(n^2)",
      space: "O(1)",
      stable: "Yes"
    },
    info: "Works well when the array is already almost sorted. Many real sorting methods use it for small parts of data.",
    code: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }
}`
  },
  merge: {
    name: "Merge Sort",
    logic: "Merge Sort divides the array into two halves, sorts both halves, and then merges them back in sorted order.",
    steps: [
      "Split the array into two halves.",
      "Keep splitting until each part has one element.",
      "Compare values from two sorted parts.",
      "Copy the smaller value into the main array.",
      "Continue merging until everything is sorted."
    ],
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(n)",
      stable: "Yes"
    },
    info: "Very reliable and stable, but it needs extra memory for merging. It is a good algorithm to explain divide and conquer.",
    code: `void mergeSort(int arr[], int left, int right) {
    if (left >= right) return;

    int mid = (left + right) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);

    // Merge the two sorted halves here
}`
  },
  quick: {
    name: "Quick Sort",
    logic: "Quick Sort chooses a pivot value and places smaller values on the left and larger values on the right.",
    steps: [
      "Choose a pivot element.",
      "Compare other values with the pivot.",
      "Move smaller values to the left side.",
      "Place the pivot in its correct position.",
      "Repeat the process for left and right parts."
    ],
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n^2)",
      space: "O(log n)",
      stable: "No"
    },
    info: "Usually very fast in practice. The worst case can happen if the pivot keeps dividing the array badly.",
    code: `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }

    swap(arr[i + 1], arr[high]);
    return i + 1;
}`
  },
  heap: {
    name: "Heap Sort",
    logic: "Heap Sort first creates a max heap. The largest value stays at the root, then it is swapped to the end.",
    steps: [
      "Build a max heap from the array.",
      "Swap the root with the last unsorted element.",
      "Mark the last element as sorted.",
      "Fix the heap again using heapify.",
      "Repeat until the array is sorted."
    ],
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(1)",
      stable: "No"
    },
    info: "Heap Sort gives guaranteed O(n log n) time and uses no extra array, but it is a little harder to understand than Bubble or Selection Sort.",
    code: `void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
        largest = left;

    if (right < n && arr[right] > arr[largest])
        largest = right;

    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}`
  }
};

function delay() {
  return new Promise((resolve) => {
    setTimeout(resolve, Number(speedSlider.value));
  });
}

function generateArray() {
  array = [];
  swaps = 0;
  stopSorting = false;
  swapCountText.textContent = swaps;

  const size = Number(sizeSlider.value);

  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 90) + 10;
    array.push(value);
  }

  drawBars();
}

function drawBars() {
  barsContainer.innerHTML = "";

  array.forEach((value) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value * 3.5}px`;
    bar.textContent = value;
    barsContainer.appendChild(bar);
  });
}

function getBars() {
  return document.querySelectorAll(".bar");
}

function clearColors() {
  const bars = getBars();

  bars.forEach((bar) => {
    bar.classList.remove("compare", "swap");
  });
}

function updateBar(index, value) {
  const bars = getBars();
  bars[index].style.height = `${value * 3.5}px`;
  bars[index].textContent = value;
}

function setControls(disabled) {
  isSorting = disabled;
  generateBtn.disabled = disabled;
  startBtn.disabled = disabled;
  algorithmSelect.disabled = disabled;
  sizeSlider.disabled = disabled;
}

function updateSwapCount() {
  swaps++;
  swapCountText.textContent = swaps;
}

function updateLearningPanel() {
  const selectedAlgorithm = algorithmSelect.value;
  const details = algorithmDetails[selectedAlgorithm];

  isCodeVisible = false;
  logicContent.classList.remove("hidden");
  cppCode.classList.add("hidden");
  codeToggleBtn.textContent = "Show Code";

  logicTitle.textContent = details.name;
  logicText.textContent = details.logic;
  extraInfo.textContent = details.info;
  cppCode.textContent = details.code;

  logicSteps.innerHTML = details.steps
    .map((step) => `<li>${step}</li>`)
    .join("");

  complexityBox.innerHTML = `
    <div class="complexity-item"><span>Best</span><strong>${details.complexity.best}</strong></div>
    <div class="complexity-item"><span>Average</span><strong>${details.complexity.average}</strong></div>
    <div class="complexity-item"><span>Worst</span><strong>${details.complexity.worst}</strong></div>
    <div class="complexity-item"><span>Space</span><strong>${details.complexity.space}</strong></div>
    <div class="complexity-item"><span>Stable</span><strong>${details.complexity.stable}</strong></div>
  `;
}

function toggleCode() {
  isCodeVisible = !isCodeVisible;
  logicContent.classList.toggle("hidden", isCodeVisible);
  cppCode.classList.toggle("hidden", !isCodeVisible);
  codeToggleBtn.textContent = isCodeVisible ? "Show Logic" : "Show Code";
}

function markAllSorted() {
  const bars = getBars();

  bars.forEach((bar) => {
    bar.classList.remove("compare", "swap");
    bar.classList.add("sorted");
  });
}

async function bubbleSort() {
  const bars = getBars();

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (stopSorting) return;

      bars[j].classList.add("compare");
      bars[j + 1].classList.add("compare");
      await delay();

      if (array[j] > array[j + 1]) {
        bars[j].classList.remove("compare");
        bars[j + 1].classList.remove("compare");
        bars[j].classList.add("swap");
        bars[j + 1].classList.add("swap");

        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        updateBar(j, array[j]);
        updateBar(j + 1, array[j + 1]);
        updateSwapCount();
        await delay();
      }

      bars[j].classList.remove("compare", "swap");
      bars[j + 1].classList.remove("compare", "swap");
    }

    bars[array.length - i - 1].classList.add("sorted");
  }

  bars[0].classList.add("sorted");
}

async function selectionSort() {
  const bars = getBars();

  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    bars[minIndex].classList.add("compare");

    for (let j = i + 1; j < array.length; j++) {
      if (stopSorting) return;

      bars[j].classList.add("compare");
      await delay();

      if (array[j] < array[minIndex]) {
        bars[minIndex].classList.remove("compare");
        minIndex = j;
        bars[minIndex].classList.add("compare");
      } else {
        bars[j].classList.remove("compare");
      }
    }

    if (minIndex !== i) {
      bars[i].classList.add("swap");
      bars[minIndex].classList.add("swap");

      const temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;

      updateBar(i, array[i]);
      updateBar(minIndex, array[minIndex]);
      updateSwapCount();
      await delay();

      bars[minIndex].classList.remove("swap");
    }

    bars[i].classList.remove("compare", "swap");
    bars[i].classList.add("sorted");
  }
}

async function insertionSort() {
  const bars = getBars();

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    bars[i].classList.add("compare");
    await delay();

    while (j >= 0 && array[j] > key) {
      if (stopSorting) return;

      bars[j].classList.add("swap");
      bars[j + 1].classList.add("swap");

      array[j + 1] = array[j];
      updateBar(j + 1, array[j + 1]);
      updateSwapCount();
      await delay();

      bars[j].classList.remove("swap");
      bars[j + 1].classList.remove("swap");
      j--;
    }

    array[j + 1] = key;
    updateBar(j + 1, key);
    bars[i].classList.remove("compare");
  }

  for (let i = 0; i < bars.length; i++) {
    bars[i].classList.add("sorted");
  }
}

async function mergeSort(start = 0, end = array.length - 1) {
  if (stopSorting) return;
  if (start >= end) return;

  const middle = Math.floor((start + end) / 2);

  await mergeSort(start, middle);
  await mergeSort(middle + 1, end);
  await merge(start, middle, end);

  if (start === 0 && end === array.length - 1) {
    markAllSorted();
  }
}

async function merge(start, middle, end) {
  let leftIndex = start;
  let rightIndex = middle + 1;
  const temp = [];

  while (leftIndex <= middle && rightIndex <= end) {
    if (stopSorting) return;

    const bars = getBars();
    bars[leftIndex].classList.add("compare");
    bars[rightIndex].classList.add("compare");
    await delay();

    if (array[leftIndex] <= array[rightIndex]) {
      temp.push(array[leftIndex]);
      leftIndex++;
    } else {
      temp.push(array[rightIndex]);
      rightIndex++;
    }

    clearColors();
  }

  while (leftIndex <= middle) {
    temp.push(array[leftIndex]);
    leftIndex++;
  }

  while (rightIndex <= end) {
    temp.push(array[rightIndex]);
    rightIndex++;
  }

  for (let i = 0; i < temp.length; i++) {
    if (stopSorting) return;

    const currentIndex = start + i;
    const bars = getBars();

    array[currentIndex] = temp[i];
    bars[currentIndex].classList.add("swap");
    updateBar(currentIndex, array[currentIndex]);
    updateSwapCount();
    await delay();
    bars[currentIndex].classList.remove("swap");
  }
}

async function quickSort(start = 0, end = array.length - 1) {
  if (stopSorting) return;
  if (start >= end) return;

  const pivotIndex = await partition(start, end);

  await quickSort(start, pivotIndex - 1);
  await quickSort(pivotIndex + 1, end);

  if (start === 0 && end === array.length - 1) {
    markAllSorted();
  }
}

async function partition(start, end) {
  const bars = getBars();
  const pivotValue = array[end];
  let smallerIndex = start - 1;

  bars[end].classList.add("compare");

  for (let currentIndex = start; currentIndex < end; currentIndex++) {
    if (stopSorting) return end;

    bars[currentIndex].classList.add("compare");
    await delay();

    if (array[currentIndex] < pivotValue) {
      smallerIndex++;

      bars[currentIndex].classList.remove("compare");
      bars[smallerIndex].classList.add("swap");
      bars[currentIndex].classList.add("swap");

      const temp = array[smallerIndex];
      array[smallerIndex] = array[currentIndex];
      array[currentIndex] = temp;

      updateBar(smallerIndex, array[smallerIndex]);
      updateBar(currentIndex, array[currentIndex]);
      updateSwapCount();
      await delay();

      bars[smallerIndex].classList.remove("swap");
      bars[currentIndex].classList.remove("swap");
    }

    bars[currentIndex].classList.remove("compare");
  }

  const pivotNewIndex = smallerIndex + 1;

  bars[pivotNewIndex].classList.add("swap");
  bars[end].classList.add("swap");

  const temp = array[pivotNewIndex];
  array[pivotNewIndex] = array[end];
  array[end] = temp;

  updateBar(pivotNewIndex, array[pivotNewIndex]);
  updateBar(end, array[end]);
  updateSwapCount();
  await delay();

  bars[pivotNewIndex].classList.remove("swap", "compare");
  bars[end].classList.remove("swap", "compare");

  return pivotNewIndex;
}

async function heapSort() {
  const n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  for (let end = n - 1; end > 0; end--) {
    if (stopSorting) return;

    const bars = getBars();
    bars[0].classList.add("swap");
    bars[end].classList.add("swap");

    const temp = array[0];
    array[0] = array[end];
    array[end] = temp;

    updateBar(0, array[0]);
    updateBar(end, array[end]);
    updateSwapCount();
    await delay();

    bars[0].classList.remove("swap");
    bars[end].classList.remove("swap");
    bars[end].classList.add("sorted");

    await heapify(end, 0);
  }

  getBars()[0].classList.add("sorted");
}

async function heapify(size, rootIndex) {
  if (stopSorting) return;

  let largest = rootIndex;
  const leftChild = 2 * rootIndex + 1;
  const rightChild = 2 * rootIndex + 2;
  const bars = getBars();

  if (leftChild < size) {
    bars[rootIndex].classList.add("compare");
    bars[leftChild].classList.add("compare");
    await delay();

    if (array[leftChild] > array[largest]) {
      largest = leftChild;
    }

    bars[rootIndex].classList.remove("compare");
    bars[leftChild].classList.remove("compare");
  }

  if (rightChild < size) {
    const compareIndex = largest;

    bars[compareIndex].classList.add("compare");
    bars[rightChild].classList.add("compare");
    await delay();

    if (array[rightChild] > array[largest]) {
      largest = rightChild;
    }

    bars[compareIndex].classList.remove("compare");
    bars[rightChild].classList.remove("compare");
  }

  if (largest !== rootIndex) {
    bars[rootIndex].classList.add("swap");
    bars[largest].classList.add("swap");

    const temp = array[rootIndex];
    array[rootIndex] = array[largest];
    array[largest] = temp;

    updateBar(rootIndex, array[rootIndex]);
    updateBar(largest, array[largest]);
    updateSwapCount();
    await delay();

    bars[rootIndex].classList.remove("swap");
    bars[largest].classList.remove("swap");

    await heapify(size, largest);
  }
}

async function startSorting() {
  if (isSorting) return;

  setControls(true);
  stopSorting = false;
  swaps = 0;
  swapCountText.textContent = swaps;

  const selectedAlgorithm = algorithmSelect.value;
  algorithmName.textContent = algorithmSelect.options[algorithmSelect.selectedIndex].text;

  if (selectedAlgorithm === "bubble") {
    await bubbleSort();
  } else if (selectedAlgorithm === "selection") {
    await selectionSort();
  } else if (selectedAlgorithm === "insertion") {
    await insertionSort();
  } else if (selectedAlgorithm === "merge") {
    await mergeSort();
  } else if (selectedAlgorithm === "quick") {
    await quickSort();
  } else if (selectedAlgorithm === "heap") {
    await heapSort();
  }

  setControls(false);
}

function stopCurrentSorting() {
  stopSorting = true;
  setControls(false);
}

algorithmSelect.addEventListener("change", () => {
  algorithmName.textContent = algorithmSelect.options[algorithmSelect.selectedIndex].text;
  updateLearningPanel();
});

codeToggleBtn.addEventListener("click", toggleCode);
generateBtn.addEventListener("click", generateArray);
startBtn.addEventListener("click", startSorting);
stopBtn.addEventListener("click", stopCurrentSorting);
sizeSlider.addEventListener("input", generateArray);

generateArray();
updateLearningPanel();
