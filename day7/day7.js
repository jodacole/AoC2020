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
  return { color: color, contents: contents };
}

function processInput(data) {
  let distinctRules = data.split("\n").map(processRuleString);
  let rules = {};
  for (rule of distinctRules) {
    rules[rule.color] = rule.contents;
  }
  return rules;
}

function part1(data) {
  const rules = processInput(data);
  let agenda = Object.keys(rules).map((k) => [k]);
  let canCarryGold = new Set();
  while (!_.isEmpty(agenda)) {
    let currPath = agenda.shift();
    if (
      currPath.at(currPath.length - 1) === "shiny gold" ||
      canCarryGold.has(currPath.at(currPath.length - 1))
    ) {
      for (let color of currPath.slice(0, currPath.length - 1)) {
        canCarryGold.add(color);
      }
    } else {
      for (let child of Object.keys(rules[currPath.at(currPath.length - 1)])) {
        agenda.push(currPath.concat(child));
      }
    }
  }
  return canCarryGold.size;
}

function part2(data) {
  const rules = processInput(data);

  function bagsIn(color) {
    if (_.isEmpty(rules[color])) {
      return 0;
    } else {
      let sum = 0;
      for (let child in rules[color]) {
        sum += rules[color][child] + rules[color][child] * bagsIn(child);
      }
      return sum;
    }
  }
  return bagsIn("shiny gold");
}
