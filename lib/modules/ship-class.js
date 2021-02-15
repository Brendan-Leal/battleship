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

  sinkShip(combatant) {
    if (this.health === 0) {
      this.isSunk = true;

      for (const coord in this.positionInMap) {
        combatant.map.grid1[coord] = Ship.sunkShip;
      }
    }
  }
}

module.exports = Ship;