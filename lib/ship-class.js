class Ship {
  // static shipComponents = "<>^v#" // copy was moved to map calss, Do i need to keep this here?
  static bowHorizontal = " > ";
  static aftHorizontal = " < ";
  static shipBodyHorizontal = "###";
  static bowVertical = " ^ ";
  static aftVertical = " v ";
  static shipBodyVertical = " # ";
  static sunkShip = " ~ ";

  constructor(shipName, shipLength, health) {
    this.shipName = shipName;
    this.shipLength = shipLength;
    this.health = health;
    this.positionInMap = {};
    this.isSunk = false;
    this.bow = null;
    this.aft = null;
  }

  sinkShip(combatant, ownMap) {
    for (const coordinate in this.positionInMap) {
      combatant.map.grid2[coordinate] = Ship.sunkShip;
      ownMap.grid1[coordinate] = Ship.sunkShip;
    }
  }

  reportSunk() {
    if(this.health === 0) {
      this.isSunk = true;
    }
    
    return this.isSunk;
  }
}

module.exports = Ship;