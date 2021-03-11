const Fleet = require("../fleet-class");

class ShipTracker {
  constructor() {
    this.lockedOn = false;
    this.shipsInPlay = new Fleet().allShips;
  }

  getCoordinate(map) {
    this.calculateProbabilityDensity(map);

    if (this.lockedOn) {

    } else {

    }

  }

  calculateProbabilityDensity(map) {
    this.shipsInPlay.forEach(ship => {
      if (!ship.isSunk) {
        let horizontalSetOfCoords = this.getHorizontalSetOfCoords(map.columnLetters, ship.length);
        let verticalSetOfCoords = this.getVeriticalSetOfCoords(map.columnLetters, ship.length);
        console.log(verticalSetOfCoords);
        horizontalSetOfCoords.forEach(possiblePosition => {
          if (this.allCoordinatesEmpty(possiblePosition, map)) {
            this.incrementProbability(possiblePosition, map);
          }
        });





      }
    });



    console.log("\nComputers grid2:");

    map.displayProbabilityDensity();

  }

  getHorizontalSetOfCoords(columnLetters, length) {
    let horizontalLetterGroup = this.getHorizontalLetterGroup(columnLetters, length);
    let horizontalCoordinates = [];

    for (let row = 1; row <= 10; row++) {
      for (let letterGroup = 0; letterGroup < horizontalLetterGroup.length; letterGroup++) {
        let subSetOfCoords = horizontalLetterGroup[letterGroup].map(letter => letter + String(row));
        horizontalCoordinates.push(subSetOfCoords);
      }
    }
    return horizontalCoordinates;
  }

  getHorizontalLetterGroup(columnLetters, length) {
    let startIndex = 0;
    let endIndex = length;
    let collection = [];

    while (endIndex <= columnLetters.length) {
      collection.push(columnLetters.slice(startIndex, endIndex));
      startIndex += 1;
      endIndex += 1;
    }
    return collection;
  }




  getVeriticalSetOfCoords(columnLetters, length) {
    let verticalCoordinates = [];
    let veritcalRowGroup = this.getVerticalRowGroup(length);
    
    for (let column = 0; column < columnLetters.length; column++) {
      let subSetOfCoords = [];
    
      for (let row = 0; row < veritcalRowGroup.length; row++) {
        let rowOfCoords = veritcalRowGroup[row].map(number => columnLetters[column] + String(number));
        subSetOfCoords.push(rowOfCoords);
      }

      verticalCoordinates = verticalCoordinates.concat(subSetOfCoords)
    }

    return verticalCoordinates;
  }

  getVerticalRowGroup(length) {
    let startNumber = 1;
    let endNumber = length;
    let collection = [];

    while (endNumber <= 10) {
      let temp = [];
      for(let number = startNumber; number <= endNumber; number++) {
        temp.push(number);
      }
      collection.push(temp);
      endNumber += 1;
      startNumber += 1;
    }
    return collection;
  }

  incrementProbability(possiblePosition, map) {
    possiblePosition.forEach(coord => {
      map.grid2[coord].probability += 1;
    });
  }

  allCoordinatesEmpty(setOfCoordinates, map) {
    return setOfCoordinates.every(coord => map.grid2_emptyCellAt(coord));
  }


  // else if (this.isVertical(ship)) {
  //   let start = Number(ship.bow[1]);
  //   let end = Number(ship.aft[1]);
  //   if (ship.aft.length === 3) {
  //     end = 10;
  //   }

  //   if ((end - start) + 1 !== ship.length) {
  //     console.clear();

  //     map.display();

  //     console.log(`The ${ship.name} occupies ${ship.length} spaces`);
  //     console.log("\nAdmiral! Make sure the the ships occupies the correct number of spaces");
  //   }
  //   return (end - start) + 1 !== ship.length;



