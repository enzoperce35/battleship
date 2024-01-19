import * as helper from './app_helper';
import { traverser } from './gameboard/traverser';

export class Ship {
  constructor(length, index) {
    this.id = `ship${index + 1}`;
    this.shipLength = length;
    this.orientation = helper.randomSelect(['vertical', 'horizontal']);
    this.hits = 0;
  }

  addHit() {
    this.hits += 1;
  }

  isSunk() {
    return this.shipLength === this.hits;
  }

  positionHints(board) {
    const hints = [];

    const shipPosition = board.getSquares('occupant', this.id).filter((sqr) => sqr.status === 'hit');

    shipPosition.forEach((position) => {
      const adjacents = position.adjacentSquares(board.getSquares());

      if (this.hits > 1) {
        if (this.orientation === 'vertical') {
          hints.push(adjacents.slice(2, 4));
        } else {
          hints.push(adjacents.slice(0, 2));
        }
      } else {
        hints.push(adjacents.splice(0, 4));
      }
    });

    return hints.flat().filter((hint) => (hint !== undefined && !hint.void)
                                        && !shipPosition.includes(hint));
  }

  findPosition(vacantSquares) {
    const self = this;

    const randomSqr = helper.randomSelect(vacantSquares);
    const traversal = traverser(vacantSquares, randomSqr, this.orientation, this.shipLength);
    const ascending = traversal.ascend();
    const descending = traversal.descend();

    if (!ascending.includes(undefined)) return ascending;
    if (!descending.includes(undefined)) return descending;

    return self.findPosition(vacantSquares);
  }
}
