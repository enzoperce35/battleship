import { Square } from './squares';
import { Ship } from '../ships';
import { findSquare } from '../app_helper';

export function gameBoard() {
  const boardSquares = (() => {
    const squares = [];

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        squares.push(new Square(x, y));
      }
    }

    return squares;
  })();

  const boardShips = (() => {
    const newShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

    newShips.forEach((ship, i) => {
      newShips[i] = new Ship(ship, i);
    });

    return newShips;
  })();

  function positionShips() {
    boardShips.forEach((ship) => {
      const vacantSquares = boardSquares.filter((sqr) => sqr.status === 'vacant');
      const shipPositions = ship.findPosition(vacantSquares);

      shipPositions.forEach((position) => {
        const adjSquares = position.adjacentSquares(vacantSquares)
          .filter((adj) => adj !== undefined);

        position.occupy(ship);

        adjSquares.forEach((square) => {
          if (square.isVacant()) square.reserve();
        });
      });
    });
  }

  function receiveAttack(x, y) {
    const targetSquare = findSquare(boardSquares, x, y);
    const targetShip = boardShips.find((ship) => ship.id === targetSquare.occupant);
    const adjSquares = targetSquare.adjacentSquares(boardSquares)
      .filter((adj) => adj !== undefined && !adj.void);

    if (targetSquare.hasOccupant()) {
      targetShip.addHit();

      targetSquare.hit();

      adjSquares.forEach((adj) => adj.reveal());
    } else {
      targetSquare.missed();
    }

    PubSub.publish('turn_done', targetSquare);
  }

  function allShipsSunk() {
    const remainingShips = boardShips.filter((ship) => !ship.isSunk());

    return remainingShips.length === 0;
  }

  function getSquares(key = null, value = null) {
    if (key == null || value == null) {
      return boardSquares;
    }
    return boardSquares.filter((sqr) => sqr[key] === value);
  }

  function collectHints() {
    const ships = boardShips.filter((ship) => ship.hits > 0 && !ship.isSunk());
    const hints = [];

    ships.forEach((ship) => {
      hints.push(ship.positionHints(this));
    });

    return hints.flat();
  }

  return {
    getShips: () => boardShips,
    collectHints,
    getSquares,
    positionShips,
    receiveAttack,
    allShipsSunk,
  };
}
