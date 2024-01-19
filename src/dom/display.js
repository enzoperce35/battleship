import { createEl } from "./dom_helper";

export class Display {

  gameBoard(player, i) {
    let playerSquares = player.getBoard().getSquares();
    let board = createEl(`p${i}-board`, 'boards');

    function addColor(display, sqr) {
      let color = () => {
        if (sqr.wasHit()) {
          return 'red';
        }
        else if (sqr.wasMissed()) {
          return 'none';
        }
        else if (sqr.isRevealed()) {
          return 'orange';
        }
        else {
          return 'gray';
        };
      };

      display.style.backgroundColor = color();
    };

    for (let square of playerSquares) {
      let displaySquare = createEl(square.id, `p${i}-squares squares`, 'span');

      if (!square.void) displaySquare.classList.add('active');

      addColor(displaySquare, square);

      board.appendChild(displaySquare);
    }

    return board
  }

  gameResult(game) {
    let container = createEl('game-over');

    let game_over = (() => {
      const el = createEl('GO-1', '', 'h1');
      el.innerHTML = 'Game Over';

      return el;
    })();

    let game_winner = (() => {
      const el = createEl('GO-2', '', 'h1');

      el.innerHTML = (() => {
        const winner = game.attacker;

        return (winner.hasAI()) ? 'CPU won' : 'You won!';
      })();

      return el;
    })();

    container.append(game_over, game_winner);

    return container;
  }

  statusBoard() {
    let container = createEl('game-display');

    let game_title = () => {
      let gameTitle = createEl('game-title', '', 'h1');

      gameTitle.innerHTML = 'BattleShip';

      return gameTitle;
    };

    container.appendChild(game_title());

    return container;
  };
};
