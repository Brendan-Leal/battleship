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

class Ship {
  static shipComponents = "<>^v#"
  static bowHorizontal = " > ";
  static aftHorizontal = " < ";
  static shipBodyHorizontal = "###";
  static bowVertical = " ^ ";
  static aftVertical = " v ";
  static shipBodyVertical = " # ";

  constructor(shipName, shipLength, health) {
    this.isSunk = false;
    this.shipName = shipName;
    this.shipLength = shipLength;
    this.health = health;
    this.positionInMap = {};
    this.bow = null;
    this.aft = null;
  }

  isShipSunk() {
    if (this.health === 0) {
      this.isSunk = true;
    } 
  }
}

class Fleet {
  static allShipNames = ["carrier", "battleship"]; //["carrier", "battleship", "cruiser", "submarine", "destroyer"];
  constructor() {
    this.shipSunk = 0;
    this.carrier = new Ship("carrier", 6, 6);
    this.battleship = new Ship("battleship", 5, 5);
    this.cruiser = new Ship("cruiser", 4, 4);
    this.submarine = new Ship("submarine", 3, 3);
    this.destroyer = new Ship("destroyer", 3, 3);
  }

  isFleetDestroyed() {
    return Fleet.allShipNames.every(ship => {
     return this[ship].isSunk;
    });
  }

  setShipCoodinates(map, ship) {
    do {
      ship.bow = readline.question("Enter the coordinate of where you want the bow to be: ").toUpperCase();

      while (!this.grid1_hasEmptyCell(ship.bow, map) || !this.isValidInput(ship.bow, map)) {
        console.log("\nAdmiral! We cannot place this ship there");
        ship.bow = readline.question("Enter the coordinate of where you want the bow to be: ").toUpperCase();
      }

      ship.aft = readline.question("Enter the coordinate of where you want the aft to be: ").toUpperCase();

      while (!this.grid1_hasEmptyCell(ship.aft, map) || !this.isValidInput(ship.aft, map)) {
        console.log("\nAdmiral! We cannot place this ship there");
        ship.aft = readline.question("Enter the coordinate of where you want the aft to be: ").toUpperCase();
      }
      this.orientShip(ship);

    } while (this.isIntersectingShips(map, ship) || this.desiredLengthNotMet(ship) || this.isDiagonal(ship));
    console.clear();
  }

  getAliveShips() {
    let ships = [];
    Fleet.allShipNames.forEach(ship => {
      if (this[ship].health > 0) {
        ships.push(this[ship].shipName);
      }
    });
    return ships;
  }

  grid1_hasEmptyCell(value, map) {
    return map.grid1[value] === Map.emptyCell;
  }

  grid2_HasEmptyCell(value, map) {
    return map.grid2[value] === Map.emptyCell;
  }

  isValidInput(value, map) {
    return Object.keys(map.grid1).includes(value);
  }

  orientShip(ship) {
    if (this.isHorizontal(ship)) {
      if (ship.bow[0] < ship.aft[0]) { // Set the bow to alway be the right most coordinate
        let temp = ship.bow;
        ship.bow = ship.aft;
        ship.aft = temp;
      }
    } else if (this.isVertical(ship)) {
      // Set the bow to always be the top most coordinate
      if (ship.bow.length === 3) {
        ship.bow = ship.aft;
        ship.aft = ship.bow[0] + "10";
      } else if (ship.bow[1] > ship.aft[1] && ship.aft.length !== 3) {
        let temp = ship.bow;
        ship.bow = ship.aft;
        ship.aft = temp;
      }
    }
  }

  isHorizontal(ship) {
    // Horizontal coordinates will always end in the same number
    return ship.bow[ship.bow.length - 1] === ship.aft[ship.aft.length - 1];
  }

  isVertical(ship) {
    // vertical coordinates will always start with the same letter.
    return ship.bow[0] === ship.aft[0];
  }

