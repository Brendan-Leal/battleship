const Map = require("../lib/map-class");

describe("Map Test Suite", () => {

  let map;
  beforeEach(() => {
    map = new Map("testMap");
  });


  test("grid1_emptyCellAt", () => {
    expect(map.grid1_emptyCellAt("A1")).toBe(true);
    expect(map.grid1_emptyCellAt("J10")).toBe(true);
    expect(map.grid1_emptyCellAt("D6")).toBe(true);

    map.grid1["A1"].displayValue = " X ";
    expect(map.grid1_emptyCellAt("A1")).toBe(false);
  });

  test("grid2_emptyCellAt", () => {
    expect(map.grid2_emptyCellAt("A1")).toBe(true);
    expect(map.grid2_emptyCellAt("J10")).toBe(true);
    expect(map.grid2_emptyCellAt("D6")).toBe(true);

    map.grid2["A1"].displayValue = " X ";
    expect(map.grid2_emptyCellAt("A1")).toBe(false);
  });
});