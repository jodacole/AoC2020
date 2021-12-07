const { ChildProcess } = require("child_process");
const fs = require("fs");
const _ = require("lodash");

// fs.readFile("input.txt", "utf8", (err, data) => {
//   if (err) {
//     console.log(error);
//   } else {
//     console.log(part1(data));
//     console.log(part2(data));
//   }
// });

fs.readFile("test_input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(error);
  } else {
    console.log(part1(data));
    //console.log(part2(data));
  }
});

function processRuleString(ruleString) {
  const color = ruleString.split(" bags contain ")[0];
  const rawContents = ruleString
    .split(" bags contain ")[1]
    .split(",")
    .map((child) => child.replace(/bags?\.?/, "").trim());
  let contents = {};
  for (let color of rawContents) {
    if (color === "no other") {
      break;
    }
    contents[color.replace(/\d/g, "").trim()] = parseInt(color, 10);
  }
  let ret = {};
  ret[color] = contents;
  return ret;
}

function part1(data) {
  let distinctRules = data.split("\n").map(processRuleString);
  let rules = {};
  _.merge(rules, distinctRules);
  return rules;
}
