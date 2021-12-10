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
  let board = data.split("\n").map((l) => l.trim().split(""));

  while (true) {
    tilesToChange = [];
    for (i in board) {
      for (j in board[i]) {
        if (board[i][j] === ".") {
          continue;
        } else if (board[i][j] === "L") {
          if (numAdjacentOccupied(board, i, j) === 0) {
            tilesToChange.push([i, j]);
          }
        } else if (board[i][j] === "#") {
          if (numAdjacentOccupied(board, i, j) >= 4) {
            tilesToChange.push([i, j]);
          }
        } else {
          throw "Unknown Token!";
        }
      }
    }
    if (_.isEmpty(tilesToChange)) {
      return board
        .flat()
        .reduce((total, next) => (next === "#" ? total + 1 : total), 0);
    }
    tilesToChange.forEach((tile) => {
      let tileVal = _.get(board, tile);
      if (tileVal === ".") {
        throw "Should never change floor!";
      }
      _.set(board, tile, tileVal === "L" ? "#" : "L");
    });
  }
}

function part2(data) {
  let board = data.split("\n").map((l) => l.trim().split(""));

  let iter = 0;
  while (true) {
    tilesToChange = [];
    for (i in board) {
      for (j in board[i]) {
        if (board[i][j] === ".") {
          continue;
        } else if (board[i][j] === "L") {
          if (numInSightlineOccupied(board, i, j) === 0) {
            tilesToChange.push([i, j]);
          }
        } else if (board[i][j] === "#") {
          if (numInSightlineOccupied(board, i, j) >= 5) {
            tilesToChange.push([i, j]);
          }
        } else {
          throw "Unknown Token!";
        }
      }
    }

    if (_.isEmpty(tilesToChange)) {
      return board
        .flat()
        .reduce((total, next) => (next === "#" ? total + 1 : total), 0);
    }
    tilesToChange.forEach((tile) => {
      let tileVal = _.get(board, tile);
      if (tileVal === ".") {
        throw "Should never change floor!";
      }
      _.set(board, tile, tileVal === "L" ? "#" : "L");
    });
    iter++;
  }
}

function inbounds(board, i, j) {
  return _.get(board, [i, j], false);
}

function numInSightlineOccupied(board, i, j) {
  let result = 0;
  for (dx of [-1, 0, 1]) {
    for (dy of [-1, 0, 1]) {
      if (dx || dy) {
        if (isPersonInSightline(board, i, j, dx, dy)) {
          result++;
        }
      }
    }
  }
  return result;
}

function isPersonInSightline(board, i, j, dx, dy) {
  let mag = 1;
  while (inbounds(board, i - mag * dx, j - mag * dy)) {
    if (_.get(board, [i - mag * dx, j - mag * dy]) === "#") {
      return true;
    }
    if (_.get(board, [i - mag * dx, j - mag * dy]) === "L") {
      return false;
    }
    mag++;
  }
  return false;
}

function numAdjacentOccupied(board, i, j) {
  let result = 0;
  for (dx of [-1, 0, 1]) {
    for (dy of [-1, 0, 1]) {
      if (dx || dy) {
        if (_.get(board, [i - dx, j - dy], ".") === "#") {
          result++;
        }
      }
    }
  }
  return result;
}

function boardArrayToString(board, tilesToChange = []) {
  result = _.cloneDeep(board);
  for (tile of tilesToChange) {
    switch (board[tile[0]][tile[1]]) {
      case "#":
        result[tile[0]][tile[1]] = "-";
        break;
      case "L":
        result[tile[0]][tile[1]] = "+";
        break;
      case ".":
        throw "Should never change floor!";
    }
  }
  return result.map((l) => l.join("")).join("\n");
}
