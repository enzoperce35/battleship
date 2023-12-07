import {toAlpha, findSquare} from "../app_helper";

export class Square {
  constructor(x, y) {
    this.coordX = x;
    this.coordY = y;
    this.status = 'vacant';
    this.id = (() => {
      const transX = () => toAlpha(x);
      const transY = () => y + 1;

      return transX() + transY();
    })();
  }

  occupy(ship) {
    this.status = 'occupied';
    this['occupant'] = ship.id;
  }

  reserve() {
    this.status = 'reserved';
  }

  reveal() {
    this.status = 'revealed';
  }

  hit() {
    this.status = 'hit';
  }

  missed() {
    this.status = 'missed';
  }

  hasOccupant() {
    return this.occupant != undefined
  }

  isVacant() {
    return this.status == 'vacant'
  }

  isRevealed() {
    return this.status == 'revealed'
  }

  adjacentSquares(squares) {
    const x = this.coordX;
    const y = this.coordY;
    const adjSquares = [
                         findSquare(squares, x-1, y),
                         findSquare(squares, x+1, y),
                         findSquare(squares, x, y-1),
                         findSquare(squares, x, y+1),
                         findSquare(squares, x-1, y-1),
                         findSquare(squares, x+1, y-1),
                         findSquare(squares, x-1, y+1),
                         findSquare(squares, x+1, y+1)
                       ];

    return adjSquares.filter(adj => adj !== undefined);
  }
}
