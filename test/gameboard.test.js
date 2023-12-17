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
    expect(board.getSquares('status', 'occupied')).toHaveLength(20);
  })

  test('return vacant squares', () => {
    expect(board.getSquares('status', 'vacant')).toEqual(expect.arrayContaining([
      expect.objectContaining({
        status: 'vacant'
      })
    ]))
  })

  test('return reserved squares', () => {
    expect(board.getSquares('status', 'reserved')).toEqual(expect.arrayContaining([
      expect.objectContaining({
        status: 'reserved'
      })
    ]))
  })
})

describe('collectHints', () => {
  const board = gameBoard()
  board.positionShips();

  // 4 square ship
  const ship4 = board.getShips()[0];
  // 3 square ship
  const ship3 = board.getShips()[1];
  // 1 square ship
  const ship1 = board.getShips()[9];

  function attack(ship, num) {
    let square = board.getSquares('occupant', ship.id)[num-1];

    ship.hits += 1;
    square.status = 'hit';
  }

  test('board must have no hints', () => {
    expect(board.collectHints()).toHaveLength(0);
  })

  test('board must have 4 hints', () => {
    attack(ship4, 1);

    expect(board.collectHints()).toHaveLength(4)
  })

  test('board must have 2 hints', () => {
    attack(ship4, 2);

    expect(board.collectHints()).toHaveLength(2)
  })

  test('board must have 2 hints', () => {
    attack(ship1, 1);

    expect(board.collectHints()).toHaveLength(2)
  })

  test('board must have 6 hints', () => {
    attack(ship3, 1);

    expect(board.collectHints()).toHaveLength(6);
  })
})

describe('receive attack', () => {
  function targetSquare(status) {
    const squares = board.getSquares('status', status);

    return helper.randomSelect(squares);
  }

  beforeEach(() => {
    board.positionShips();
  })

  test('must void and modify square status from vacant to missed', () => {
    const vacant_square = targetSquare('vacant')

    board.receive_attack(vacant_square.coordX, vacant_square.coordY);

    expect(vacant_square.void).toBeTruthy();
    expect(vacant_square.status).toBe('missed')
  })

  test('must void and modify square status from occupied to hit', () => {
    const occupied_square = targetSquare('occupied');

    board.receive_attack(occupied_square.coordX, occupied_square.coordY);

    expect(occupied_square.void).toBeTruthy();
    expect(occupied_square.status).toBe('hit');
  })
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
