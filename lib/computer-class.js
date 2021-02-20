const Player = require("./player-class");
const Map = require("./map-class");
const ComputerFleet = require("./computer-fleet-class");
const ShipTracker = require("./ship-tracker-class");

const readline = require("readline-sync") // delete when done

class Computer extends Player {
  constructor() {
    super();
    this.map = new Map("computer");
    this.fleet = new ComputerFleet();
    this.shipTracker = new ShipTracker();
  }

  setPositionOfFleet() {
    this.fleet.forEach(ship => {

      this.fleet.setRandomShipCoordinates(this.map, ship);

      this.fleet.placeShipInMap(ship, this.map);
    });
    console.clear();
  }

  fireUpon(human) {
    let computerChosenCoord = null;

    if (this.shipTracker.isLockedOnShip() && !this.shipTracker.orientationKnown) {
      this.shipTracker.findSurroundingCoordinates(this.lastCoordinateFiredOn, this.map);
      computerChosenCoord = this.shipTracker.getRandomSurroundingCoordinate();

      if (human.reportsHit(computerChosenCoord)) {
        this.lastCoordinateFiredOn = computerChosenCoord;
        this.shipTracker.trackCoordinatesHit(this.lastCoordinateFiredOn);
        this.shipTracker.determineOrientation();
      }

    } else if (this.shipTracker.isLockedOnShip() && this.shipTracker.orientationKnown) {
      computerChosenCoord = this.shipTracker.findNextCoordinate(this.lastCoordinateFiredOn, this.map);

      if (human.reportsHit(computerChosenCoord)) {
        this.lastCoordinateFiredOn = computerChosenCoord;
        this.shipTracker.trackCoordinatesHit(this.lastCoordinateFiredOn);
      } else {
        this.shipTracker.toggleSearchDirection();
      }

    } else {
      computerChosenCoord = this.fleet.getRandomCoordinateFrom(human.map);

      this.shipTracker.initialHit = computerChosenCoord;
      this.shipTracker.isTargetLockAcquired(human, computerChosenCoord);
      this.lastCoordinateFiredOn = computerChosenCoord;
    }

    this.map.update(computerChosenCoord, human);

    human.updateFleet(computerChosenCoord, this);
  }


  reportsHit(coordinate) {
    let coordinateValue = this.map.grid1[coordinate];
    return this.map.isHit(coordinateValue);
  }

  updateFleet(coordinate, human) {
    console.log("Here updating computers fleet:\n");
    
    this.fleet.forEach(ship => {
      let shipPossition = Object.keys(ship.positionInMap);
      
      if (shipPossition.includes(coordinate)) {
        ship.health -= 1;

        if(ship.reportSunk()) {
          ship.sinkShip(human, this.map);
        }        
      }
    });
  }
}

module.exports = Computer;