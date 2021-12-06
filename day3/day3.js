const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(part1(data));
    console.log(part2(data));
  }
});

function part1(data) {
  const worldMap = data.split("\n");
  const slope = { dx: 3, dy: 1 };
  let currPosition = { x: 0, y: 0 };
  let treeCount = 0;
  while (currPosition.y + slope.dy < worldMap.length) {
    currPosition.x += slope.dx;
    currPosition.y += slope.dy;
    if (
      worldMap[currPosition.y].at(currPosition.x % worldMap[0].length) === "#"
    ) {
      treeCount++;
    }
  }
  return treeCount;
}

function part2(data) {
  const numTreesOnSlope = (slope) => {
    let currPosition = { x: 0, y: 0 };
    let treeCount = 0;
    while (currPosition.y + slope.dy < worldMap.length) {
      currPosition.x += slope.dx;
      currPosition.y += slope.dy;
      if (
        worldMap[currPosition.y].at(currPosition.x % worldMap[0].length) === "#"
      ) {
        treeCount++;
      }
    }
    return treeCount;
  };
  const worldMap = data.split("\n");
  const slopes = [
    { dx: 1, dy: 1 },
    { dx: 3, dy: 1 },
    { dx: 5, dy: 1 },
    { dx: 7, dy: 1 },
    { dx: 1, dy: 2 },
  ];
  return slopes
    .map((s) => numTreesOnSlope(s))
    .reduce((product, next) => product * next);
}
