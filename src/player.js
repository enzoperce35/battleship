import { gameBoard } from './gameboard/gameboard';
import { SquarePicker } from './gameboard/square_picker';

export function Player(human = false) {
  const playerBoard = (() => gameBoard())();
  const intel = 5;

  function hasAI() {
    return !human;
  }

  async function attack(opponent) {
    const pick = SquarePicker(opponent.getBoard());

    const square = await (() => (hasAI() ? pick.auto(this.getIntel()) : pick.manual()))();

    opponent.getBoard().receiveAttack(square.coordX, square.coordY);
  }

  (() => playerBoard.positionShips())();

  return {
    getIntel: () => intel,
    getBoard: () => playerBoard,
    hasAI,
    attack,
  };
}
