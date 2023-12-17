import { gameBoard } from "./gameboard/gameboard";
import { randomSelect, diffInPercentage } from "./app_helper";

export function player() {
  let board;

  function attack(opponent, square) {
    opponent.board().receive_attack(square.coordX, square.coordY);
  }

  function autoAttack(opponent) {
    const attack_hints = opponent.board().collectHints();
    const active_squares = opponent.board().getSquares('void', false);
    const revealed_squares = opponent.board().getSquares('status', 'revealed');
    const num_difference = diffInPercentage(revealed_squares.length, active_squares.length);

    const square = (() => {
      if (num_difference > 10) {
        return randomSelect(attack_hints);
      } else {
        return randomSelect(active_squares);
      }
    })();

    opponent.board().receive_attack(square.coordX, square.coordY);
  }

  (() => {
    board = gameBoard()
  })();

  return {
    board: () => board,
    attack,
    autoAttack,
  }
}
