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

function processInput(data) {
  let rules = {};
  data.split("\n").map((r) => {
    let [parentColor, childColors] = r.split(" bags contain ");
    childColors = childColors
      .split(",")
      .map((child) => child.replace(/bags?\.?/, "").trim())
      .map((child) => {
        let o = {};
        o[child.replace(/[0-9]/g, "").trim()] = parseInt(child, 10);
        return o;
      });
    console.log(
      `parent: ${parentColor}, child: ${JSON.stringify(childColors)}`
    );
    rules[parentColor] = childColors[0];
  });
  return rules;
}

function part1(data) {
  rules = processInput(data);
}
