import { Display } from './display';
import { clear } from './dom_helper';

export class ViewUpdate {
  constructor(game) {
    this.game = game;
    this.main = document.getElementById('main');
    this.view = document.getElementById('game-display');
    this.display = new Display();
  }

  updateMain() {
    const [p1, p2] = this.game.players();

    clear(this.main);

    this.main.appendChild(this.display.gameBoard(p2, 2));
    this.main.appendChild(this.display.statusBoard());
    this.main.appendChild(this.display.gameBoard(p1, 1));
  }

  highlightReceiver() {
    const receiverBoard = (() => {
      if (this.game.receiver === this.game.player1) {
        return 'p1-board';
      }

      return 'p2-board';
    })();

    document.getElementById(receiverBoard).style.opacity = 1;
  }

  updateDisplay() {
    this.view.appendChild(this.display.gameResult(this.game));
  }
}
