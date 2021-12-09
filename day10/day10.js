const fs = require("fs");
const _ = require("lodash");

fs.readFile("test_input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(error);
  } else {
    console.log(part1(data));
    console.log(part2(data));
  }
});

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(error);
  } else {
    console.log(part1(data));
    console.log(part2(data));
  }
});

function part1(data) {
  const adapters = _(data.split("\n"))
    .map((s) => parseInt(s, 10))
    .sortBy((e) => e)
    .value();
  let [ones, threes] = [1, 1];
  for (let i = 1; i < adapters.length; i++) {
    if (adapters[i] - adapters[i - 1] === 1) {
      ones++;
    } else if (adapters[i] - adapters[i - 1] === 3) {
      threes++;
    } else {
      console.log(adapters[i], adapters[i - 1]);
      throw "Gap Error";
    }
  }
  return ones * threes;
}

function part2(data) {
  const adapters = _(data.split("\n"))
    .map((s) => parseInt(s, 10))
    .sortBy((e) => -e)
    .value()
    .concat([0]);
  let pathsToEnd = {};
  pathsToEnd[adapters[0] + 3] = 1;
  for (let a of adapters) {
    pathsToEnd[a] =
      _.get(pathsToEnd, a + 1, 0) +
      _.get(pathsToEnd, a + 2, 0) +
      _.get(pathsToEnd, a + 3, 0);
  }
  return pathsToEnd[0];
}
