class Map {
  static shipComponents = "<>^v#"
  static hitMarker = " X ";
  static missMarker = " m ";
  static emptyCell = "   ";
  static columnLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  static topRow = `|   | A | B | C | D | E | F | G | H | I | J |`;
  static midLine = "|---|---|---|---|---|---|---|---|---|---|---|";
  static line = "-".repeat(this.midLine.length);

  constructor(mapOwner) {
    this.mapOwner = mapOwner;
    this.grid1 = {}; // Holds the coordinate and values of the ships places by the player
    this.grid2 = {}; // Holds the coordinate and values of where guesses were made.

    for (let row = 1; row <= 10; row++) {
      for (let column = 0; column < Map.columnLetters.length; column++) {
        let coordinate = Map.columnLetters[column] + String(row);
        this.grid1[coordinate] = Map.emptyCell;
        this.grid2[coordinate] = Map.emptyCell;
      }
    }
  }

  update(coordinate, combatant) {
    if (combatant.reportsHit(coordinate) && this.mapOwner === "human") {
      this.grid2[coordinate] = Map.hitMarker;
      combatant.map.grid1[coordinate] = Map.hitMarker;

    } else if (!combatant.reportsHit(coordinate) && this.mapOwner === "human") {
      this.grid2[coordinate] = Map.missMarker;
      combatant.map.grid1[coordinate] = Map.missMarker;

    } else if (combatant.reportsHit(coordinate) && this.mapOwner === "computer") {
      this.grid2[coordinate] = Map.hitMarker;
      combatant.map.grid1[coordinate] = Map.hitMarker;

    } else if (!combatant.reportsHit(coordinate) && this.mapOwner === "computer") {
      this.grid2[coordinate] = Map.missMarker;
      combatant.map.grid1[coordinate] = Map.missMarker;
    }
  }

  isMiss(value) {
    return value === Map.emptyCell;
  }

  isHit(value) {
    return Map.shipComponents.includes(value.trim()[0]);
  }

  display(fleet, concealMap = true) {
    let cell = this.grid2;

    if (concealMap === false) {
      cell = this.grid1;
    }

    console.log(Map.line);
    console.log(Map.topRow);
    console.log(Map.midLine);

    console.log(`| 1 |${cell.A1}|${cell.B1}|${cell.C1}|${cell.D1}|${cell.E1}|${cell.F1}|${cell.G1}|${cell.H1}|${cell.I1}|${cell.J1}|`);

    console.log(Map.midLine);

    console.log(`| 2 |${cell.A2}|${cell.B2}|${cell.C2}|${cell.D2}|${cell.E2}|${cell.F2}|${cell.G2}|${cell.H2}|${cell.I2}|${cell.J2}|`);

    console.log(Map.midLine);

    console.log(`| 3 |${cell.A3}|${cell.B3}|${cell.C3}|${cell.D3}|${cell.E3}|${cell.F3}|${cell.G3}|${cell.H3}|${cell.I3}|${cell.J3}|`);

    console.log(Map.midLine);

    console.log(`| 4 |${cell.A4}|${cell.B4}|${cell.C4}|${cell.D4}|${cell.E4}|${cell.F4}|${cell.G4}|${cell.H4}|${cell.I4}|${cell.J4}|`);

    console.log(Map.midLine);

    console.log(`| 5 |${cell.A5}|${cell.B5}|${cell.C5}|${cell.D5}|${cell.E5}|${cell.F5}|${cell.G5}|${cell.H5}|${cell.I5}|${cell.J5}|`);

    console.log(Map.midLine);

    console.log(`| 6 |${cell.A6}|${cell.B6}|${cell.C6}|${cell.D6}|${cell.E6}|${cell.F6}|${cell.G6}|${cell.H6}|${cell.I6}|${cell.J6}|`);

    console.log(Map.midLine);

    console.log(`| 7 |${cell.A7}|${cell.B7}|${cell.C7}|${cell.D7}|${cell.E7}|${cell.F7}|${cell.G7}|${cell.H7}|${cell.I7}|${cell.J7}|`);

    console.log(Map.midLine);

    console.log(`| 8 |${cell.A8}|${cell.B8}|${cell.C8}|${cell.D8}|${cell.E8}|${cell.F8}|${cell.G8}|${cell.H8}|${cell.I8}|${cell.J8}|`);

    console.log(Map.midLine);

    console.log(`| 9 |${cell.A9}|${cell.B9}|${cell.C9}|${cell.D9}|${cell.E9}|${cell.F9}|${cell.G9}|${cell.H9}|${cell.I9}|${cell.J9}|`);

    console.log(Map.midLine);

    console.log(`|10 |${cell.A10}|${cell.B10}|${cell.C10}|${cell.D10}|${cell.E10}|${cell.F10}|${cell.G10}|${cell.H10}|${cell.I10}|${cell.J10}|`);

    console.log(Map.line);
  }

  displayMapFooting(fleet) {
    console.log(`Your Ships: ${fleet.getAliveShips().join(", ")}`);
  }

  displayMapHeading() {
    console.log();
    console.log("Your Fleet Map".padStart(29, " "));
  }

  displayWarRoomMap(fleet) {
    let concealMap = false;

    console.clear();
    console.log("Welcome to the war room Admiral.");
    console.log(`- This is your fleet map. You have 5 ships of varying sizes to distribute throughout the map.\n- Coordinates are entered letter first followed by the number. Ex: A5\n- Ships can either be placed horizontally or vertically. No diagonal placements.`)

    this.displayMapHeading();

    this.display(fleet, concealMap);
    this.displayMapFooting(fleet);
  }

  displayMapInCombat(fleet) {
    let concealMap = false;

    console.log("Enemy Fleet Map".padStart(29, " "));
    this.display(fleet);

    this.displayMapHeading();
    this.display(fleet, concealMap);
    this.displayMapFooting(fleet);
  }

  getHitMarker() {
    return Map.hitMarker;
  }

  getMissMarker() {
    return Map.missMarker;
  }

  isCellMarkedMiss(coordinate) {
    return this.grid2[coordinate] === Map.missMarker;
  }

  grid2_CoordinateIsEmpty(coordinate) {
    return this.grid2[coordinate] === Map.emptyCell;
  }

  grid1_CoordinateIsEmpty(coordinate) {
    return this.grid1[coordinate] === Map.emptyCell;
  }
}

module.exports = Map;