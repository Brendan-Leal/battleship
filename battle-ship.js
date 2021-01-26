const readline = require("readline-sync");
const INTRO_ASCII = {
  l1: `______       _   _   _      _____ _     _       `,
  l2: `| ___ \\     | | | | | |    /  ___| |   (_)      `,
  l3: `| |_/ / __ _| |_| |_| | ___\\ \`--.| |__  _ _ __  `,
  l4: `| ___ \\/ _\` | __| __| |/ _ \\\`--. \\ '_ \\| | '_ \\ `,
  l5: `| |_/ / (_| | |_| |_| |  __/\\__/ / | | | | |_) |`,
  l6: `\\____/ \\__,_|\\__|\\__|_|\\___\\____/|_| |_|_| .__/ `,
  l7: `                                         | |    `,
  l8: `                                         |_|`,

  display() {
    for (const line in this) {
      while (line.startsWith("l")) {
        console.log(this[line]);
        break;
      }
    }
    readline.question("\n\nPress enter to begin");
  }
};

class Fleet {
  static bowHorizontal = " > ";
  static aftHorizontal = " < ";
  static shipBodyHorizontal = "###";
  static bowVertical = " ^ ";
  static aftVertical = " v ";
  static shipBodyVertical = " # ";
  static shipNames = ["carrier", "battleship"]; //["carrier", "battleship", "cruiser", "submarine", "destroyer"];

  constructor() {
    this.carrier = 6;
    this.battleship = 5;
    // this.cruiser = 4;
    // this.submarine = 3;
    // this.destroyer = 3;
    this.bow = null;
    this.aft = null;
  }

  placeShipIn(map) {
    if (this.isHorizontal()) {
      map.grid[this.bow] = Fleet.bowHorizontal;
      map.grid[this.aft] = Fleet.aftHorizontal;

      this.fillHorizontalSpace(map);
    } else if (this.isVertical()) {
      map.grid[this.bow] = Fleet.bowVertical;
      map.grid[this.aft] = Fleet.aftVertical;

      this.filVerticalSpace(map);
    }
  }

  orientShip() {
    if (this.isHorizontal()) {
      if (this.bow[0] < this.aft[0]) { // Set the bow to alway be the right most coordinate
        let temp = this.bow;
        this.bow = this.aft;
        this.aft = temp;
      }
    } else if (this.isVertical()) {
      // Set the bow to always be the top most coordinate
      if (this.bow.length === 3) {
        this.bow = this.aft;
        this.aft = this.bow[0] + "10";
      } else if (this.bow[1] > this.aft[1] && this.aft.length !== 3) {
        let temp = this.bow;
        this.bow = this.aft;
        this.aft = temp;
      }
    }
  }

  filVerticalSpace(map) {
    let start = Number(this.bow[1]) + 1;
    let end = this.aft[1];
    if (this.aft.length === 3) {
      end = 10;
    }

    for (start; start < end; start++) {
      let gridPosition = this.bow[0] + String(start);
      map.grid[gridPosition] = Fleet.shipBodyVertical;
    }
  }

  fillHorizontalSpace(map) {
    let start = this.aft.charCodeAt(0) + 1;
    let end = this.bow.charCodeAt(0);

    for (start; start < end; start++) {
      let number = this.bow[1];
      if (this.bow.length === 3) number = 10;

      let gridPosition = String.fromCharCode(start) + number;

      map.grid[gridPosition] = Fleet.shipBodyHorizontal;
    }
  }

  isHorizontal() {
    // Horizontal coordinates will always end in the same number
    return this.bow[this.bow.length - 1] === this.aft[this.aft.length - 1];
  }

  isVertical() {
    // vertical coordinates will always start with the same letter.
    return this.bow[0] === this.aft[0];
  }

  setShipCoordinates(map, shipLength) {
    do {
      this.bow = readline.question("Enter the coordinate of where you want the bow to be: ").toUpperCase();

      while (!this.isEmptySquare(this.bow, map) || !this.isValidInput(this.bow, map)) {
        console.log("\nAdmiral! We cannot place this ship there");
        this.bow = readline.question("Enter the coordinate of where you want the bow to be: ").toUpperCase();
      }

      this.aft = readline.question("Enter the coordinate of where you want the aft to be: ").toUpperCase();

      while (!this.isEmptySquare(this.aft, map) || !this.isValidInput(this.aft, map)) {
        console.log("\nAdmiral! We cannot place this ship there");
        this.aft = readline.question("Enter the coordinate of where you want the aft to be: ").toUpperCase();
      }
      this.orientShip();
    } while (this.isIntersectingShips(map) || this.desiredLengthNotMet(shipLength) || this.isDiagonal());
  }

