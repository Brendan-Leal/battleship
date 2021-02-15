const Fleet = require("./fleet-class");
const readline = require("readline-sync"); // delete

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

    while (!map.grid1_CoordinateIsEmpty(randomCoordinate)) {
      randomCoordinate = Object.keys(map.grid1)[this.getRandomNumber(min, max)];
    }
    return randomCoordinate;
  }

  getRandomAftCoordinate(map, ship) { 
    let possableOptions = this.findPossibleOptions(map, ship);

    possableOptions = possableOptions.filter(coordinate => {
      return map.grid1_CoordinateIsEmpty(coordinate);
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
    let max = Object.keys(map.grid2).length;
    let randomIndex = this.getRandomNumber(min, max);
    let randomCoordinate = Object.keys(map.grid2)[randomIndex];

    while (!map.grid2_CoordinateIsEmpty(randomCoordinate)) {
      randomIndex = this.getRandomNumber(min, max);
      randomCoordinate = Object.keys(map.grid2)[randomIndex];
    }

    return randomCoordinate;
  }

  updateFleet(combatant) {
    // combatant is the computer object
    // the value of this is the computer FLEET



    
    readline.question("Hold") // delete
  }
}


module.exports = ComputerFleet;