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
  const instructions = data.split("\n").map((i) => {
    return { action: i[0], value: parseInt(i.slice(1), 10) };
  });

  const calcNextPosition = (position, instruction) => {
    switch (instruction.action) {
      case "N":
        position.y += instruction.value;
        return position;
      case "S":
        position.y -= instruction.value;
        return position;
      case "E":
        position.x += instruction.value;
        return position;
      case "W":
        position.x -= instruction.value;
        return position;
      case "R":
        position.dir = (position.dir + (360 - instruction.value)) % 360;
        return position;
      case "L":
        position.dir = (position.dir + instruction.value) % 360;
        return position;
      case "F":
        const newInstruction = {
          action: ["E", "N", "W", "S"][position.dir / 90],
          value: instruction.value,
        };
        return calcNextPosition(position, newInstruction);
    }
  };
  let finalPosition = instructions.reduce(calcNextPosition, {
    x: 0,
    y: 0,
    dir: 0,
  });
  return Math.abs(finalPosition.x) + Math.abs(finalPosition.y);
}

function part2(data) {
  const instructions = data.split("\n").map((i) => {
    return { action: i[0], value: parseInt(i.slice(1), 10) };
  });

  const degToRad = (angle) => (angle / 180) * Math.PI;

  const calcNextPosition = (position, instruction) => {
    switch (instruction.action) {
      case "N":
        position.wpY += instruction.value;
        return position;
      case "S":
        position.wpY -= instruction.value;
        return position;
      case "E":
        position.wpX += instruction.value;
        return position;
      case "W":
        position.wpX -= instruction.value;
        return position;
      case "R":
        nextWPX = Math.round(
          position.wpX * Math.cos(degToRad(-1 * instruction.value)) -
            position.wpY * Math.sin(degToRad(-1 * instruction.value))
        );
        nextWPY = Math.round(
          position.wpY * Math.cos(degToRad(-1 * instruction.value)) +
            position.wpX * Math.sin(degToRad(-1 * instruction.value))
        );
        position.wpX = nextWPX;
        position.wpY = nextWPY;
        return position;
      case "L":
        nextWPX = Math.round(
          position.wpX * Math.cos(degToRad(instruction.value)) -
            position.wpY * Math.sin(degToRad(instruction.value))
        );
        nextWPY = Math.round(
          position.wpY * Math.cos(degToRad(instruction.value)) +
            position.wpX * Math.sin(degToRad(instruction.value))
        );
        position.wpX = nextWPX;
        position.wpY = nextWPY;
        return position;
      case "F":
        position.X += instruction.value * position.wpX;
        position.Y += instruction.value * position.wpY;
        return position;
    }
  };
  let finalPosition = instructions.reduce(calcNextPosition, {
    X: 0,
    Y: 0,
    wpX: 10,
    wpY: 1,
  });
  return Math.abs(finalPosition.X) + Math.abs(finalPosition.Y);
}
