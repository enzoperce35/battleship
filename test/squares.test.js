import { getIds } from "../src/app_helper";
import { gameBoard } from "../src/gameboard/gameboard";
import { Square } from "../src/gameboard/squares";
import { Ship } from "../src/ships";

describe('square', () => {
  let square;
  let ship;

  beforeEach(() => {
    square = new Square(0, 9);
    ship = new Ship(4, 0);
  })

  test('return the right square object', () => {
    expect(square).toEqual({"coordX": 0, "coordY": 9, "id": "A10", "status": "vacant"});
  })

  describe('occupy', () => {
    test('return the square with an occupied status and an added occupant key', () => {
      square.occupy(ship)

      expect(square).toEqual({"coordX": 0, "coordY": 9, "id": "A10", "occupant": "ship1", "status": "occupied"})
    })
  })

  describe('reserve', () => {
    test('return the square with a reserved status', () => {
      square.reserve()

      expect(square).toEqual({"coordX": 0, "coordY": 9, "id": "A10", "status": "reserved"})
    })
  })

  describe('reveal', () => {
    test('return the square with a revealed status', () => {
      square.reveal()

      expect(square).toEqual({"coordX": 0, "coordY": 9, "id": "A10", "status": "revealed"})
    })
  })

  describe('hit', () => {
    test('return the square with a hit status', () => {
      square.hit()

      expect(square).toEqual({"coordX": 0, "coordY": 9, "id": "A10", "status": "hit"})
    })
  })

  describe('missed', () => {
    test('return the square with a missed status', () => {
      square.missed()

      expect(square).toEqual({"coordX": 0, "coordY": 9, "id": "A10", "status": "missed"})
    })
  })

  describe('hasOccupant', () => {
    test('return false', () => {
      expect(square.hasOccupant()).toBeFalsy();
    })

    test('return true', () => {
      square.occupy(ship)

      expect(square.hasOccupant()).toBeTruthy();
    })
  })

  describe('isVacant', () => {
    test('return true', () => {
      expect(square.isVacant()).toBeTruthy();
    })

    test('return false', () => {
      square.reserve()

      expect(square.isVacant()).toBeFalsy();
    })
  })

  describe('isRevealed', () => {
    test('return false', () => {
      expect(square.isRevealed()).toBeFalsy();
    })

    test('return true', () => {
      square.reveal()

      expect(square.isRevealed()).toBeTruthy();
    })
  })

  describe('adjacentSquares', () => {
    const squares = gameBoard().getSquares();
    const squareA1 = squares[0];
    const squareA2 = squares[1]
    const squarec3 = squares[22];

    expect(getIds(squareA1.adjacentSquares(squares))).toEqual(['B1', 'A2', 'B2'])
    expect(getIds(squareA2.adjacentSquares(squares))).toEqual(['B2', 'A1', 'A3', 'B1', 'B3'])
    expect(getIds(squarec3.adjacentSquares(squares))).toEqual(['B3', 'D3', 'C2', 'C4', 'B2', 'D2', 'B4', 'D4'])
  })
})
