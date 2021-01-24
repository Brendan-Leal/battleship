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
  }
};


class Fleet {
  static bowHorizontal = " > ";
  static aftHorizontal = " < ";
  static shipBodyHorizontal = "###";
  static bowVertical = " ^ ";
  static aftVertical = " v ";
  static shipBodyVertical = " # ";
  static shipNames = ["carrier", "battleShip", "cruiser", "submarine", "destroyer"];

  constructor() {
    this.carrier = 6;
    this.battleShip = 5;
    this.cruiser = 4;
    this.submarine = 3;
    this.destroyer = 3;
    this.bow = null;
    this.aft = null;
  }


  placeShipIn(map) {
    if (this.isHorizontal()) {
      if (this.bow[0] < this.aft[0]) { // Set the bow to alway be the right most coordinate
        let temp = this.bow;
        this.bow = this.aft;
        this.aft = temp;
      }

      map.grid[this.bow] = Fleet.bowHorizontal;
      map.grid[this.aft] = Fleet.aftHorizontal;
      this.fillHorizontalSpace(map);
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

      map.grid[this.bow] = Fleet.bowVertical;
      map.grid[this.aft] = Fleet.aftVertical;

      this.filVerticalSpace(map);
    }

  }

  filVerticalSpace(map) {
    let start = Number(this.bow[1]) + 1;
    let end = this.aft[1]
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

  setShipCoordinates(map) {
    this.bow = readline.question("Enter the coordinate of where you want the bow to be: ").toUpperCase();    
    // console.log(!this.isValidPlacement(this.bow, map));

    while (!this.isValidPlacement(this.bow, map) || !this.isValidInput(this.bow, map)) {
      console.log("\nINVALID PLACEMENT! Coordinates are entered letter first followed by the number. Ex: A5");
      this.bow = readline.question("Enter the coordinate of where you want the bow to be: ");      
    }

    this.aft = readline.question("Enter the coordinate of where you want the aft to be: ").toUpperCase();

    while (!this.isValidPlacement(this.aft, map) || !this.isValidInput(this.aft, map)) {
      console.log("\nINVALID PLACEMENT! Coordinates are entered letter first followed by the number. Ex: A5");
      this.aft = readline.question("Enter the coordinate of where you want the aft to be: ");      
    }

  }

  

  isValidPlacement(coordinate, map) {
    return map.grid[coordinate] === Map.empty;
  }

  isValidInput(coordinate, map) {
    return Object.keys(map.grid).includes(coordinate);
  }

}


class Map {
  static columnLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  static empty = "   ";
  constructor() {
    this.grid = {};

    for (let row = 1; row <= 10; row++) {
      for (let column = 0; column < Map.columnLetters.length; column++) {
        let coordinate = Map.columnLetters[column] + String(row);
        this.grid[coordinate] = Map.empty;
      }
    }

    this.line0 = `|   | A | B | C | D | E | F | G | H | I | J |`;
    this.horizontalLine = "|---|---|---|---|---|---|---|---|---|---|---|";
    this.line = "-".repeat(this.horizontalLine.length);
  }

