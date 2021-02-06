const ComputerFleet = require("./computer-fleet-class");

class ShipTracker extends ComputerFleet {
  constructor() {
    super();
    this.orientationKnown = false;
    this.isHorizontal = null;
    this.isVertical = null;
    this.missedCoordinates = [];
    this.hitCoordinates = [];
    this.usedOptions = [];
    this.options = [];
  }

  // getRandomOption() {
  //   let min = 0;
  //   let max = this.options.length - 1;

  //   let option = this.options[this.getRandomNumber(min, max)];

  //   let index = this.options.indexOf(option);
  //   this.options.splice(index, 1);
  //   console.log(this.options);

  //   return option;    
  // }

  // determinOrientation() {
  //   console.log("Hits:");
  //   console.log(this.hitCoordinates);

  // }

  setOptions(previousCoordinate, map) { // This aint working right
    this.options = [];
    let horizontalOptions = [this.getRight(previousCoordinate, map), this.getLeft(previousCoordinate, map)];
    let verticalOptions = [this.getAbove(previousCoordinate, map), this.getBelow(previousCoordinate, map)];

    horizontalOptions = horizontalOptions.filter(coordinate => coordinate !== null);
    verticalOptions = verticalOptions.filter(coordinate => coordinate !== null);

    this.options = this.options.concat(horizontalOptions, verticalOptions);
    this.options.filter(coord => !this.usedOptions.includes(coord));
  }

  getAbove(coordinate, map) {
    let coordNumber = Number(coordinate[1]) - 1;

    if (coordinate.length === 3) {
      coordNumber = "9";
      let newCoordinate = coordinate[0] + coordNumber;
      return this.grid2_hasEmptyCell(newCoordinate, map) ? newCoordinate : null;
    }

    if (coordNumber > 0 && coordNumber <= 10) {
      let newCoordinate = coordinate[0] + String(coordNumber);      
      return this.grid2_hasEmptyCell(newCoordinate, map) ? newCoordinate : null;
    }
  }

  getRight(coordinate, map) {
    let nextLetter = String.fromCharCode(coordinate.charCodeAt(0) + 1);
    let coordNumber = coordinate[1];
    if (coordinate.length === 3) {
      coordNumber = "10";
    }

    if (nextLetter > "J") {
      return null;
    } else {
      let newCoordinate = nextLetter + coordNumber;
      return this.grid2_hasEmptyCell(newCoordinate, map) ? newCoordinate : null;
    }
  }

  getBelow(coordinate, map) {
    let coordNumber = Number(coordinate[1]) + 1;

    if (coordinate.length === 3) {
      return null;
    }

    let newCoordinate = coordinate[0] + String(coordNumber);
    return this.grid2_hasEmptyCell(newCoordinate, map) ? newCoordinate : null;
  }

  getLeft(coordinate,map) {
    let nextLetter = String.fromCharCode(coordinate.charCodeAt(0) - 1);
    let coordNumber = coordinate[1];
    if (coordinate.length === 3) {
      coordNumber = "10";
    }

    if (nextLetter < "A") {
      return null;
    } else {
      let newCoordinate = nextLetter + coordNumber;
      return this.grid2_hasEmptyCell(newCoordinate, map) ? newCoordinate : null;
    }
  }
}

module.exports = ShipTracker;