class Ship {
  static BOW_HORIZONTAL = " > ";
  static AFT_HORIZONTAL = " < ";
  static SHIP_BODY_HORIZONTAL = "###";
  static BOW_VERTICAL = " ^ ";
  static AFT_VERTICAL = " v ";
  static SHIP_BODY_VERTICAL = " # ";

  constructor(name, length, health) {
    this.name = name;
    this.length = length;
    this.health = health;
    this.positionInMap = {};
    this.isSunk = false;
    this.bow = null;
    this.aft = null;
  }

  // sinkShip(combatant, ownMap) {
  //   for (const coordinate in this.positionInMap) {
  //     combatant.map.grid2[coordinate] = Ship.sunkShip;
  //     ownMap.grid1[coordinate] = Ship.sunkShip;
  //   }
  // }

  // reportSunk() {
  //   if(this.health === 0) {
  //     this.isSunk = true;
  //   }
    
  //   return this.isSunk;
  // }
}

module.exports = Ship;