import { Display } from "../../src/dom/display";
import { Square } from "../../src/gameboard/squares";
import { Player } from "../../src/player";
import { Game } from "../../src/game";

describe('Display', () => {
  const display = new Display();

  describe('gameBoard', () => {
    const player = new Player();
    const board = player.getBoard();

    const unique_status_squares = (() => {
      let squares = ['vacant', 'hit', 'missed', 'revealed'];

      return squares.map(function (stat, i) {
        let sqr = new Square(0, i);

        sqr.status = stat;

        return sqr;
      });
    })();

    function squareColor(id) {
      return document.getElementById(id).style.backgroundColor;
    };

    test('return a multi-colored gameboard', () => {
      jest.spyOn(board, 'getSquares').mockReturnValue(unique_status_squares)

      const game_board = display.gameBoard(player, 2);
      document.body.append(game_board);

      expect(squareColor('A1')).toEqual('gray');
      expect(squareColor('A2')).toEqual('red');
      expect(squareColor('A3')).toEqual('');
      expect(squareColor('A4')).toEqual('orange');
    });
  });

  describe('gameResult', () => {
    let game = new Game(Player(true), Player());
    game.over = true;

    it('returns a game over message', () => {
      expect(display.gameResult(game).innerHTML).toContain('<h1 id="GO-1">Game Over</h1>');
    });

    it('returns win message for user', () => {
      game.attacker = game.player1;

      expect(display.gameResult(game).innerHTML).toContain('<h1 id="GO-2">You won!</h1>');
    });

    it('returns win message for cpu', () => {
      game.attacker = game.player2;

      expect(display.gameResult(game).innerHTML).toContain('<h1 id="GO-2">CPU won</h1>');
    });
  });

  describe('statusBoard', () => {
    test('return a container with the game title', () => {
      document.body.appendChild(display.statusBoard())

      expect(document.body.innerHTML).toContain('<div id="game-display"><h1 id="game-title">BattleShip</h1></div>');
    });
  });
});
