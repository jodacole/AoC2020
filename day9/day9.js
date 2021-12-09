const fs = require("fs");
const _ = require("lodash");

// fs.readFile("test_input.txt", "utf8", (err, data) => {
//   if (err) {
//     console.log(error);
//   } else {
//     console.log(part1(data));
//     console.log(part2(data));
//   }
// });

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(error);
  } else {
    console.log(part1(data));
    console.log(part2(data));
  }
});

function part1(data) {
  const numbers = data.split("\n").map((n) => parseInt(n, 10));
  let preamble = numbers.slice(0, 25);
  for (number of numbers.slice(25)) {
    let isValid = preamble.reduce((valid, next) => {
      return valid || (number !== next * 2 && preamble.includes(number - next));
    }, false);
    if (!isValid) {
      return number;
    }
    preamble.push(number);
    preamble.shift();
  }
}

function part2(data) {
  const numbers = data.split("\n").map((n) => parseInt(n, 10));
  const invalid = part1(data);
  let [lo, hi] = [0, 1];
  while (hi <= numbers.length) {
    if (
      _(numbers)
        .slice(lo, hi + 1)
        .sum() === invalid
    ) {
      console.log(numbers.slice(lo, hi + 1));
      return (
        _(numbers)
          .slice(lo, hi + 1)
          .min() +
        _(numbers)
          .slice(lo, hi + 1)
          .max()
      );
    } else if (
      _(numbers)
        .slice(lo, hi + 1)
        .sum() < invalid
    ) {
      hi++;
    } else {
      lo++;
    }
  }
}
