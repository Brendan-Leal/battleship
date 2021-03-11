const Fleet = require("../fleet-class");
const readline = require("readline-sync");

class HumanFleet extends Fleet {
  constructor() {
    super();
  }

  setShipCoodinates(map, ship) {
    do {
      ship.bow = readline.question("\nEnter the coordinate of where you want the bow to be: ").toUpperCase();

      while (!this.isValidInput(ship.bow, map) || !map.grid1_emptyCellAt(ship.bow)) {
        console.clear();

        map.display();
        console.log(`The ${ship.name} occupies ${ship.length} spaces`);
        console.log("\nAdmiral! We cannot place this ship there\n");

        ship.bow = readline.question("Enter the coordinate of where you want the bow to be: ").toUpperCase();
      }

      console.clear();
      map.display();

      console.log(`The ${ship.name} occupies ${ship.length} spaces`);

      console.log(`\nBow Selected: ${ship.bow}`);
      ship.aft = readline.question("Enter the coordinate of where you want the aft to be: ").toUpperCase();

      while (!this.isValidInput(ship.aft, map) || !map.grid1_emptyCellAt(ship.aft)) {
        console.clear();

        map.display();

        console.log(`The ${ship.name} occupies ${ship.length} spaces`);
        console.log("\nAdmiral! We cannot place this ship there");

        console.log(`\nBow Selected: ${ship.bow}`);
        ship.aft = readline.question("Enter the coordinate of where you want the aft to be: ").toUpperCase();
      }
      this.orientShip(ship);

    } while (this.isIntersectingShips(map, ship) || this.desiredLengthNotMet(ship, map) || this.isDiagonal(ship, map));
    console.clear();
  }
}

module.exports = HumanFleet;