  isIntersectingShips(map, ship) {
    if (this.isHorizontal(ship)) {
      let start = ship.aft.charCodeAt(0) + 1;
      let end = ship.bow.charCodeAt(0);

      for (start; start < end; start++) {
        let number = ship.bow[1];

        if (ship.bow.length === 3) number = 10;

        let coordinateValue = String.fromCharCode(start) + number;

        if (map.grid1[coordinateValue] !== Map.emptyCell) {
          console.log("\nAdmiral! We don't want our fleet to collide. Use better judgment or be removed from command.");
          return true;
        }
      }
      return false;

    } else if (this.isVertical(ship)) {
      let start = Number(ship.bow[1]) + 1;
      let end = ship.aft[1];

      if (ship.aft.length === 3) {
        end = 10;
      }

      for (start; start < end; start++) {
        let coordinateValue = ship.bow[0] + String(start);
        if (map.grid1[coordinateValue] !== Map.emptyCell) {
          console.log("\nAdmiral! We don't want our fleet to collide. Use better judgment or be removed from command.");
          return true;
        }
      }
      return false;
    }
  }

  desiredLengthNotMet(ship) {
    if (this.isHorizontal(ship)) {
      let start = ship.aft.charCodeAt(0);
      let end = ship.bow.charCodeAt(0);

      if ((end - start) + 1 !== ship.shipLength) {
        console.log("\nAdmiral! Make sure the the ships occupies the correct number of spaces");
      }

      return (end - start) + 1 !== ship.shipLength;

    } else if (this.isVertical(ship)) {
      let start = Number(ship.bow[1]);
      let end = Number(ship.aft[1]);
      if (ship.aft.length === 3) {
        end = 10;
      }

      if ((end - start) + 1 !== ship.shipLength) {
        console.log("\nAdmiral! Make sure the the ships occupies the correct number of spaces");
      }
      return (end - start) + 1 !== ship.shipLength;
    }
  }

  isDiagonal(ship) {
    if (!this.isHorizontal(ship) && !this.isVertical(ship)) {
      console.log("\nAdmiral! Our fleet is unable to orientate itself diagonally. Please follow the rules of engagement!");
    }
    return !this.isHorizontal(ship) && !this.isVertical(ship);
  }

  placeShipInMap(ship, map) {
    if (this.isHorizontal(ship)) {
      map.grid1[ship.bow] = Ship.bowHorizontal;
      map.grid1[ship.aft] = Ship.aftHorizontal;

      ship.positionInMap[ship.bow] = Ship.bowHorizontal;
      ship.positionInMap[ship.aft] = Ship.aftHorizontal;

      this.fillHorizontalSpace(map, ship);
    } else if (this.isVertical(ship)) {
      map.grid1[ship.bow] = Ship.bowVertical;
      map.grid1[ship.aft] = Ship.aftVertical;

      ship.positionInMap[ship.bow] = Ship.bowVertical;
      ship.positionInMap[ship.aft] = Ship.aftVertical;
      this.filVerticalSpace(map, ship);
    }
  }

  fillHorizontalSpace(map, ship) {
    let start = ship.aft.charCodeAt(0) + 1;
    let end = ship.bow.charCodeAt(0);

    for (start; start < end; start++) {
      let number = ship.bow[1];
      if (ship.bow.length === 3) number = 10;

      let coordinateValue = String.fromCharCode(start) + number;

      map.grid1[coordinateValue] = Ship.shipBodyHorizontal;
      ship.positionInMap[coordinateValue] = Ship.shipBodyHorizontal
    }
  }

  filVerticalSpace(map, ship) {
    let start = Number(ship.bow[1]) + 1;
    let end = ship.aft[1];
    if (ship.aft.length === 3) {
      end = 10;
    }

    for (start; start < end; start++) {
      let coordinateValue = ship.bow[0] + String(start);
      map.grid1[coordinateValue] = Ship.shipBodyVertical;
      ship.positionInMap[coordinateValue] = Ship.shipBodyVertical;
    }
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  updateFleet(combatant, coordinate) {
    console.log(`coord: ${coordinate}`);
    Fleet.allShipNames.forEach(ship => {
      let shipPossition = Object.keys(combatant.fleet[ship].positionInMap);
      if (shipPossition.includes(coordinate)) {
        combatant.fleet[ship].positionInMap[coordinate] = Map.hitMarker;
        combatant.fleet[ship].health -= 1;
      }
      combatant.fleet[ship].isShipSunk();      
    });


  }
}

class ComputerFleet extends Fleet {
  constructor() {
    super();
  }

