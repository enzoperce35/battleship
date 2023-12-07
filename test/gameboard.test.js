import { gameBoard } from "../src/gameboard/gameboard";
import * as helper from "../src/app_helper";

let board;

beforeEach(() => {
  board = gameBoard();
})

describe('getSquares', () => {
  test('return an array of 100 square objects', () => {
    expect(board.getSquares()).toHaveLength(100)
    expect(board.getSquares()).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.stringMatching(/[A-J][1-10]/),
        status: expect.stringMatching('vacant')
      })
    ]))
  })
})

describe('getShips', () => {
  let ships;

  beforeEach(() => {
    ships = board.getShips();
  })

  test('return 10 ships', () => {
    expect(ships).toHaveLength(10)
  })

  test('return ship Ids', () => {
    expect(ships.map(ship => ship.id)).toStrictEqual(['ship1', 'ship2', 'ship3', 'ship4', 'ship5', 'ship6', 'ship7', 'ship8', 'ship9', 'ship10'])
  })

  test('return ship lengths', () => {
    expect(ships.map(ship => ship.shipLength)).toStrictEqual([4, 3, 3, 2, 2, 2, 1, 1, 1, 1])
  })
})

describe('positionShips', () => {
  const board = gameBoard();
  board.positionShips();

  test('return 20 occupied squares', () => {
    expect(helper.findSquares(board, 'occupied')).toHaveLength(20);
  })

  test('return vacant squares', () => {
    expect(helper.findSquares(board, 'vacant')).toEqual(expect.arrayContaining([
      expect.objectContaining({
        status: 'vacant'
      })
    ]))
  })

  test('return reserved squares', () => {
    expect(helper.findSquares(board, 'reserved')).toEqual(expect.arrayContaining([
      expect.objectContaining({
        status: 'reserved'
      })
    ]))
  })
})

describe('receive attack', () => {
  function targetSquare(status) {
    const squares = helper.findSquares(board, status);

    return helper.randomSelect(squares);
  }

  test('must modify square status from vacant to missed', () => {
    const vacant_square = targetSquare('vacant')

    board.receive_attack(vacant_square.coordX, vacant_square.coordY);

    expect(vacant_square.status).toBe('missed')
  })

  test('must modify square status from occupied to hit', () => {
    board.positionShips();

    const occupied_square = targetSquare('occupied');
    const square_occupant = helper.findShip(board, occupied_square.occupant);

    board.receive_attack(occupied_square.coordX, occupied_square.coordY);

    expect(occupied_square.status).toBe('hit');
  })

  describe('allShipsSunk', () => {
    beforeEach(() => {
      board.positionShips();
    })

    test('return false', () => {
      expect(board.allShipsSunk()).toBeFalsy();
    })

    test('return true', () => {
      // make all ships' hits to equal it's length
      board.getShips().map(ship => ship.hits = ship.shipLength)

      expect(board.allShipsSunk()).toBeTruthy();
    })
  })
})
