// sourcery skip: avoid-function-declarations-in-blocks
export function solve1(input: string) {
  let safe_count = 0;
  const arrays = input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(" ").filter(Boolean).map(Number));
  // Now we have an array, the condition is that the array must be sorted either ascending or descending
  // Any two adjacent levels differ by at least one and at most three.
  function isSafeArray(arr: number[]): boolean {
    // I still dont understand this magic help
    const isAscending = arr.every((val, i, array) => !i || array[i - 1] <= val);
    const isDescending = arr.every(
      (val, i, array) => !i || array[i - 1] >= val
    );

    if (!isAscending && !isDescending) {
      return false;
    }

    // Check if the difference between any two adjacent levels is between 1 and 3
    for (let i = 1; i < arr.length; i++) {
      const diff = Math.abs(arr[i] - arr[i - 1]);
      if (diff < 1 || diff > 3) {
        return false;
      }
    }

    return true;
  }

  for (let i = 0; i < arrays.length; i++) {
    if (isSafeArray(arrays[i])) {
      safe_count++;
    }
  }

  return safe_count;
}

export function solve2(input: string) {
  let safe_count = 0;
  const input1 = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;
  const input2 = `48 46 47 49 51 54 56
1 1 2 3 4 5
1 2 3 4 5 5
5 1 2 3 4 5
1 4 3 2 1
1 6 7 8 9
1 2 3 4 3
9 8 7 6 7`;
  const arrays = input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(" ").map(Number));

  function isSafeArray(arr: number[]): boolean {
    for (let i = 0; i < arr.length; i++) {
      const partarr = arr.slice(0, i).concat(arr.slice(i + 1)); // this takes 0 to i-1 and i+1 to end basically removing the ith element
      if (isSortedandValid(partarr)) {
        return true;
      }
    }
    return false;
  }

  function isSortedandValid(arr: number[]): boolean {
    const isAscending = arr.every((val, i, array) => !i || array[i - 1] <= val);
    const isDescending = arr.every(
      (val, i, array) => !i || array[i - 1] >= val
    );

    if (!isAscending && !isDescending) {
      return false;
    }

    // Check if the difference between any two adjacent levels is between 1 and 3
    for (let i = 1; i < arr.length; i++) {
      const diff = Math.abs(arr[i] - arr[i - 1]);
      if (diff < 1 || diff > 3) {
        return false;
      }
    }

    return true;
  }


  for (let i = 0; i < arrays.length; i++) {
    if (isSafeArray(arrays[i])) {
      safe_count++;
    }
  }

  return safe_count;
}
