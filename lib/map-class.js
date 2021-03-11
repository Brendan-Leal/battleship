class Cell {
  static HIT_MARKER = " X ";
  static MISS_MARKER = " . ";
  static EMPTY_MARKER = "   ";
  static SUNK_MARKER = " ~ ";

  constructor() {
    this.probability = 0;
    this.displayValue = Cell.EMPTY_MARKER;
  }
}

class Map {
  static SHIP_COMPONENTS = "<>^v#"
  static TOP_ROW = `|   | A | B | C | D | E | F | G | H | I | J |`;
  static MIDLINE = "|---|---|---|---|---|---|---|---|---|---|---|";
  static LINE = "-".repeat(Map.MIDLINE.length);

  constructor(mapOwner) {
    this.columnLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    this.mapOwner = mapOwner;
    this.grid1 = {}; // Holds the coordinate and values of the ships places by the player
    this.grid2 = {}; // Holds the coordinate and values of where guesses were made.

    for (let row = 1; row <= 10; row++) {
      for (let column = 0; column < this.columnLetters.length; column++) {
        let coordinate = this.columnLetters[column] + String(row);
        this.grid1[coordinate] = new Cell();
        this.grid2[coordinate] = new Cell();
      }
    }
  }

  grid2_emptyCellAt(coordinate) {
    return this.grid2[coordinate].displayValue === Cell.EMPTY_MARKER;
  }

  grid1_emptyCellAt(coordinate) {
    return this.grid1[coordinate].displayValue === Cell.EMPTY_MARKER;
  }

  display(showGrid1 = true) {
    let cell = this.grid1;

    if (showGrid1 === false) {
      cell = this.grid2;
    }

    console.log(Map.LINE);
    console.log(Map.TOP_ROW);
    console.log(Map.MIDLINE);

    console.log(`| 1 |${cell.A1.displayValue}|${cell.B1.displayValue}|${cell.C1.displayValue}|${cell.D1.displayValue}|${cell.E1.displayValue}|${cell.F1.displayValue}|${cell.G1.displayValue}|${cell.H1.displayValue}|${cell.I1.displayValue}|${cell.J1.displayValue}|`);

    console.log(Map.MIDLINE);

    console.log(`| 2 |${cell.A2.displayValue}|${cell.B2.displayValue}|${cell.C2.displayValue}|${cell.D2.displayValue}|${cell.E2.displayValue}|${cell.F2.displayValue}|${cell.G2.displayValue}|${cell.H2.displayValue}|${cell.I2.displayValue}|${cell.J2.displayValue}|`);

    console.log(Map.MIDLINE);

    console.log(`| 3 |${cell.A3.displayValue}|${cell.B3.displayValue}|${cell.C3.displayValue}|${cell.D3.displayValue}|${cell.E3.displayValue}|${cell.F3.displayValue}|${cell.G3.displayValue}|${cell.H3.displayValue}|${cell.I3.displayValue}|${cell.J3.displayValue}|`);

    console.log(Map.MIDLINE);

    console.log(`| 4 |${cell.A4.displayValue}|${cell.B4.displayValue}|${cell.C4.displayValue}|${cell.D4.displayValue}|${cell.E4.displayValue}|${cell.F4.displayValue}|${cell.G4.displayValue}|${cell.H4.displayValue}|${cell.I4.displayValue}|${cell.J4.displayValue}|`);

    console.log(Map.MIDLINE);

    console.log(`| 5 |${cell.A5.displayValue}|${cell.B5.displayValue}|${cell.C5.displayValue}|${cell.D5.displayValue}|${cell.E5.displayValue}|${cell.F5.displayValue}|${cell.G5.displayValue}|${cell.H5.displayValue}|${cell.I5.displayValue}|${cell.J5.displayValue}|`);

    console.log(Map.MIDLINE);

    console.log(`| 6 |${cell.A6.displayValue}|${cell.B6.displayValue}|${cell.C6.displayValue}|${cell.D6.displayValue}|${cell.E6.displayValue}|${cell.F6.displayValue}|${cell.G6.displayValue}|${cell.H6.displayValue}|${cell.I6.displayValue}|${cell.J6.displayValue}|`);

    console.log(Map.MIDLINE);

    console.log(`| 7 |${cell.A7.displayValue}|${cell.B7.displayValue}|${cell.C7.displayValue}|${cell.D7.displayValue}|${cell.E7.displayValue}|${cell.F7.displayValue}|${cell.G7.displayValue}|${cell.H7.displayValue}|${cell.I7.displayValue}|${cell.J7.displayValue}|`);

    console.log(Map.MIDLINE);

    console.log(`| 8 |${cell.A8.displayValue}|${cell.B8.displayValue}|${cell.C8.displayValue}|${cell.D8.displayValue}|${cell.E8.displayValue}|${cell.F8.displayValue}|${cell.G8.displayValue}|${cell.H8.displayValue}|${cell.I8.displayValue}|${cell.J8.displayValue}|`);

    console.log(Map.MIDLINE);

    console.log(`| 9 |${cell.A9.displayValue}|${cell.B9.displayValue}|${cell.C9.displayValue}|${cell.D9.displayValue}|${cell.E9.displayValue}|${cell.F9.displayValue}|${cell.G9.displayValue}|${cell.H9.displayValue}|${cell.I9.displayValue}|${cell.J9.displayValue}|`);

    console.log(Map.MIDLINE);

    console.log(`|10 |${cell.A10.displayValue}|${cell.B10.displayValue}|${cell.C10.displayValue}|${cell.D10.displayValue}|${cell.E10.displayValue}|${cell.F10.displayValue}|${cell.G10.displayValue}|${cell.H10.displayValue}|${cell.I10.displayValue}|${cell.J10.displayValue}|`);

    console.log(Map.LINE);
  }