  getCoordinatesListedHorizontally(map) {
    let horizontalCoordinates = [];

    for (let row = 1; row <= 10; row++) {
      for (let column = 0; column < map.columnLetters.length; column++) {
        let coordinate = map.columnLetters[column] + String(row);
        horizontalCoordinates.push(coordinate);
      }
    }
    return horizontalCoordinates;
  }

  getCoordinatesListerVertically(map) {
    let verticalCoordinates = [];

    for (let column = 0; column < map.columnLetters.length; column++) {
      for (let row = 1; row <= 10; row++) {
        let coordinate = map.columnLetters[column] + String(row);
        verticalCoordinates.push(coordinate);
      }
    }

    return verticalCoordinates;
  }
}

module.exports = ShipTracker;

// class ShipTracker extends ComputerFleet {
//   constructor() {
//     super();
//     this.lockedOn = false;
//     this.sunkShip = false;
//     this.surroundingCoordinates = [];
//     this.coordinatesHit = [];
//     this.isHorizontal = null;
//     this.isVertical = null;
//     this.orientationKnown = false;
//     this.initialHit = null;
//     this.nextCoordinate = null;

//     this.searchUp = true;
//     this.searchDown = false;
//     this.searchLeft = false;
//     this.searchRight = true;
//   }

//   isLockedOnShip() {
//     return this.lockedOn === true && this.sunkShip === false;
//   }

//   isTargetLockAcquired(combatant, coordinate) {
//     if (combatant.reportsHit(coordinate)) {
//       this.lockedOn = true;
//       this.trackCoordinatesHit(coordinate);
//     }
//   }

//   noTargetLock() {
//     this.lockedOn = false;
//   }

//   trackCoordinatesHit(coordinate) {
//     this.coordinatesHit.push(coordinate);
//   }

//   determineOrientation() {
//     this.orientationKnown = true;
//     if (this.isVerticalCoordinates()) {
//       this.isVertical = true;
//     } else {
//       this.isHorizontal = true;
//     }
//   }

//   getRandomSurroundingCoordinate() {
//     let min = 0;
//     let max = this.surroundingCoordinates.length;
//     let randomIndex = this.getRandomNumber(min, max);
//     return this.surroundingCoordinates[randomIndex];
//   }

//   findSurroundingCoordinates(previousCoordinate, map) {
//     this.surroundingCoordinates = [];
//     this.surroundingCoordinates.push(this.findCoordinateAbove(previousCoordinate));
//     this.surroundingCoordinates.push(this.findCoordinateRight(previousCoordinate));
//     this.surroundingCoordinates.push(this.findCoordinateBelow(previousCoordinate));
//     this.surroundingCoordinates.push(this.findCoordinateLeft(previousCoordinate));

//     this.surroundingCoordinates = this.surroundingCoordinates.filter(coord => {
//       return !map.isCellMarkedMiss(coord);
//     });

//     this.surroundingCoordinates = this.surroundingCoordinates.filter(coord => {
//       return coord !== null;
//     });
//   }

//   findCoordinateAbove(coordinate) {
//     if (coordinate.length === 3) {
//       return (coordinate[0] + "9");
//     } else {
//       let coordinateLetter = coordinate[0];
//       let newCoordinateNumber = (Number(coordinate[1]) - 1);

//       if (newCoordinateNumber >= 1) {
//         return coordinateLetter + String(newCoordinateNumber);
//       } else {
//         return null;
//       }
//     }
//   }

//   findCoordinateRight(coordinate) {
//     const LAST_COORD_LETTER = "J";

//     let nextCoordinateLetter = String.fromCharCode(coordinate.charCodeAt(0) + 1);
//     let coordinateNumber = coordinate[1];
//     if (coordinate.length === 3) {
//       coordinateNumber = "10";
//     }

//     if (nextCoordinateLetter <= LAST_COORD_LETTER) {
//       return nextCoordinateLetter + coordinateNumber;
//     } else {
//       return null;
//     }
//   }

//   findCoordinateBelow(coordinate) {
//     if (coordinate.length === 2) {
//       let coordinateLetter = coordinate[0];
//       let newCoordinateNumber = (Number(coordinate[1]) + 1);

