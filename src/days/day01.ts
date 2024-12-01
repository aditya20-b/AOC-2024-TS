export function solve1(input: string) {
  let total_distance = 0;

  const pairs = input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(" ").filter(Boolean).map(Number));

  // pairs are in - [ [1, 2], [3, 4], [5, 6] ] format
  // sort left elements and right elements into separate arrays
  const left = pairs.map((pair) => pair[0]).sort((a, b) => a - b);
  const right = pairs.map((pair) => pair[1]).sort((a, b) => a - b);

  // calculate total distance
  for (let i = 0; i < left.length; i++) {
    total_distance += Math.abs(left[i] - right[i]);
  }
  return total_distance;
}

export function solve2(input: string) {
  let total_similarity = 0;

  const pairs = input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(" ").filter(Boolean).map(Number));

  const left = pairs.map((pair) => pair[0]).sort((a, b) => a - b);
  const right = pairs.map((pair) => pair[1]).sort((a, b) => a - b);
  
  // Convert the right array into a hashmap
  const right_map = right.reduce(
    (acc: { [key: number]: number }, val: number) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    },
    {}
  );

  // Calculate total similarity
  for (let i = 0; i < left.length; i++) {
    total_similarity += left[i] * (right_map[left[i]] || 0);
  }

  return total_similarity;
}
