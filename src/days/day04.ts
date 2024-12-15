export function solve1(input: string) {
  let input1 = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;
  let horizontal_counter = 0;
  let vertical_counter = 0;
  let diagonal_counter = 0;
  let backwards_counter = 0;

  // Go through the string horizontally
  const lines = input.split("\n");
  for (let line of lines) {
    let index = line.indexOf("XMAS");
    while (index !== -1) {
      horizontal_counter++;
      index = line.indexOf("XMAS", index + 1);
    }
    index = line.indexOf("SAMX");
    while (index !== -1) {
      backwards_counter++;
      index = line.indexOf("SAMX", index + 1);
    }
  }

  // Go through the strings vertically
  for (let col = 0; col < lines[0].length; col++) {
    let vertical_string = "";
    for (let row = 0; row < lines.length; row++) {
      vertical_string += lines[row][col];
    }
    let index = vertical_string.indexOf("XMAS");
    while (index !== -1) {
      vertical_counter++;
      index = vertical_string.indexOf("XMAS", index + 1);
    }
    index = vertical_string.indexOf("SAMX");
    while (index !== -1) {
      backwards_counter++;
      index = vertical_string.indexOf("SAMX", index + 1);
    }
  }

  // Check for diagonals
  const n = lines.length;
  const m = lines[0].length;

  // Check for diagonals from top-left to bottom-right
  for (let i = 0; i <= n - 4; i++) {
    for (let j = 0; j <= m - 4; j++) {
      let diagonal_string = "";
      for (let k = 0; k < 4; k++) {
        diagonal_string += lines[i + k][j + k];
      }
      if (diagonal_string === "XMAS") {
        diagonal_counter++;
      }
      if (diagonal_string === "SAMX") {
        backwards_counter++;
      }
    }
  }

  // Check for diagonals from top-right to bottom-left
  for (let i = 0; i <= n - 4; i++) {
    for (let j = 3; j < m; j++) {
      let diagonal_string = "";
      for (let k = 0; k < 4; k++) {
        diagonal_string += lines[i + k][j - k];
      }
      if (diagonal_string === "XMAS") {
        diagonal_counter++;
      }
      if (diagonal_string === "SAMX") {
        backwards_counter++;
      }
    }
  }
  const directions = [
    // Horizontal rows
    lines.join("\n"),
    // Vertical columns
    Array.from({ length: m }, (_, i) =>
      lines.map((line) => line[i]).join("")
    ).join("\n"),
    // Diagonals top-left to bottom-right
    Array.from({ length: n }, (_, i) =>
      Array.from({ length: m }, (_, j) =>
        Array.from({ length: 4 }, (_, k) =>
          i + k < n && j + k < m ? lines[i + k][j + k] : ""
        ).join("")
      ).join("\n")
    ).join("\n"),
    // Diagonals top-right to bottom-left
    Array.from({ length: n }, (_, i) =>
      Array.from({ length: m }, (_, j) =>
        Array.from({ length: 4 }, (_, k) =>
          i + k < n && j - k >= 0 ? lines[i + k][j - k] : ""
        ).join("")
      ).join("\n")
    ).join("\n"),
  ].join("\n");

  let horizontal_counter1 = (directions.match(/XMAS/g) || []).length;
  let backwards_counter1 = (directions.match(/SAMX/g) || []).length;
  console.log(`The total sum is: ${horizontal_counter1 + backwards_counter1}`);
  console.log(`Horizontal: ${horizontal_counter}`);
  console.log(`Vertical: ${vertical_counter}`);
  console.log(`Diagonal: ${diagonal_counter}`);
  console.log(`Backwards: ${backwards_counter}`);

  return (
    horizontal_counter + vertical_counter + diagonal_counter + backwards_counter
  );
}
export function solve2(input: string) {
  const lines = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));
  const n = lines.length;
  const m = lines[0].length;

  let count = 0;

  const isXMAS = (chars: string[]) => {
    return chars.join("") === "MAS" || chars.join("") === "SAM";
  };

  for (let i = 1; i < n-1; i++) {
    for (let j = 1; j < m-1; j++) {
        const topLeftDiagonal = [lines[i - 1][j - 1], lines[i][j], lines[i + 1][j + 1]];
        const topRightDiagonal = [lines[i - 1][j + 1], lines[i][j], lines[i + 1][j - 1]];


        if (isXMAS(topLeftDiagonal) && isXMAS(topRightDiagonal)) {
            count++;
        }
    }
  }

    return count;

}
