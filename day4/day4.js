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

function processInput(data) {
  return data.split("\n\n").map((p) => {
    let pObj = {};
    p.split(/\s/).map(
      (field) => (pObj[field.split(":")[0]] = field.split(":")[1])
    );
    return pObj;
  });
}

function part1(data) {
  const expectedFields = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid",
    "cid",
  ];
  return processInput(data).filter((p) => {
    if (Object.keys(p).length <= expectedFields.length - 2) {
      return false;
    }
    if (Object.keys(p).length === expectedFields.length - 1 && "cid" in p) {
      return false;
    }
    return true;
  }).length;
}

function part2(data) {
  const checkLimits = (val, lo, hi) => {
    return parseInt(val, 10) >= lo && parseInt(val, 10) <= hi;
  };
  const fieldRules = {
    byr: (byr) => {
      return checkLimits(byr, 1920, 2002);
    },
    iyr: (iyr) => {
      return checkLimits(iyr, 2010, 2020);
    },
    eyr: (eyr) => {
      return checkLimits(eyr, 2020, 2030);
    },
    hgt: (hgt) => {
      if (hgt.slice(hgt.length - 2) === "in") {
        return checkLimits(hgt, 59, 76);
      } else if (hgt.slice(hgt.length - 2) === "cm") {
        return checkLimits(hgt, 150, 193);
      }
      return false;
    },
    hcl: (hcl) => {
      return /^#[0-9a-f]{6}$/.test(hcl);
    },
    ecl: (ecl) => {
      return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(ecl);
    },
    pid: (pid) => {
      return /^[0-9]{9}$/.test(pid);
    },
  };

  return processInput(data).filter((p) => {
    return Object.keys(fieldRules).reduce((valid, nextField) => {
      return valid && p[nextField] && fieldRules[nextField](p[nextField]);
    }, true);
  }).length;
}