  setRandomShipCoordinates(map, ship) {
    do {
      ship.bow = this.getRandomBowCoordinate(map);
      ship.aft = this.getRandomAftCoordinate(map, ship);

      this.orientShip(ship);

    } while (this.isIntersectingShips(map, ship) || this.desiredLengthNotMet(ship) || this.isDiagonal(ship));
  }

  getRandomBowCoordinate(map) {
    let min = 0;
    let max = Object.keys(map.grid1).length + 1;
    let randomCoordinate = Object.keys(map.grid1)[this.getRandomNumber(min, max)];

    while (!this.grid1_hasEmptyCell(randomCoordinate, map)) {
      randomCoordinate = Object.keys(map.grid1)[this.getRandomNumber(min, max)];
    }
    return randomCoordinate;
  }

  getRandomAftCoordinate(map, ship) {
    let possableOptions = this.findPossibleOptions(map, ship);

    possableOptions = possableOptions.filter(coordinate => {
      return this.grid1_hasEmptyCell(coordinate, map);
    });

    let min = 0;
    let max = possableOptions.length;
    let randomIndex = this.getRandomNumber(min, max);

    return possableOptions[randomIndex];
  }

  findPossibleOptions(map, ship) {
    let options = [];
    const LEFT = "L";
    const RIGHT = "R";
    const UP = "U";
    const DOWN = "D";

    options.push(this.countVerticalSpaces(UP, ship));
    options.push(this.countHorizontalSpaces(RIGHT, ship));
    options.push(this.countVerticalSpaces(DOWN, ship));
    options.push(this.countHorizontalSpaces(LEFT, ship));
    options = options.filter(coordinate => coordinate !== null);
    return options;
  }

  countVerticalSpaces(direction, ship) {
    let start = Number(ship.bow[1]);
    if (ship.bow.length === 3) {
      start = 10;
    }

    let end = null;

    if (direction === "D") {
      if (start === 10) return null;

      end = start + ship.shipLength - 1;

      if (end > 10) return null;

      return ship.bow[0] + String(end);

    } else if (direction === "U") {
      end = start - (ship.shipLength - 1);

      if (end <= 0) return null;

      return ship.bow[0] + String(end);
    }
  }

  countHorizontalSpaces(direction, ship) {
    let start = ship.bow.charCodeAt(0);
    let end = null;

    if (direction === "L") {

      end = start - ship.shipLength + 1;
      end = String.fromCharCode(end);

      if (end >= "A") {
        if (ship.bow.length === 3) {
          return end + "10";
        } else {
          return end + String(ship.bow[1]);
        }
      } else {
        return null;
      }
    } else if (direction === "R") {
      end = start + ship.shipLength - 1;
      end = String.fromCharCode(end);

      if (end <= "J") {
        if (ship.bow.length === 3) {
          return end + "10";
        } else {
          return end + String(ship.bow[1]);
        }
      } else {
        return null;
      }
    }
  }

  getRandomCoordinateFrom(map) {
    let min = 0;
    let max = Object.keys(map.grid2).length + 1;
    let randomCoordinate = Object.keys(map.grid2)[this.getRandomNumber(min, max)];

    while (!this.grid2_HasEmptyCell(randomCoordinate, map)) {
      randomCoordinate = Object.keys(map.grid2)[this.getRandomNumber(min, max)];
    }

    return randomCoordinate;
  }
}

class Player {

  fireUpon(combatant) {
    // Humans fire on the computer
    let coordinate = readline.question("Admiral! Choose a coordinate to fire upon: ").toUpperCase(); // Needs validation

    let coordinateValue = combatant.map.grid1[coordinate];

    combatant.map.updateMap(coordinate, coordinateValue);

    combatant.fleet.updateFleet(combatant, coordinate);
    
    
  }




}

class Human extends Player {
  constructor() {
    super();
    this.map = new Map("human");
    this.fleet = new Fleet();
  }

  setFleetPosition() {
    Fleet.allShipNames.forEach(shipName => {
      let shipLength = this.fleet[shipName].shipLength;
      let ship = this.fleet[shipName];

      this.map.displayWarRoomMap(this.fleet);

      console.log(`The ${shipName} occupies ${shipLength} spaces`);

      this.fleet.setShipCoodinates(this.map, ship);

      this.fleet.placeShipInMap(ship, this.map);
    });

  }

}

class Computer extends Player {
  constructor() {
    super();
    this.map = new Map("computer");
    this.fleet = new ComputerFleet();
  }

