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
  const ops = data.split("\n").map((op) => {
    return { code: op.split(" ")[0], arg: parseInt(op.split(" ")[1]), runs: 0 };
  });

  let ptr = 0;
  let acc = 0;
  while (true) {
    if (ops[ptr].code === "acc") {
      acc += ops[ptr].arg;
      ptr++;
    } else if (ops[ptr].code === "jmp") {
      ptr += ops[ptr].arg;
    } else if (ops[ptr].code === "nop") {
      ptr++;
    }
    ops[ptr].runs++;
    if (ops[ptr].runs >= 2) {
      return acc;
    }
  }
}

function part2(data) {
  const ops = data.split("\n").map((op) => {
    return { code: op.split(" ")[0], arg: parseInt(op.split(" ")[1]) };
  });
  const PROGRAM_LENGTH = ops.length;
  let threads = [{ ptr: 0, acc: 0, opsRun: 0, branched: false }];

  while (true) {
    let currThread = threads.shift();

    if (currThread.opsRun > PROGRAM_LENGTH) {
      continue;
    }
    if (currThread.ptr >= PROGRAM_LENGTH) {
      return currThread.acc;
    }

    if (ops[currThread.ptr].code === "acc") {
      currThread.acc += ops[currThread.ptr].arg;
      currThread.ptr++;
      currThread.opsRun++;
      threads.push(currThread);
    } else if (ops[currThread.ptr].code === "jmp") {
      if (!currThread.branched) {
        let newThread = _.cloneDeep(currThread);
        newThread.ptr++;
        newThread.opsRun++;
        newThread.branched = true;
        threads.push(newThread);
      }
      currThread.ptr += ops[currThread.ptr].arg;
      currThread.opsRun++;
      threads.push(currThread);
    } else if (ops[currThread.ptr].code === "nop") {
      if (!currThread.branched) {
        let newThread = _.cloneDeep(currThread);
        newThread.ptr += ops[currThread.ptr].arg;
        newThread.opsRun++;
        newThread.branched = true;
        threads.push(newThread);
      }
      currThread.ptr++;
      currThread.opsRun++;
      threads.push(currThread);
    }
  }
}
