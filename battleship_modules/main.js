const readline = require("readline-sync");
const Human = require("./human-class");
const Computer = require("./computer-class");

const INTRO_ASCII = {
  l1: `______       _   _   _      _____ _     _       `,
  l2: `| ___ \\     | | | | | |    /  ___| |   (_)      `,
  l3: `| |_/ / __ _| |_| |_| | ___\\ \`--.| |__  _ _ __  `,
  l4: `| ___ \\/ _\` | __| __| |/ _ \\\`--. \\ '_ \\| | '_ \\ `,
  l5: `| |_/ / (_| | |_| |_| |  __/\\__/ / | | | | |_) |`,
  l6: `\\____/ \\__,_|\\__|\\__|_|\\___\\____/|_| |_|_| .__/ `,
  l7: `                                         | |    `,
  l8: `                                         |_|`,

  display() {
    for (const line in this) {
      while (line.startsWith("l")) {
        console.log(this[line]);
        break;
      }
    }
    readline.question("\n\nPress enter to begin");
  }
};


class BattleShipGame {
  constructor() {
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    console.clear;
    let concealMap = true;
    // INTRO_ASCII.display(); 
    this.human.setPositionOfFleet();
    this.computer.setPositionOfFleet();

    while (!this.human.fleet.isFleetDestroyed() && !this.computer.fleet.isFleetDestroyed()) {

      this.computer.map.display(false, this.computer.fleet); // change to concealMap when playing a real game
      this.human.map.displayMapInCombat(this.human.fleet);

      this.human.fireUpon(this.computer);
      // this.computer.fireUpon(this.human);

      this.human.displayResult(this.computer);

      console.clear();
    }
    console.clear();

    this.computer.map.display(false, this.computer.fleet);
    this.human.map.displayMapInCombat(this.human.fleet);


    this.determinWinner();
  }

  determinWinner() {
    if (this.human.fleet.isFleetDestroyed()) {
      console.log("\nAdmiral our fleet has been whiped out. We lost");
    } else if (this.computer.fleet.isFleetDestroyed()) {
      console.log("\nCongratulations Admiral, that was a well fought battle. The enemy fleet has been destroyed.");
    }
  }
}

console.clear();
let battleship = new BattleShipGame();
battleship.play();