  setFleepPosition() {
    Fleet.allShipNames.forEach(shipName => {
      let ship = this.fleet[shipName];

      this.fleet.setRandomShipCoordinates(this.map, ship);

      this.fleet.placeShipInMap(ship, this.map);
    });
    console.clear();
  }

  fireUpon(combatant) {
    console.log("Computer fires");

    let randomCoordinate = this.fleet.getRandomCoordinateFrom(combatant.map);
    let coordinateValue = combatant.map.grid1[randomCoordinate];

    combatant.map.updateMap(randomCoordinate, coordinateValue);
    
    combatant.fleet.updateFleet(combatant, randomCoordinate);
  }
}

class Map {
  static hitMarker = " X ";
  static missMarker = " M ";
  static emptyCell = "   ";
  static columnLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  static topRow = `|   | A | B | C | D | E | F | G | H | I | J |`;
  static midLine = "|---|---|---|---|---|---|---|---|---|---|---|";
  static line = "-".repeat(this.midLine.length);

  constructor(mapOwner) {
    this.mapOwner = mapOwner;
    this.grid1 = {}; // Holds the values of where the ships are
    this.grid2 = {}; // Holds the values of where the guesses were made.

    for (let row = 1; row <= 10; row++) {
      for (let column = 0; column < Map.columnLetters.length; column++) {
        let coordinate = Map.columnLetters[column] + String(row);
        this.grid1[coordinate] = Map.emptyCell;
        this.grid2[coordinate] = Map.emptyCell;
      }
    }
  }

  updateMap(coordinate, coordinateValue) {    
    let marker = null;

    if (this.isHit(coordinateValue)) {
      marker = Map.hitMarker;
    } else if (this.isMiss(coordinateValue)) {
      marker = Map.missMarker;
    }

    this.grid1[coordinate] = marker;
    this.grid2[coordinate] = marker;
  }

  isMiss(value) {
    return value === Map.emptyCell;
  }

  isHit(value) {
    return Ship.shipComponents.includes(value.trim()[0]);
  }

  display(concealMap = true, fleet) {
    let cell = this.grid2;
    if (concealMap === false) {
      cell = this.grid1;
    }

    this.displayMapHeading();

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
    this.displayMapFooting(fleet);
    console.log("\n");
  }

  displayMapFooting(fleet) {
    if (this.mapOwner === "computer") {
      console.log(`Enemy Ships: ${fleet.getAliveShips().join(", ")}`);
    } else if (this.mapOwner === "human") {
      console.log(`Your Ships: ${fleet.getAliveShips().join(", ")}`);
    }
  }

  displayMapHeading() {
    if (this.mapOwner === "human") {
      console.log("Your Fleet Map".padStart(29, " "));
    } else if (this.mapOwner === "computer") {
      console.log("Enemy Fleet Map".padStart(29, " "));
    }
  }

  displayWarRoomMap(fleet) {
    let concealMap = false;
    console.clear();
    console.log("Welcome to the war room Admiral.");
    console.log(`- This is your fleet map. You have 5 ships of varying sizes to distribute throughout the map.\n- Coordinates are entered letter first followed by the number. Ex: A5\n- Ships can either be placed horizontally or vertically. No diagonal placements.\n`);

    this.display(concealMap, fleet);
  }

  displayMapInCombat(fleet) {
    let concealMap = false;

    this.display(concealMap, fleet);
  }
}

class BattleShipGame {
  constructor() {
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    // INTRO_ASCII.display(); 
    this.human.setFleetPosition();
    this.computer.setFleepPosition();

    while (!this.human.fleet.isFleetDestroyed() && !this.computer.fleet.isFleetDestroyed()) {
      this.computer.map.display(false, this.computer.fleet);
      this.human.map.displayMapInCombat(this.human.fleet);

      this.human.fireUpon(this.computer);
      this.computer.fireUpon(this.human);

      console.clear();
      console.log(`human Fleet Destroyed: ${this.human.fleet.isFleetDestroyed()}`);
      console.log(`computer Fleet Destroyed: ${this.computer.fleet.isFleetDestroyed()}`);
      



    }
    console.clear();

    this.computer.map.display(false, this.computer.fleet);
    this.human.map.displayMapInCombat(this.human.fleet);





  }
}

let battleship = new BattleShipGame();
battleship.play();





