const Computer = require("../game-modules/computer-class");

describe("Ship Tracker Test Suite", () => {
  let computer;
  let human;

  beforeEach(() => {
    computer = new Computer();
  });

  test("isInRow1() returns true if a given coordinate is in the first row, false otherwise", () => {
    let coord = "A1";
    expect(computer.shipTracker.isInRow1(coord)).toBe(true);

    coord = "J1";
    expect(computer.shipTracker.isInRow1(coord)).toBe(true);

    coord = "A10";
    expect(computer.shipTracker.isInRow1(coord)).toBe(false);

    coord = "D5";
    expect(computer.shipTracker.isInRow1(coord)).toBe(false);

    coord = "J10";
    expect(computer.shipTracker.isInRow1(coord)).toBe(false);
  });

  test("findLowestCoordinate() sorts the coordinatesHit array and returns the last element", () => {
    computer.shipTracker.isVertical = true;

    computer.shipTracker.coordinatesHit = ["F2, F1"];
    expect(computer.shipTracker.findLowestCoordinate()).toBe("F2");

    computer.shipTracker.coordinatesHit = ["J8", "J9"];
    expect(computer.shipTracker.findLowestCoordinate()).toBe("J9");

    computer.shipTracker.coordinatesHit = ["G5", "G6", "G4", "G5"];
    expect(computer.shipTracker.findLowestCoordinate()).toBe("G6");
  });  

  test("isBelowInitialHit() returns true if the last coordinate fired on is below the initial hit, otherwise false", () => {
    computer.shipTracker.initialHit = "A5";
    let lastCoordFiredOn = "A7";
    expect(computer.shipTracker.isBelowInitialHit(lastCoordFiredOn)).toBe(true);

    computer.shipTracker.initialHit = "A6";
    lastCoordFiredOn = "A5";
    expect(computer.shipTracker.isBelowInitialHit(lastCoordFiredOn)).toBe(false);

    computer.shipTracker.initialHit = "F4";
    lastCoordFiredOn = "F5";
    expect(computer.shipTracker.isBelowInitialHit(lastCoordFiredOn)).toBe(true);
  });

  test("initialHitInRow1 returns true if the initialHit is in the first row", () => {
    computer.shipTracker.initialHit = "A1";
    expect(computer.shipTracker.initialHitInRow1()).toBe(true);

    computer.shipTracker.initialHit = "J1";
    expect(computer.shipTracker.initialHitInRow1()).toBe(true);

    computer.shipTracker.initialHit = "J10";
    expect(computer.shipTracker.initialHitInRow1()).toBe(false);

    computer.shipTracker.initialHit = "A10";
    expect(computer.shipTracker.initialHitInRow1()).toBe(false);

    computer.shipTracker.initialHit = "D5";
    expect(computer.shipTracker.initialHitInRow1()).toBe(false);
  });

  test("If initialHit is in row 1 then search properties are fliped", () => {
    computer.shipTracker.initialHit = "A1";
    let lastCoordFiredOn = "A2"

    computer.shipTracker.findNextCoordinate(lastCoordFiredOn, null);

    expect(computer.shipTracker.searchUp).toBe(false);
    expect(computer.shipTracker.searchDown).toBe(true);
  });

  test("findCoordinateAbove returns the coordinate value above, or null", () => {
    let coord = "A1";
    expect(computer.shipTracker.findCoordinateAbove(coord)).toBe(null);

    coord = "A10";
    expect(computer.shipTracker.findCoordinateAbove(coord)).toBe("A9");

    coord = "J1";
    expect(computer.shipTracker.findCoordinateAbove(coord)).toBe(null);

    coord = "B5";
    expect(computer.shipTracker.findCoordinateAbove(coord)).toBe("B4");

    coord = "G7";
    expect(computer.shipTracker.findCoordinateAbove(coord)).toBe("G6");
  });

  test("findCoordinateBelow returns the coordinate value below, or null", () => {
    let coord = "A1";
    expect(computer.shipTracker.findCoordinateBelow(coord)).toBe("A2");

    coord = "J10";
    expect(computer.shipTracker.findCoordinateBelow(coord)).toBe(null);

    coord = "J1";
    expect(computer.shipTracker.findCoordinateBelow(coord)).toBe("J2");

    coord = "B5";
    expect(computer.shipTracker.findCoordinateBelow(coord)).toBe("B6");

    coord = "G10";
    expect(computer.shipTracker.findCoordinateBelow(coord)).toBe(null);
  });

  test("findCoordinateRight returns the coordinate value to the right, or null", () => {
    let coord = "A1";
    expect(computer.shipTracker.findCoordinateRight(coord)).toBe("B1");

    coord = "J10";
    expect(computer.shipTracker.findCoordinateRight(coord)).toBe(null);

    coord = "J1";
    expect(computer.shipTracker.findCoordinateRight(coord)).toBe(null);

    coord = "B5";
    expect(computer.shipTracker.findCoordinateRight(coord)).toBe("C5");

    coord = "D7";
    expect(computer.shipTracker.findCoordinateRight(coord)).toBe("E7");
  });

  test("findCoordinateLeft returns the coordinate value to the left, or null", () => {
    let coord = "A1";
    expect(computer.shipTracker.findCoordinateLeft(coord)).toBe(null);

    coord = "J10";
    expect(computer.shipTracker.findCoordinateLeft(coord)).toBe("I10");

    coord = "J1";
    expect(computer.shipTracker.findCoordinateLeft(coord)).toBe("I1");

    coord = "A10";
    expect(computer.shipTracker.findCoordinateLeft(coord)).toBe(null);

    coord = "D7";
    expect(computer.shipTracker.findCoordinateLeft(coord)).toBe("C7");
  });

  test("creating a new computer object creates the map, fleet, and shipTracker objects", () => {
    let newComputer = new Computer();

    expect(newComputer.hasOwnProperty("fleet")).toBe(true);
    expect(newComputer.hasOwnProperty("map")).toBe(true);
    expect(newComputer.hasOwnProperty("shipTracker")).toBe(true);
  });
});




