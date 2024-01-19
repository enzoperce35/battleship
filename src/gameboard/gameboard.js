import { Square } from "./squares";
import { Ship } from "../ships";
import { findSquare } from "../app_helper";

export function gameBoard() {

  let boardSquares = (() => {
    let squares = [];

    for(let x = 0; x < 10; x++) {
      for(let y = 0; y < 10; y++) {
        squares.push(new Square(x, y));
      }
    }

    return squares
  })();

  let boardShips = (() => {
    let newShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

    newShips.forEach((ship, i) => {
      newShips[i] = new Ship(ship, i);
    })

    return newShips
  })();

  function positionShips() {
    boardShips.forEach((ship) => {
      const vacant_squares = boardSquares.filter(sqr => sqr.status == 'vacant');
      const ship_positions = ship.findPosition(vacant_squares);

      for (let square of ship_positions) {
        const adjSquares = square.adjacentSquares(vacant_squares).filter(adj => adj != undefined);

        square.occupy(ship)

        for (let square of adjSquares) {
          if (square.isVacant()) square.reserve();
        }
      }
    })
  };

  function receive_attack(x, y) {
    const targetSquare = findSquare(boardSquares, x, y);
    const targetShip = boardShips.find(ship => ship.id == targetSquare['occupant']);
    const adjSquares = targetSquare.adjacentSquares(boardSquares).filter(adj => adj != undefined && !adj.void);

    if (targetSquare.hasOccupant()) {
      targetShip.addHit();

      targetSquare.hit();

      adjSquares.forEach(adj => adj.reveal())
    } else {
      targetSquare.missed();
    }

    PubSub.publish('turn_done', targetSquare);
  }

  function allShipsSunk() {
    const remainingShips = boardShips.filter(ship => !ship.isSunk());

    return remainingShips.length == 0;
  }

  function getSquares(key = null, value = null) {
    if (key == null || value == null) {
      return boardSquares
    } else {
      return boardSquares.filter(sqr => sqr[key] == value)
    }
  }

  function collectHints() {
    const ships = boardShips.filter(ship => ship.hits > 0 && !ship.isSunk());
    let hints = [];

    for(let ship of ships) {
      hints.push(ship.positionHints(this));
    }

    return hints.flat()
  }

  return {
    getShips: () => boardShips,
    collectHints,
    getSquares,
    positionShips,
    receive_attack,
    allShipsSunk,
  }
}