  display() {
    this.displayHeading(this.constructor.name);
    console.log(this.line);
    console.log(this.line0);
    console.log(this.horizontalLine);
    console.log(`| 1 |${this.grid.A1}|${this.grid.B1}|${this.grid.C1}|${this.grid.D1}|${this.grid.E1}|${this.grid.F1}|${this.grid.G1}|${this.grid.H1}|${this.grid.I1}|${this.grid.J1}|`);

    console.log(this.horizontalLine);
    console.log(`| 2 |${this.grid.A2}|${this.grid.B2}|${this.grid.C2}|${this.grid.D2}|${this.grid.E2}|${this.grid.F2}|${this.grid.G2}|${this.grid.H2}|${this.grid.I2}|${this.grid.J2}|`);

    console.log(this.horizontalLine);
    console.log(`| 3 |${this.grid.A3}|${this.grid.B3}|${this.grid.C3}|${this.grid.D3}|${this.grid.E3}|${this.grid.F3}|${this.grid.G3}|${this.grid.H3}|${this.grid.I3}|${this.grid.J3}|`);

    console.log(this.horizontalLine);
    console.log(`| 4 |${this.grid.A4}|${this.grid.B4}|${this.grid.C4}|${this.grid.D4}|${this.grid.E4}|${this.grid.F4}|${this.grid.G4}|${this.grid.H4}|${this.grid.I4}|${this.grid.J4}|`);

    console.log(this.horizontalLine);
    console.log(`| 5 |${this.grid.A5}|${this.grid.B5}|${this.grid.C5}|${this.grid.D5}|${this.grid.E5}|${this.grid.F5}|${this.grid.G5}|${this.grid.H5}|${this.grid.I5}|${this.grid.J5}|`);

    console.log(this.horizontalLine);
    console.log(`| 6 |${this.grid.A6}|${this.grid.B6}|${this.grid.C6}|${this.grid.D6}|${this.grid.E6}|${this.grid.F6}|${this.grid.G6}|${this.grid.H6}|${this.grid.I6}|${this.grid.J6}|`);

    console.log(this.horizontalLine);
    console.log(`| 7 |${this.grid.A7}|${this.grid.B7}|${this.grid.C7}|${this.grid.D7}|${this.grid.E7}|${this.grid.F7}|${this.grid.G7}|${this.grid.H7}|${this.grid.I7}|${this.grid.J7}|`);

    console.log(this.horizontalLine);
    console.log(`| 8 |${this.grid.A8}|${this.grid.B8}|${this.grid.C8}|${this.grid.D8}|${this.grid.E8}|${this.grid.F8}|${this.grid.G8}|${this.grid.H8}|${this.grid.I8}|${this.grid.J8}|`);

    console.log(this.horizontalLine);
    console.log(`| 9 |${this.grid.A9}|${this.grid.B9}|${this.grid.C9}|${this.grid.D9}|${this.grid.E9}|${this.grid.F9}|${this.grid.G9}|${this.grid.H9}|${this.grid.I9}|${this.grid.J9}|`);

    console.log(this.horizontalLine);
    console.log(`|10 |${this.grid.A10}|${this.grid.B10}|${this.grid.C10}|${this.grid.D10}|${this.grid.E10}|${this.grid.F10}|${this.grid.G10}|${this.grid.H10}|${this.grid.I10}|${this.grid.J10}|`);

    console.log(this.line);
  }

  displayHeading(name) {
    if (name === "PlayersMap") {
      console.log("\n\nYour Fleet Map");
    } else {
      console.log("Enemy Fleet Map");
    }
  }
}
Object.assign(Map.prototype, Fleet);




class PlayersMap extends Map {
}


class EnemyMap extends Map {
}

class Player {
  constructor() {
    this.playersMap = new PlayersMap();
    this.enemyMap = new EnemyMap();
    this.fleet = new Fleet();
  }

  setFleetPosition() {
    let instructions = 
    Fleet.shipNames.forEach(ship => {
      // console.clear();
      console.log(`This is your fleet map. You have 5 ships of varying sizes to distribute throughout the map.\nCoordinates are entered letter first followed by the number. Ex: A5\nShips can either be placed horizontally or vertically. No diagonal placements.`);

      this.playersMap.display();

      console.log(`The ${ship} occupies ${this.fleet[ship]} spaces`);

      this.fleet.setShipCoordinates(this.playersMap);



      this.fleet.placeShipIn(this.playersMap);
    });
    this.playersMap.display();






  }


}


class BattleShipGame {
  constructor() {
    this.player = new Player();
    // this.computer = new Computer();
  }

  play() {
    this.player.setFleetPosition();

    // this.player.enemyMap.display();
    // this.player.playersMap.display();
  }
}

let battleShip = new BattleShipGame();
battleShip.play()




