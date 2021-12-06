const fs = require("fs");
const { set } = require("lodash");
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
    .split("\n\n")
    .map((g) => g.replace(/\s/g, ""))
    .map((g) => new Set(g))
    .reduce((total, group) => total + group.size, 0);
}

function part2(data) {
  return data
    .split("\n\n")
    .map((group) =>
      group
        .split("\n")
        .map((responses) => new Set(responses))
        .reduce(
          (allYes, nextPerson) =>
            new Set([...allYes].filter((x) => nextPerson.has(x)))
        )
    )
    .reduce((total, group) => total + group.size, 0);
}