  displayProbabilityDensity() {
    let cell = this.grid2;

    console.log(Map.LINE);
    console.log(Map.TOP_ROW);
    console.log(Map.MIDLINE);

    for (let row = 1; row <= 10; row++) {
      let displayRow = [];
      let rowNumber = `| ${row} `;

      if (rowNumber.length >= 5) {
        rowNumber = `| ${row}`;
      }

      for (let columnIndex = 0; columnIndex < this.columnLetters.length; columnIndex++) {
        let coord = this.columnLetters[columnIndex] + String(row);

        let textLength = `${cell[coord].probability}`.length;
        let value = `| ${cell[coord].probability} `
        if (textLength === 2) {
          value = `| ${cell[coord].probability}`
        }
        displayRow.push(value)
      }

      console.log(`${rowNumber}${displayRow[0]}${displayRow[1]}${displayRow[2]}${displayRow[3]}${displayRow[4]}${displayRow[5]}${displayRow[6]}${displayRow[7]}${displayRow[8]}${displayRow[9]}|`);
      console.log(Map.MIDLINE);
    }
  }
}



module.exports = Map;































// class Map {


//   update(coordinate, combatant) {
//     if (combatant.reportsHit(coordinate) && this.mapOwner === "human") {
//       this.grid2[coordinate] = Map.hitMarker;
//       combatant.map.grid1[coordinate] = Map.hitMarker;

//     } else if (!combatant.reportsHit(coordinate) && this.mapOwner === "human") {
//       this.grid2[coordinate] = Map.missMarker;
//       combatant.map.grid1[coordinate] = Map.missMarker;

//     } else if (combatant.reportsHit(coordinate) && this.mapOwner === "computer") {
//       this.grid2[coordinate] = Map.hitMarker;
//       combatant.map.grid1[coordinate] = Map.hitMarker;

//     } else if (!combatant.reportsHit(coordinate) && this.mapOwner === "computer") {
//       this.grid2[coordinate] = Map.missMarker;
//       combatant.map.grid1[coordinate] = Map.missMarker;
//     }
//   }

//   isMiss(value) {
//     return value === Map.emptyCell;
//   }

//   isHit(value) {
//     return Map.shipComponents.includes(value.trim()[0]);
//   }



//   displayMapFooting(fleet) {
//     console.log(`Your Ships: ${fleet.getAliveShips().join(", ")}`);
//   }

//   displayMapHeading() {
//     console.log();
//     console.log("Your Fleet Map".padStart(29, " "));
//   }

//   displayWarRoomMap(fleet) {
//     let concealMap = false;

//     console.clear();
//     console.log("Welcome to the war room Admiral.");
//     console.log(`- This is your fleet map. You have 5 ships of varying sizes to distribute throughout the map.\n- Coordinates are entered letter first followed by the number. Ex: A5\n- Ships can either be placed horizontally or vertically. No diagonal placements.`)

//     this.displayMapHeading();

//     this.display(fleet, concealMap);
//     this.displayMapFooting(fleet);
//   }

//   displayMapInCombat(fleet) {
//     let concealMap = false;

//     console.log("Enemy Fleet Map".padStart(29, " "));
//     this.display(fleet);

//     this.displayMapHeading();
//     this.display(fleet, concealMap);
//     this.displayMapFooting(fleet);
//   }

//   getHitMarker() {
//     return Map.hitMarker;
//   }

//   getMissMarker() {
//     return Map.missMarker;
//   }

//   isCellMarkedMiss(coordinate) {
//     return this.grid2[coordinate] === Map.missMarker;
//   }


// }

