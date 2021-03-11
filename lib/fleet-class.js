const readline = require("readline-sync");
const Ship = require("./ship-class");

class Fleet {
  constructor() {
    this.allShips = [
      new Ship("carrier", 6, 6),
      // new Ship("battleship", 5, 5),
      // new Ship("cruiser", 4, 4),
      // new Ship("submarine", 3, 3),
      // new Ship("destroyer", 3, 3)
    ];
  }

  forEach(callback) {
    this.allShips.forEach(ship => callback(ship));
  }

  isValidInput(coordinate, map) {
    return Object.keys(map.grid1).includes(coordinate);
  }

  isIntersectingShips(map, ship) {
    if (this.isHorizontal(ship)) {
      let start = ship.aft.charCodeAt(0) + 1;
      let end = ship.bow.charCodeAt(0);

      for (start; start < end; start++) {
        let number = ship.bow[1];

        if (ship.bow.length === 3) number = 10;

        let newCoordinate = String.fromCharCode(start) + number;

        if (!map.grid1_emptyCellAt(newCoordinate)) {
          console.clear();

          map.display();
          console.log(`The ${ship.name} occupies ${ship.length} spaces`);
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
        let newCoordinate = ship.bow[0] + String(start);

        if (!map.grid1_emptyCellAt(newCoordinate)) {
          console.clear();

          map.display();

          console.log(`The ${ship.name} occupies ${ship.length} spaces`);
          console.log("\nAdmiral! We don't want our fleet to collide. Use better judgment or be removed from command.");
          return true;
        }
      }
      return false;
    }
  }

  desiredLengthNotMet(ship, map) {
    if (this.isHorizontal(ship)) {
      let start = ship.aft.charCodeAt(0);
      let end = ship.bow.charCodeAt(0);

      if ((end - start) + 1 !== ship.length) {
        console.clear();

        map.display();

        console.log(`The ${ship.name} occupies ${ship.length} spaces`);
        console.log("\nAdmiral! Make sure the the ships occupies the correct number of spaces");
      }

      return (end - start) + 1 !== ship.length;

    } else if (this.isVertical(ship)) {
      let start = Number(ship.bow[1]);
      let end = Number(ship.aft[1]);
      if (ship.aft.length === 3) {
        end = 10;
      }

      if ((end - start) + 1 !== ship.length) {
        console.clear();

        map.display();

        console.log(`The ${ship.name} occupies ${ship.length} spaces`);
        console.log("\nAdmiral! Make sure the the ships occupies the correct number of spaces");
      }
      return (end - start) + 1 !== ship.length;
    }
  }

  isDiagonal(ship, map) {
    if (!this.isHorizontal(ship) && !this.isVertical(ship)) {
      console.clear();

      map.display();

      console.log(`The ${ship.name} occupies ${ship.length} spaces`);
      console.log("\nAdmiral, Please follow the rules of engagement!");
    }
    return !this.isHorizontal(ship) && !this.isVertical(ship);
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

  placeShipInMap(ship, map) {
    if (this.isHorizontal(ship)) {
      map.grid1[ship.bow].displayValue = Ship.BOW_HORIZONTAL;
      map.grid1[ship.aft].displayValue = Ship.AFT_HORIZONTAL;

      ship.positionInMap[ship.bow] = Ship.BOW_HORIZONTAL;
      ship.positionInMap[ship.aft] = Ship.AFT_HORIZONTAL;

      this.fillHorizontalSpace(map, ship);
    } else if (this.isVertical(ship)) {
      map.grid1[ship.bow].displayValue = Ship.BOW_VERTICAL;
      map.grid1[ship.aft].displayValue = Ship.AFT_VERTICAL;

      ship.positionInMap[ship.bow] = Ship.BOW_VERTICAL;
      ship.positionInMap[ship.aft] = Ship.AFT_VERTICAL;
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

      map.grid1[coordinateValue].displayValue = Ship.SHIP_BODY_HORIZONTAL;
      ship.positionInMap[coordinateValue] = Ship.SHIP_BODY_HORIZONTAL
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
      map.grid1[coordinateValue].displayValue = Ship.SHIP_BODY_VERTICAL;
      ship.positionInMap[coordinateValue] = Ship.SHIP_BODY_VERTICAL;
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
}


module.exports = Fleet;


// class Fleet {




//   isFleetDestroyed() {
//     return this.allShips.every(ship => {
//       return ship.isSunk;
//     });
//   }



//   getAliveShips() {
//     let aliveShips = [];

//     this.forEach(ship => {
//       if (ship.health > 0) {
//         aliveShips.push(ship.shipName);
//       }
//     });

//     return aliveShips;
//   }









//   






//   updateFleet(combatant, coordinate) {




//   }


// }

