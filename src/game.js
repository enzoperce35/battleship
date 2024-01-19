import PubSub from "pubsub-js";

export class Game {
  constructor(p1, p2) {
    this.player1 = p1;
    this.player2 = p2;
    this.over = false;
    this.attacker = this.player1;
    this.receiver = this.player2;
  }

  players() {
    return [this.player1, this.player2];
  }

  switchTurn(last_attack) {
    let attacker = this.attacker;
    let receiver = this.receiver;

    if (last_attack.wasMissed()) {
      this.attacker = receiver;
      this.receiver = attacker;
    }
  };

  takeTurn() {
    // prepare game view
    PubSub.publish('new_turn', this);

    // make time-intervaled board attack
    setTimeout(() => {
      this.attacker.attack(this.receiver);
    }, 500);

    // check game status
    if (this.receiver.getBoard().allShipsSunk()) {
      this.over = true;

      PubSub.publish('game_over', this)
    }
  }

  async play() {
    const self = this;

    function turn() {
      return new Promise(function(resolve) {
        self.takeTurn();

        PubSub.subscribe('turn_done', (_, last_attack) => resolve(last_attack));
      }
    )}

    while(!this.over) {
      await turn().then(data => this.switchTurn(data));
    };
  };
}