  isDiagonal() {
    if (!this.isHorizontal() && !this.isVertical()) {
      console.log("\nAdmiral! Our fleet is unable to orientate itself diagonally. Please follow the rules of engagement!");
    }
    return !this.isHorizontal() && !this.isVertical();
  }

  desiredLengthNotMet(shipLength) {
    if (this.isHorizontal()) {
      let start = this.aft.charCodeAt(0);
      let end = this.bow.charCodeAt(0);

      if ((end - start) + 1 !== this[shipLength]) {
        console.log("\nAdmiral! Make sure the the ships occupies the correct number of spaces");
      }

      return (end - start) + 1 !== this[shipLength];

    } else if (this.isVertical()) {
      let start = Number(this.bow[1]);
      let end = Number(this.aft[1]);
      if (this.aft.length === 3) {
        end = 10;
      }

      if ((end - start) + 1 !== this[shipLength]) {
        console.log("\nAdmiral! Make sure the the ships occupies the correct number of spaces");
      }
      return (end - start) + 1 !== this[shipLength];
    }
  }

  isIntersectingShips(map) {
    if (this.isHorizontal()) {
      let start = this.aft.charCodeAt(0) + 1;
      let end = this.bow.charCodeAt(0);

      for (start; start < end; start++) {
        let number = this.bow[1];

        if (this.bow.length === 3) number = 10;

        let gridPosition = String.fromCharCode(start) + number;

        if (map.grid[gridPosition] !== Map.emptySquare) {
          console.log("\nAdmiral! We don't want our fleet to collide. Use better judgment or be removed from command.");
          return true;
        }
      }
      return false;

    } else if (this.isVertical()) {
      let start = Number(this.bow[1]) + 1;
      let end = this.aft[1];

      if (this.aft.length === 3) {
        end = 10;
      }

      for (start; start < end; start++) {
        let gridPosition = this.bow[0] + String(start);
        if (map.grid[gridPosition] !== Map.emptySquare) {
          console.log("\nAdmiral! We don't want our fleet to collide. Use better judgment or be removed from command.");
          return true;
        }
      }
      return false;
    }
  }

  isEmptySquare(coordinate, map) {
    return map.grid[coordinate] === Map.emptySquare;
  }

  isValidInput(coordinate, map) {
    return Object.keys(map.grid).includes(coordinate);
  }
}

class ComputerFleet extends Fleet {
  setShipCoordinates(map, shipLength) {
    do {
      this.setRandomBowCoordinate(map);

      this.setAftCoordinate(map, shipLength);

      while (!this.isEmptySquare(this.bow, map) || !this.isValidInput(this.bow, map)) {
        this.setAftCoordinate(map, shipLength);
      }

      this.orientShip();
    } while (this.isIntersectingShips(map) || this.desiredLengthNotMet(shipLength) || this.isDiagonal());

  }

  setRandomBowCoordinate(map) {
    let min = 0;
    let max = Object.keys(map.grid).length;

    this.bow = Object.keys(map.grid)[this.getRandomNumber(min, max)];

    while (!this.isEmptySquare(this.bow, map) || !this.isValidInput(this.bow, map)) {
      this.bow = Object.keys(map.grid)[this.getRandomNumber(min, max)];
    }
  }

  setAftCoordinate(map, shipLength) {
    let possableOptions = this.findPossibleOptions(map, shipLength);
    possableOptions = possableOptions.filter(coordinate => {
      return this.isEmptySquare(coordinate, map);
    });

    let minRandValue = 0;
    let maxRandValue = possableOptions.length;

    let randomCoordinate = this.getRandomNumber(minRandValue, maxRandValue);
    this.aft = possableOptions[randomCoordinate];
  }

