const Fleet = require("./fleet-class");

class ComputerFleet extends Fleet {
  constructor() {
    super();
  }

  setRandomShipCoordinates(map, ship) { //Confirmed Working
    do {
      ship.bow = this.getRandomBowCoordinate(map);
      ship.aft = this.getRandomAftCoordinate(map, ship);

      this.orientShip(ship);

    } while (this.isIntersectingShips(map, ship) || this.desiredLengthNotMet(ship) || this.isDiagonal(ship));
  }

  getRandomBowCoordinate(map) { //Confirmed Working
    let min = 0;
    let max = Object.keys(map.grid1).length + 1;
    let randomCoordinate = Object.keys(map.grid1)[this.getRandomNumber(min, max)];

    while (!map.gridCellAtCoordinateIsEmpty(randomCoordinate, map.grid1)) {
      randomCoordinate = Object.keys(map.grid1)[this.getRandomNumber(min, max)];
    }
    return randomCoordinate;
  }

  getRandomAftCoordinate(map, ship) { //Confirmed Working
    let possableOptions = this.findPossibleOptions(map, ship);

    possableOptions = possableOptions.filter(coordinate => {
      return map.gridCellAtCoordinateIsEmpty(coordinate, map.grid1);
    });

    let min = 0;
    let max = possableOptions.length;
    let randomIndex = this.getRandomNumber(min, max);

    return possableOptions[randomIndex];
  }

  findPossibleOptions(map, ship) { //Confirmed Working
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

  countVerticalSpaces(direction, ship) { //Confirmed Working
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

  countHorizontalSpaces(direction, ship) { //Confirmed Working
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

    while (!this.grid2_hasEmptyCell(randomCoordinate, map)) {
      randomCoordinate = Object.keys(map.grid2)[this.getRandomNumber(min, max)];
    }

    return randomCoordinate;
  }
}


module.exports = ComputerFleet;