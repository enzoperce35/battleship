import PubSub from 'pubsub-js';
import { toAlpha, findSquare } from '../app_helper';

export class Square {
  constructor(x, y) {
    this.coordX = x;
    this.coordY = y;
    this.status = 'vacant';
    this.void = false;
    this.id = (() => {
      const transX = () => toAlpha(x);
      const transY = () => y + 1;

      return transX() + transY();
    })();
  }

  static {
    PubSub.subscribe('turn_done', (_, data) => data.avoid());
  }

  occupy(ship) {
    this.status = 'occupied';
    this.occupant = ship.id;
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

  avoid() {
    this.void = true;
  }

  hasOccupant() {
    return this.occupant !== undefined;
  }

  isVacant() {
    return this.status === 'vacant';
  }

  isRevealed() {
    return this.status === 'revealed';
  }

  isReserved() {
    return this.status === 'reserved';
  }

  wasHit() {
    return this.status === 'hit';
  }

  wasMissed() {
    return this.status === 'missed';
  }

  adjacentSquares(squares) {
    const x = this.coordX;
    const y = this.coordY;

    return [
      findSquare(squares, x - 1, y),
      findSquare(squares, x + 1, y),
      findSquare(squares, x, y - 1),
      findSquare(squares, x, y + 1),
      findSquare(squares, x - 1, y - 1),
      findSquare(squares, x + 1, y - 1),
      findSquare(squares, x - 1, y + 1),
      findSquare(squares, x + 1, y + 1),
    ];
  }
}
