const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log(part1(data));
    console.log(part2(data));
  }
});

function processInput(data) {
  return data.split("\n").map((line) => {
    let [policy, password] = line.split(":").map((s) => s.trim());
    policy = policy.split(/[- ]/);
    return {
      policy: {
        lo: parseInt(policy[0], 10),
        hi: parseInt(policy[1], 10),
        char: policy[2],
      },
      password: password,
    };
  });
}

function part1(data) {
  return processInput(data).filter((entry) => {
    let occurances = (
      entry.password.match(new RegExp(entry.policy.char, "g")) || []
    ).length;
    return occurances >= entry.policy.lo && occurances <= entry.policy.hi;
  }).length;
}

function part2(data) {
  return processInput(data).filter((entry) => {
    let actualLo = entry.password.at(entry.policy.lo - 1),
      actualHi = entry.password.at(entry.policy.hi - 1);
    return (
      (actualLo === entry.policy.char || actualHi === entry.policy.char) &&
      actualLo !== actualHi
    );
  }).length;
}
