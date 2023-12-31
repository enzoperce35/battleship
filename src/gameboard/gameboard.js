import { Square } from "./squares";
import { Ship } from "../ships";
import { findSquare } from "../app_helper";

export function gameBoard() {
  let boardSquares;
  let boardShips;

  (function generateSquares() {
    let arr = [];

    for(let x = 0; x < 10; x++) {

      for(let y = 0; y < 10; y++) {

        arr.push(new Square(x, y))
      }
    }

    boardSquares = arr
  })();

  (function generateShips() {
    let newShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

    newShips.forEach((ship, i) => {

      newShips[i] = new Ship(ship, i);
    })

    boardShips = newShips
  })();

  function positionShips() {
    boardShips.forEach((ship) => {
      const vacant_squares = boardSquares.filter(sqr => sqr.status == 'vacant');
      const ship_positions = ship.findPosition(vacant_squares);

      // this is to be implemented later using pubsub
      for (let square of ship_positions) {
        const adjSquares = square.adjacentSquares(vacant_squares);

        square.occupy(ship)

        for (let square of adjSquares) {
          if (square.isVacant()) square.reserve();
        }
      }
    })
  };

  function receive_attack(x, y) {
    let square = findSquare(boardSquares, x, y),
      occupant = boardShips.find(ship => ship.id == square['occupant']);

    const adjSquares = square.adjacentSquares(boardSquares);

    if (square.isVacant() || square.isRevealed()) {
      square.missed();
    } else if (square.hasOccupant()) {
      square.hit()

      // this is to be implemented later using pubsub
      occupant.addHit();

      for(let adj of adjSquares) {
        adj.reveal();
      }
    }
  }

  function allShipsSunk() {
    const remainingShips = boardShips.filter(ship => !ship.isSunk());

    return remainingShips.length == 0;
  }

  return {
    getSquares: () => boardSquares,
    getShips: () => boardShips,
    positionShips,
    receive_attack,
    allShipsSunk,
  }
}
