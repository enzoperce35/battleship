import { gameBoard } from '../src/gameboard/gameboard';
import * as helper from '../src/app_helper';

let board;

beforeEach(() => {
  board = gameBoard();
});

describe('getSquares', () => {
  test('return an array of 100 square objects', () => {
    expect(board.getSquares()).toHaveLength(100);
    expect(board.getSquares()).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.stringMatching(/[A-J][1-10]/),
        status: expect.stringMatching('vacant'),
      }),
    ]));
  });
});

describe('getShips', () => {
  let ships;

  beforeEach(() => {
    ships = board.getShips();
  });

  test('return 10 ships', () => {
    expect(ships).toHaveLength(10);
  });

  test('return ship Ids', () => {
    expect(ships.map((ship) => ship.id)).toStrictEqual(['ship1', 'ship2', 'ship3', 'ship4', 'ship5', 'ship6', 'ship7', 'ship8', 'ship9', 'ship10']);
  });

  test('return ship lengths', () => {
    expect(ships.map((ship) => ship.shipLength)).toStrictEqual([4, 3, 3, 2, 2, 2, 1, 1, 1, 1]);
  });
});

describe('positionShips', () => {
  beforeEach(() => {
    board.positionShips();
  });

  test('return 20 occupied squares', () => {
    expect(board.getSquares('status', 'occupied')).toHaveLength(20);
  });

  test('return vacant squares', () => {
    expect(board.getSquares('status', 'vacant')).toEqual(expect.arrayContaining([
      expect.objectContaining({
        status: 'vacant',
      }),
    ]));
  });

  test('return reserved squares', () => {
    expect(board.getSquares('status', 'reserved')).toEqual(expect.arrayContaining([
      expect.objectContaining({
        status: 'reserved',
      }),
    ]));
  });
});

describe('collectHints', () => {
  const positionHints = [['F4', 'F5', 'F6', 'F7'], ['B4', 'B5', 'B6'], ['H2']];
  const spies = [];

  beforeEach(() => {
    // select three ships
    const ships = board.getShips().filter((_, i) => i === 0 || i === 1 || i === 9);

    // spy filter function to return them
    jest.spyOn(board.getShips(), 'filter').mockReturnValue(ships);

    // spy on each three ships to return one set of hint
    ships.forEach((ship, i) => {
      const spy = jest.spyOn(ship, 'positionHints').mockReturnValue(positionHints[i]);

      spies.push(spy);
    });
  });

  it('calls positionHints for each ship', () => {
    board.collectHints();

    spies.forEach((spy) => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('return the position hints', () => {
    expect(board.collectHints()).toEqual(positionHints.flat());
  });
});

describe('receive attack', () => {
  function targetSquare(status) {
    const squares = board.getSquares('status', status);

    return helper.randomSelect(squares);
  }

  beforeEach(() => {
    board.positionShips();
  });

  test('must void and modify square status from vacant to missed', () => {
    const vacantSquare = targetSquare('vacant');

    board.receiveAttack(vacantSquare.coordX, vacantSquare.coordY);

    expect(vacantSquare.status).toBe('missed');
  });

  test('must void and modify square status from occupied to hit', () => {
    const occupiedSquare = targetSquare('occupied');

    board.receiveAttack(occupiedSquare.coordX, occupiedSquare.coordY);

    expect(occupiedSquare.status).toBe('hit');
  });
});

describe('allShipsSunk', () => {
  beforeEach(() => {
    board.positionShips();
  });

  test('return false', () => {
    expect(board.allShipsSunk()).toBeFalsy();
  });

  test('return true', () => {
    // make all ships' hits to equal it's length
    board.getShips().map((ship) => ship.hits = ship.shipLength);

    expect(board.allShipsSunk()).toBeTruthy();
  });
});
