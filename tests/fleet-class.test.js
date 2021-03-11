const Fleet = require("../lib/fleet-class");
const Map = require("../lib/map-class");

describe("Fleet Test Suite", () => {
  let fleet;
  let map;

  beforeEach(() => {
    map = new Map("testMap");
    fleet = new Fleet();
  });

  test("isValidInput()", () => {
    const COLUMN_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

    for (let row = 1; row <= 10; row++) {
      for (let column = 0; column < COLUMN_LETTERS.length; column++) {
        let coordinate = COLUMN_LETTERS[column] + String(row);
        expect(fleet.isValidInput(coordinate, map)).toBe(true);
      }
    }

    expect(fleet.isValidInput("", map)).toBe(false);
    expect(fleet.isValidInput("\t", map)).toBe(false);
    expect(fleet.isValidInput("\n", map)).toBe(false);
    expect(fleet.isValidInput("  ", map)).toBe(false);
    expect(fleet.isValidInput("A22", map)).toBe(false);
    expect(fleet.isValidInput("A", map)).toBe(false);
    expect(fleet.isValidInput("3", map)).toBe(false);
  });

  test("isHorizontal()", () => {
    let ship = fleet.allShips[0];
    ship.bow = "A1";
    ship.aft = "D1";
    expect(fleet.isHorizontal(ship)).toBe(true);

    ship.bow = "A1";
    ship.aft = "A5";
    expect(fleet.isHorizontal(ship)).toBe(false);
  });

  test("isVertical()", () => {
    let ship = fleet.allShips[0];
    ship.bow = "E7";
    ship.aft = "I7";
    expect(fleet.isVertical(ship)).toBe(false);

    ship.bow = "F1";
    ship.aft = "F5";
    expect(fleet.isVertical(ship)).toBe(true);
  });

  test("orientShip() for vertical ships", () => {
    let ship = fleet.allShips[0];
    ship.bow = "F1";
    ship.aft = "F5";

    fleet.orientShip(ship);
    expect(ship.bow).toBe("F1");
    expect(ship.aft).toBe("F5");

    ship.bow = "F5";
    ship.aft = "F1";

    fleet.orientShip(ship);
    expect(ship.bow).toBe("F1");
    expect(ship.aft).toBe("F5");
  });

  test("orientShip() for horizontal ships", () => {
    let ship = fleet.allShips[0];
    ship.bow = "D1";
    ship.aft = "A1";

    fleet.orientShip(ship);
    expect(ship.bow).toBe("D1");
    expect(ship.aft).toBe("A1");

    ship.bow = "A1";
    ship.aft = "D1";

    fleet.orientShip(ship);
    expect(ship.bow).toBe("D1");
    expect(ship.aft).toBe("A1");
  });

  test("isIntersectingShips()", () => {
    
  });
});