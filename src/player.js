import { gameBoard } from "./gameboard/gameboard";
import { SquarePicker } from "./gameboard/square_picker";

export function Player(human = false) {
  let playerBoard = (() => gameBoard())();
  let intel = 5;

  function hasAI() {
    return !human;
  }

  async function attack(opponent) {
    let pick = SquarePicker(opponent.getBoard());

    let square = await (() => {
      return hasAI() ? pick.auto(this.getIntel()) : pick.manual();
    })();

    opponent.getBoard().receive_attack(square.coordX, square.coordY);
  }

  (() => playerBoard.positionShips())();

  return {
    getIntel: () => intel,
    getBoard: () => playerBoard,
    hasAI,
    attack,
  }
}
