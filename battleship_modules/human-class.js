const Player = require("./player-class");
const Map = require("./map-class");
const Fleet = require("./fleet-class");
const readline = require("readline-sync");

class Human extends Player {
  constructor() {
    super();
    this.map = new Map("human");
    this.fleet = new Fleet();
  }

  setPositionOfFleet() { //Confirmed Working
    this.fleet.forEach(ship => {
      this.map.displayWarRoomMap(this.fleet);

      console.log(`The ${ship.shipName} occupies ${ship.shipLength} spaces`);

      this.fleet.setShipCoodinates(this.map, ship);

      this.fleet.placeShipInMap(ship, this.map);
    });
  }

  fireUpon(combatant) { // Confirmed Working
    // Humans fire on the computer, so computer object is the combatant
    let coordinate = readline.question("\nAdmiral! Choose a coordinate to fire upon: ").toUpperCase();

    while (!combatant.map.gridCellAtCoordinateIsEmpty(coordinate, combatant.map.grid2) ||
      !combatant.fleet.isValidInput(coordinate, combatant.map)) {
      console.clear();

      combatant.map.display(false, combatant.fleet) // Need to conceal map when playing a real game!
      this.map.displayMapInCombat(combatant.fleet);

      if (!combatant.fleet.isValidInput(coordinate, combatant.map)) {
        console.log("\nAdmiral! That's not a valid coordinat.");
      } else {
        console.log(`\nAdmiral, we already fired on ${coordinate}!`);
      }

      coordinate = readline.question(`Please choose a different coodinate: `).toUpperCase();
    }

    let coordinateValue = combatant.map.grid1[coordinate];

    combatant.map.updateMap(coordinate, coordinateValue);

    combatant.fleet.updateFleet(combatant, coordinate);

    this.lastCoordinateFiredOn = coordinate;
  }

  displayResult(combatant) { // Confirmed Working
    if (combatant.map.grid1[this.lastCoordinateFiredOn] === this.map.getHitMarker()) {
      console.log(`\n${this.lastCoordinateFiredOn} is a HIT!`);
    } else if (combatant.map.grid1[this.lastCoordinateFiredOn] === this.map.getMissMarker()) {
      console.log(`\n${this.lastCoordinateFiredOn} Missed`);
    }

    combatant.fleet.forEach(ship => {
      if (this.lastCoordinateFiredOn in ship.positionInMap && ship.isSunk) {
        console.log(`\nGood job we sunk their ${ship.shipName}`);
      }
    });

    readline.question("Press Enter to continue");
  }
}

module.exports = Human;