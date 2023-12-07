import * as helper from "../src/app_helper";
import { gameBoard } from "../src/gameboard/gameboard";

let board;

beforeEach(() => {
  board = gameBoard();
})

describe('getIds', () => {
  const arr = [{"obj1": 1, "id": "id1"},
               {"obj2": 2, "id": "id2"},
               {"obj3": 3, "id": "id3"}]

  test('return the ids from an array of objects', () => {
    expect(helper.getIds(arr)).toEqual(["id1", "id2", "id3"])
  })
})

describe('randomSelect', () => {
  const strArray = ['a', 'b', 'c'];
  const objArray = [{a: 'a'}, {b: 'b'}, {c: 'c'}];

  test('string array must contain the randomly selected string', () => {
    expect(strArray).toContainEqual(helper.randomSelect(strArray));
  })

  test('object array must contain the randomly selected object', () => {
    expect(objArray).toContainEqual(helper.randomSelect(objArray));
  })
})

describe('toAlpha', () => {
  test('return index as uppercase alphabet', () => {
    expect(helper.toAlpha(0)).toBe('A');
    expect(helper.toAlpha(10)).toBeUndefined;
  })
})

describe('findSquare', () => {
  test('return e10 square', () => {
    expect(helper.findSquare(board.getSquares(), 4, 4)).toEqual({"coordX": 4, "coordY": 4, "id": "E5", "status": "vacant"})
  })

  test('return undefined for a non-existing square', () => {
    expect(helper.findSquare(board.getSquares(), 10, 4)).toBeUndefined()
  })
})

describe('findShip', () => {
  test('return ship4', () => {
    const Ship4 = board.getShips()[3];

    expect(helper.findShip(board, Ship4.id)).toEqual(Ship4)
  })
})

describe('findSquares', () => {
 test('return 100 vacant squares', () => {
    expect(helper.findSquares(board, 'vacant')).toHaveLength(100)
  })

  test('return no square for invalid status', () => {
    expect(helper.findSquares(board, 'invalid_status')).toHaveLength(0)
  })
})
