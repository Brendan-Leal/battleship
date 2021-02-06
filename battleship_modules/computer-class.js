const Player = require("./player-class");
const Map = require("./map-class");
const ComputerFleet = require("./computer-fleet-class");
const ShipTracker = require("./ship-tracker-class");

class Computer extends Player {
  constructor() {
    super();
    this.map = new Map("computer");
    this.fleet = new ComputerFleet();
    this.shipTracker = new ShipTracker();
  }

  setPositionOfFleet() { //Confirmed Working
    this.fleet.forEach(ship => {

      this.fleet.setRandomShipCoordinates(this.map, ship);

      this.fleet.placeShipInMap(ship, this.map);
    });
    console.clear();
  }

  fireUpon(combatant) {
    console.log(`lastCoordFiredOn: ${this.lastCoordinateFiredOn}`); // delete
    // console.log(`PreviousHit: ${this.isPreviousCoordinateHit(combatant)}`); // delete

    if (this.isPreviousCoordinateHit(combatant)) {
      console.log("IN HIT CONDITION!\n"); // delete
      this.shipTracker.setOptions(this.lastCoordinateFiredOn, this.map);

      if (!this.shipTracker.orientationKnown) {
        let coordinate = this.shipTracker.getRandomOption();
        this.shipTracker.usedOptions.push(coordinate);
        let coordinateValue = combatant.map.grid1[coordinate];
        
        if (this.map.isHit(coordinateValue)) {
          this.shipTracker.hitCoordinates.push(coordinate);
          this.shipTracker.determinOrientation();
          this.lastCoordinateFiredOn = coordinate;
        }


        combatant.map.updateMap(coordinate, coordinateValue);

        combatant.fleet.updateFleet(combatant, coordinate);
      }


    } else {
      let randomCoordinate = this.fleet.getRandomCoordinateFrom(combatant.map);
      this.lastCoordinateFiredOn = randomCoordinate;

      let coordinateValue = combatant.map.grid1[randomCoordinate];

      combatant.map.updateMap(randomCoordinate, coordinateValue);

      combatant.fleet.updateFleet(combatant, randomCoordinate);
    }

    readline.question("End fireupon func for computer") // delete
  }

  isPreviousCoordinateHit(combatant) {
    let isPreviousHit = false;
    Fleet.allShipNames.forEach(ship => {
      if (this.lastCoordinateFiredOn in combatant.fleet[ship].positionInMap) {
        isPreviousHit = true;
      }
    });
    return isPreviousHit;
  }

}

module.exports = Computer;