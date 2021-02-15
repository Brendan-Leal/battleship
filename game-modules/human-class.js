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

  setPositionOfFleet() {
    this.fleet.forEach(ship => {
      this.map.displayWarRoomMap(this.fleet);

      console.log(`The ${ship.shipName} occupies ${ship.shipLength} spaces`);

      this.fleet.setShipCoodinates(this.map, ship);

      this.fleet.placeShipInMap(ship, this.map);
    });
  }

  fireUpon(computer) {
    // Humans fire on the computer
    let coordinate = readline.question("\nAdmiral! Choose a coordinate to fire upon: ").toUpperCase();

    while (!this.map.grid2_CoordinateIsEmpty(coordinate) || !this.fleet.isValidInput(coordinate, this.map)) {

      if (!this.fleet.isValidInput(coordinate, this.map)) {
        console.clear();
        this.map.displayMapInCombat(this.fleet);

        console.log("\nAdmiral! That's not a valid coordinate.");
      } else {
        console.clear();
        this.map.displayMapInCombat(this.fleet);

        console.log(`\nAdmiral, we already fired on ${coordinate}!`);
      }

      coordinate = readline.question(`Please choose a different coodinate: `).toUpperCase();
    }

    this.map.update(coordinate, computer);

    computer.fleet.updateFleet(computer);

    // computer.fleet.updateFleet(this, coordinate); // (this) is the human object

    this.lastCoordinateFiredOn = coordinate;
  }

  displayResult(computer) {
    if (computer.map.grid1[this.lastCoordinateFiredOn] === this.map.getHitMarker()) {
      console.log(`\n${this.lastCoordinateFiredOn} is a HIT!`);
    } else if (computer.map.grid1[this.lastCoordinateFiredOn] === this.map.getMissMarker()) {
      console.log(`\n${this.lastCoordinateFiredOn} Missed`);
    }

    computer.fleet.forEach(ship => {
      if (this.lastCoordinateFiredOn in ship.positionInMap && ship.isSunk) {
        console.log(`\nGood job we sunk their ${ship.shipName}`);
      }
    });

    readline.question("Press Enter to continue");
  }

  reportsHit(coordinate) {
    let coordinateValue = this.map.grid1[coordinate];
    return this.map.isHit(coordinateValue);
  }

  reportsSunk(coordinate) {
   this.fleet.forEach(ship => {
    let shipPossition = Object.keys(ship.positionInMap);
    console.log(shipPossition);

    console.log(shipPossition.includes(coordinate));
   });
  }
}

module.exports = Human;