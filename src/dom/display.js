import { createEl } from './dom_helper';

export class Display {
  gameBoard(player, i) {
    const playerSquares = player.getBoard().getSquares();
    const board = createEl(`p${i}-board`, 'boards');

    function addColor(display, sqr) {
      const color = () => {
        if (sqr.wasHit()) {
          return 'red';
        }
        if (sqr.wasMissed()) {
          return 'none';
        }
        if (sqr.isRevealed()) {
          return 'orange';
        }

        return 'gray';
      };

      display.style.backgroundColor = color();
    }

    playerSquares.forEach((square) => {
      const displaySquare = createEl(square.id, `p${i}-squares squares`, 'span');

      if (!square.void) displaySquare.classList.add('active');

      addColor(displaySquare, square);

      board.appendChild(displaySquare);
    });

    return board;
  }

  gameResult(game) {
    const container = createEl('game-over');

    const gameOver = (() => {
      const el = createEl('GO-1', '', 'h1');
      el.innerHTML = 'Game Over';

      return el;
    })();

    const gameWinner = (() => {
      const el = createEl('GO-2', '', 'h1');

      el.innerHTML = (() => {
        const winner = game.attacker;

        return (winner.hasAI()) ? 'CPU won' : 'You won!';
      })();

      return el;
    })();

    container.append(gameOver, gameWinner);

    return container;
  }

  statusBoard() {
    const container = createEl('game-display');

    const gameTitle = () => {
      const gameTitle = createEl('game-title', '', 'h1');

      gameTitle.innerHTML = 'BattleShip';

      return gameTitle;
    };

    container.appendChild(gameTitle());

    return container;
  }
}