  findPossibleOptions(map, shipLength) {
    let options = [];
    const LEFT = "L";
    const RIGHT = "R";
    const UP = "U";
    const DOWN = "D";

    options.push(this.countVerticalSpaces(UP, shipLength));
    options.push(this.countHorizontalSpaces(RIGHT, shipLength));
    options.push(this.countVerticalSpaces(DOWN, shipLength));
    options.push(this.countHorizontalSpaces(LEFT, shipLength));
    options = options.filter(coordinate => coordinate !== null);

    return options;
  }

  countVerticalSpaces(direction, shipLength) {
    let start = Number(this.bow[1]);
    if (this.bow.length === 3) {
      start = 10;
    }

    let end = null;

    if (direction === "D") {
      if (start === 10) return null;

      end = start + this[shipLength] - 1;

      if (end > 10) return null;

      return this.bow[0] + String(end);

    } else if (direction === "U") {
      end = start - (this[shipLength] - 1);

      if (end <= 0) return null;

      return this.bow[0] + String(end);
    }
  }

  countHorizontalSpaces(direction, shipLength) {
    let start = this.bow.charCodeAt(0);
    let end = null;

    switch (direction) {
      case "L":
        end = start - this[shipLength] + 1;
        end = String.fromCharCode(end);

        if (end >= "A") {
          if (this.bow.length === 3) {
            return end + "10";
          } else {
            return end + String(this.bow[1]);
          }
        } else {
          return null;
        }

      case "R":
        end = start + this[shipLength] - 1;
        end = String.fromCharCode(end);

        if (end <= "J") {
          if (this.bow.length === 3) {
            return end + "10";
          } else {
            return end + String(this.bow[1]);
          }
        } else {
          return null;
        }
    }
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

class Map {
  static columnLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  static emptySquare = "   ";

  constructor(playerType) {
    this.playerType = playerType;
    this.grid = {};
    this.emptyGrid = {};

    for (let row = 1; row <= 10; row++) {
      for (let column = 0; column < Map.columnLetters.length; column++) {
        let coordinate = Map.columnLetters[column] + String(row);
        this.grid[coordinate] = Map.emptySquare;
        this.emptyGrid[coordinate] = Map.emptySquare;
      }
    }

    this.line0 = `|   | A | B | C | D | E | F | G | H | I | J |`;
    this.horizontalLine = "|---|---|---|---|---|---|---|---|---|---|---|";
    this.line = "-".repeat(this.horizontalLine.length);
  }

  display(isMapConcealed = true) {
    let coordinate = this.emptyGrid;
    if (isMapConcealed === false) {
      coordinate = this.grid;
    }

    console.log(this.line);
    console.log(this.line0);
    console.log(this.horizontalLine);

    console.log(`| 1 |${coordinate.A1}|${coordinate.B1}|${coordinate.C1}|${coordinate.D1}|${coordinate.E1}|${coordinate.F1}|${coordinate.G1}|${coordinate.H1}|${coordinate.I1}|${coordinate.J1}|`);

    console.log(this.horizontalLine);
    console.log(`| 2 |${coordinate.A2}|${coordinate.B2}|${coordinate.C2}|${coordinate.D2}|${coordinate.E2}|${coordinate.F2}|${coordinate.G2}|${coordinate.H2}|${coordinate.I2}|${coordinate.J2}|`);

    console.log(this.horizontalLine);
    console.log(`| 3 |${coordinate.A3}|${coordinate.B3}|${coordinate.C3}|${coordinate.D3}|${coordinate.E3}|${coordinate.F3}|${coordinate.G3}|${coordinate.H3}|${coordinate.I3}|${coordinate.J3}|`);

    console.log(this.horizontalLine);
    console.log(`| 4 |${coordinate.A4}|${coordinate.B4}|${coordinate.C4}|${coordinate.D4}|${coordinate.E4}|${coordinate.F4}|${coordinate.G4}|${coordinate.H4}|${coordinate.I4}|${coordinate.J4}|`);

    console.log(this.horizontalLine);
    console.log(`| 5 |${coordinate.A5}|${coordinate.B5}|${coordinate.C5}|${coordinate.D5}|${coordinate.E5}|${coordinate.F5}|${coordinate.G5}|${coordinate.H5}|${coordinate.I5}|${coordinate.J5}|`);

    console.log(this.horizontalLine);
    console.log(`| 6 |${coordinate.A6}|${coordinate.B6}|${coordinate.C6}|${coordinate.D6}|${coordinate.E6}|${coordinate.F6}|${coordinate.G6}|${coordinate.H6}|${coordinate.I6}|${coordinate.J6}|`);

    console.log(this.horizontalLine);
    console.log(`| 7 |${coordinate.A7}|${coordinate.B7}|${coordinate.C7}|${coordinate.D7}|${coordinate.E7}|${coordinate.F7}|${coordinate.G7}|${coordinate.H7}|${coordinate.I7}|${coordinate.J7}|`);

    console.log(this.horizontalLine);
    console.log(`| 8 |${coordinate.A8}|${coordinate.B8}|${coordinate.C8}|${coordinate.D8}|${coordinate.E8}|${coordinate.F8}|${coordinate.G8}|${coordinate.H8}|${coordinate.I8}|${coordinate.J8}|`);

    console.log(this.horizontalLine);
    console.log(`| 9 |${coordinate.A9}|${coordinate.B9}|${coordinate.C9}|${coordinate.D9}|${coordinate.E9}|${coordinate.F9}|${coordinate.G9}|${coordinate.H9}|${coordinate.I9}|${coordinate.J9}|`);

    console.log(this.horizontalLine);
    console.log(`|10 |${coordinate.A10}|${coordinate.B10}|${coordinate.C10}|${coordinate.D10}|${coordinate.E10}|${coordinate.F10}|${coordinate.G10}|${coordinate.H10}|${coordinate.I10}|${coordinate.J10}|`);

    console.log(this.line);

    this.displayShips();    
  }

  displayShips() {
    if (this.playerType === "player") {
      console.log(`Ships in your fleet: (${this.shipNames.join(", ")})\n`);
    } else {
      console.log(`Ships in the enemy fleet: (${this.shipNames.join(", ")})\n`);
    }
  }
}
Object.assign(Map.prototype, Fleet);

const Combat = {
  fireUpon(combatant) {
    let coordinate = readline.question("Admiral! Choose a coordinate to fire upon: ").toUpperCase(); // Needs validation
    console.log(combatant.computerMap.grid[coordinate]);
  },


};

class Player {
  constructor() {
    this.playersMap = new Map("player");
    this.fleet = new Fleet();
  }

  setFleetPosition(isMapConcealed) {
    Fleet.shipNames.forEach(ship => {
      console.clear();
      console.log("Welcome to the war room Admiral.");
      console.log(`- This is your fleet map. You have 5 ships of varying sizes to distribute throughout the map.\n- Coordinates are entered letter first followed by the number. Ex: A5\n- Ships can either be placed horizontally or vertically. No diagonal placements.`);

      this.playersMap.display(isMapConcealed);

      console.log(`The ${ship} occupies ${this.fleet[ship]} spaces`);

      this.fleet.setShipCoordinates(this.playersMap, ship);

      this.fleet.placeShipIn(this.playersMap);
      console.clear();
    });
  }
}
Object.assign(Player.prototype, Combat);

class Computer {
  constructor() {
    this.computerMap = new Map("computer");
    this.computerFleet = new ComputerFleet();
  }

  initializeShipPlacement() {
    Fleet.shipNames.forEach(ship => {
      this.computerFleet.setShipCoordinates(this.computerMap, ship);
      this.computerFleet.placeShipIn(this.computerMap);

      this.computerMap.display();
      console.clear();
    });
    console.clear();
  }
}
Object.assign(Computer.prototype, Combat);

class BattleShipGame {
  constructor() {
    this.player = new Player();
    this.computer = new Computer();
  }

  play() {
    // INTRO_ASCII.display();
    let isMapConcealed = false;

    this.player.setFleetPosition(isMapConcealed);

    this.computer.initializeShipPlacement();

    console.log("Enemy Fleet Map");
    this.computer.computerMap.display();
    this.computer.computerMap.display(isMapConcealed);

    console.log("\n\nYour Fleet Map");
    this.player.playersMap.display(isMapConcealed);

    this.player.fireUpon(this.computer);
    

  }
}

let battleShip = new BattleShipGame();
battleShip.play()




