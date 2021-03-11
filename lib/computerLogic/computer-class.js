const Player = require("../player-class");
const Map = require("../map-class");
const ComputerFleet = require("./computer-fleet-class");
const ShipTracker = require("./ship-tracker-class");

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

  fire() {
    let computerChosenCoord = this.shipTracker.getCoordinate(this.map);
    

    

    // this.map.update(computerChosenCoord, human);

    // human.updateFleet(computerChosenCoord, this);
  }
}

module.exports = Computer;

// class Computer extends Player {
//   constructor() {
//     super();
//     this.map = new Map("computer");
//     this.fleet = new ComputerFleet();
//     this.shipTracker = new ShipTracker();
//   }






//   reportsHit(coordinate) {
//     let coordinateValue = this.map.grid1[coordinate];
//     return this.map.isHit(coordinateValue);
//   }

//   updateFleet(coordinate, human) {
//     console.log("Here updating computers fleet:\n");

//     this.fleet.forEach(ship => {
//       let shipPossition = Object.keys(ship.positionInMap);

//       if (shipPossition.includes(coordinate)) {
//         ship.health -= 1;

//         if(ship.reportSunk()) {
//           ship.sinkShip(human, this.map);
//         }        
//       }
//     });
//   }
// }

