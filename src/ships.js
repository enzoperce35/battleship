import * as helper from "./app_helper";
import { traverser } from "./gameboard/traverser";

export class Ship {
  constructor(length, index) {
    this.id = `ship${index + 1}`;
    this.shipLength = length;
    this.orientation = helper.randomSelect(['vertical', 'horizontal']);
    this.hits = 0;
  }

  addHit() {
    this.hits += 1
  }

  isSunk() {
    return this.shipLength == this.hits
  }

  positionHints(board) {
    let hints = [];

    let shipPosition = board.getSquares('occupant', this.id).filter(sqr => sqr.status == 'hit');

    for(let sqr of shipPosition) {
      let adjacents = sqr.adjacentSquares(board.getSquares())

      if (this.hits > 1) {
        if(this.orientation == 'vertical') {
          hints.push(adjacents.slice(2,4))
        } else {
          hints.push(adjacents.slice(0,2))
        }
      } else {
        hints.push(adjacents.splice(0,4))
      }
    }

    return hints.flat().filter(hint =>
                                        (hint != undefined && !hint.void) &&
                                        !shipPosition.includes(hint)
                                     );
  }

  findPosition(vacant_squares) {
    const self = this

    let randomSqr = helper.randomSelect(vacant_squares);
    let traversal = traverser(vacant_squares, randomSqr, this.orientation, this.shipLength);
    let ascending = traversal.ascend();
    let descending = traversal.descend();

    if (!ascending.includes(undefined)) return ascending;
    if (!descending.includes(undefined)) return descending;

    return self.findPosition(vacant_squares)
  }
}
