const fs = require("fs");
const _ = require("lodash");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(error);
  } else {
    console.log(part1(data));
    console.log(part2(data));
  }
});

function part1(data) {
  return data
    .split("\n")
    .map((str) => parseInt(str.replace(/[RB]/g, "1").replace(/[LF]/g, "0"), 2))
    .reduce((max, next) => Math.max(max, next));
}

function part2(data) {
  const seatIds = new Set(
    data
      .split("\n")
      .map((str) =>
        parseInt(str.replace(/[RB]/g, "1").replace(/[LF]/g, "0"), 2)
      )
  );
  for (let i = 0; i < 1000; i++) {
    if (!seatIds.has(i) && seatIds.has(i + 1) && seatIds.has(i - 1)) {
      return i;
    }
  }
}