//       return coordinateLetter + String(newCoordinateNumber);

//     } else {
//       return null
//     }
//   }

//   findCoordinateLeft(coordinate) {
//     const FIRST_COORD_LETTER = "A";

//     let nextCoordinateLetter = String.fromCharCode(coordinate.charCodeAt(0) - 1);
//     let coordinateNumber = coordinate[1];
//     if (coordinate.length === 3) {
//       coordinateNumber = "10";
//     }

//     if (nextCoordinateLetter >= FIRST_COORD_LETTER) {
//       return nextCoordinateLetter + coordinateNumber;
//     } else {
//       return null;
//     }
//   }

//   isVerticalCoordinates() {
//     let firstCoordLetter = this.coordinatesHit[0][0];
//     let secondCoordLetter = this.coordinatesHit[1][0];
//     return firstCoordLetter === secondCoordLetter;
//   }

//   findNextCoordinate(lastCoordFiredOn, map) {

//     if (this.isVertical) {
//       if (this.isInRow1(this.initialHit) || this.isInRow1(lastCoordFiredOn)) {
//         this.searchUp = false;
//         this.searchDown = true;
//       }

//       if (this.searchUp) {
//         this.setNextCoordinateAbove(lastCoordFiredOn, map);
//         if (this.nextCoordinate === null) {
//           this.setNextCoordinateBelow()
//         }
//         return this.nextCoordinate;

//       } else if (this.searchDown) {
//         this.setNextCoordinateBelow();

//         return this.nextCoordinate;
//       }
//     } else if (this.isHorizontal) {
//       if (this.searchRight) {
//         console.log("searching Right");





//         readline.question("Holding") // delete
//       } else if (this.searchLeft) {
//         console.log("searching left");





//         readline.question("Holding") // delete
//       }
//     }
//   }

//   setNextCoordinateAbove(lastCoordFiredOn, map) {
//     let potentialCoordinate;

//     if (this.isBelowInitialHit(lastCoordFiredOn)) {
//       potentialCoordinate = this.findCoordinateAbove(this.initialHit);
//     } else {
//       potentialCoordinate = this.findCoordinateAbove(lastCoordFiredOn);
//     }

//     if (potentialCoordinate !== null && map.grid2_CoordinateIsEmpty(potentialCoordinate)) {
//       this.nextCoordinate = potentialCoordinate;
//     } else {
//       this.searchUp = false;
//       this.searchDown = true;
//       this.nextCoordinate = null;
//     }
//   }

//   setNextCoordinateBelow() {
//     let lowestCoord = this.findLowestCoordinate();
//     this.nextCoordinate = this.findCoordinateBelow(lowestCoord);
//   }

//   findLowestCoordinate() {
//     if (this.isVertical) {
//       let columnLetter = this.coordinatesHit[0][0];
//       let coordinateNumbers = this.coordinatesHit.map(coord => Number(coord[1]));

//       coordinateNumbers.sort((a, b) => Number(a) - Number(b));

//       return columnLetter + String(coordinateNumbers.pop());
//     }
//   }

//   isBelowInitialHit(lastCoordFiredOn) {
//     let lastCoordRow = Number(lastCoordFiredOn[1]);
//     if (lastCoordFiredOn.length === 3) {
//       lastCoordRow = 10;
//     }

//     let initialHitRow = Number(this.initialHit[1]);
//     if (this.initialHit.length === 3) {
//       // The lastCoordFiredOn will never be below the 10th row
//       return false;
//     }
//     return lastCoordRow > initialHitRow;
//   }

//   toggleSearchDirection() {
//     if (this.isVertical) {
//       this.searchUp = false;
//       this.searchDown = true;
//     } else if (this.isHorizontal) {
//       this.searchLeft = true;
//       this.searchRight = false;
//     }
//   }

//   isInRow1(coordinate) {
//     return coordinate[1] === "1" && coordinate.length !== 3;
//   }
// }



