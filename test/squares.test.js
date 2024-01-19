import { getIds } from '../src/app_helper';
import { gameBoard } from '../src/gameboard/gameboard';
import { Square } from '../src/gameboard/squares';
import { Ship } from '../src/ships';

describe('square', () => {
  let squareA10;
  let ship1;

  beforeEach(() => {
    squareA10 = new Square(0, 9);
    ship1 = new Ship(4, 0);
  });

  test('return the right square object', () => {
    expect(squareA10).toEqual({
      coordX: 0, coordY: 9, id: 'A10', status: 'vacant', void: false,
    });
  });

  describe('occupy', () => {
    test('return the square with an occupied status and an added occupant key', () => {
      squareA10.occupy(ship1);

      expect(squareA10).toEqual({
        coordX: 0, coordY: 9, id: 'A10', occupant: 'ship1', status: 'occupied', void: false,
      });
    });
  });

  describe('reserve', () => {
    test('return the square with a reserved status', () => {
      squareA10.reserve();

      expect(squareA10.status).toEqual('reserved');
    });
  });

  describe('reveal', () => {
    test('return the square with a revealed status', () => {
      squareA10.reveal();

      expect(squareA10.status).toEqual('revealed');
    });
  });

  describe('hit', () => {
    test('return the square with a hit status', () => {
      squareA10.hit();

      expect(squareA10.status).toEqual('hit');
    });
  });

  describe('missed', () => {
    test('return the square with a missed status', () => {
      squareA10.missed();

      expect(squareA10.status).toEqual('missed');
    });
  });

  describe('avoid', () => {
    test('void the square', () => {
      squareA10.avoid();

      expect(squareA10.void).toBeTruthy();
    });
  });

  describe('hasOccupant', () => {
    test('return false', () => {
      expect(squareA10.hasOccupant()).toBeFalsy();
    });

    test('return true', () => {
      squareA10.occupy(ship1);

      expect(squareA10.hasOccupant()).toBeTruthy();
    });
  });

  describe('isVacant', () => {
    test('return true', () => {
      expect(squareA10.isVacant()).toBeTruthy();
    });

    test('return false', () => {
      squareA10.reserve();

      expect(squareA10.isVacant()).toBeFalsy();
    });
  });

  describe('isRevealed', () => {
    test('return false', () => {
      expect(squareA10.isRevealed()).toBeFalsy();
    });

    test('return true', () => {
      squareA10.reveal();

      expect(squareA10.isRevealed()).toBeTruthy();
    });
  });

  describe('isReserved', () => {
    test('return true', () => {
      squareA10.reserve();

      expect(squareA10.isReserved()).toBeTruthy();
    });
  });

  describe('wasHit', () => {
    test('return true', () => {
      squareA10.hit();

      expect(squareA10.wasHit()).toBeTruthy();
    });
  });

  describe('wasMissed', () => {
    test('return true', () => {
      squareA10.missed();

      expect(squareA10.wasMissed()).toBeTruthy();
    });
  });

  describe('adjacentSquares', () => {
    const squares = gameBoard().getSquares();
    const squareA1 = squares[0];
    const squareA2 = squares[1];
    const squarec3 = squares[22];

    function getAdjacent(square) {
      return square.adjacentSquares(squares).filter((adj) => adj !== undefined);
    }

    expect(getIds(getAdjacent(squareA1))).toEqual(['B1', 'A2', 'B2']);
    expect(getIds(getAdjacent(squareA2))).toEqual(['B2', 'A1', 'A3', 'B1', 'B3']);
    expect(getIds(getAdjacent(squarec3))).toEqual(['B3', 'D3', 'C2', 'C4', 'B2', 'D2', 'B4', 'D4']);
  });
});
