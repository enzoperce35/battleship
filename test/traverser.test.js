import { traverser } from '../src/gameboard/traverser';
import { gameBoard } from '../src/gameboard/gameboard';
import * as helper from '../src/app_helper';

describe('traverser', () => {
  let [board, vacantSquares, squareH8, squareC3] = [];

  beforeEach(() => {
    board = gameBoard();
    vacantSquares = board.getSquares('status', 'vacant');
    squareH8 = vacantSquares.find((sqr) => sqr.id === 'H8');
    squareC3 = vacantSquares.find((sqr) => sqr.id === 'C3');
  });

  // HORIZONTAL SHIP ORIENTATION //
  test('return an array of horizontally ascending squares', () => {
    const traversal3 = traverser(vacantSquares, squareC3, 'horizontal', 3);
    const traversal4 = traverser(vacantSquares, squareC3, 'horizontal', 4);

    expect(helper.getIds(traversal3.ascend())).toEqual(['C3', 'D3', 'E3']);
    expect(helper.getIds(traversal4.ascend())).toEqual(['C3', 'D3', 'E3', 'F3']);
  });

  test('return an array of horizontally descending squares', () => {
    const traversal1 = traverser(vacantSquares, squareC3, 'horizontal', 1);
    const traversal2 = traverser(vacantSquares, squareC3, 'horizontal', 2);

    expect(helper.getIds(traversal1.descend())).toEqual(['C3']);
    expect(helper.getIds(traversal2.descend())).toEqual(['C3', 'B3']);
  });

  test('return a descending array that contains undefined item', () => {
    // make a horizontal 4 step descending traversal starting with square C3 and passing square C1
    const edgeTraversal = traverser(vacantSquares, squareC3, 'horizontal', 4);

    // make square B3 unavailable
    vacantSquares.splice(12, 1);

    expect(edgeTraversal.descend()).toEqual([
      {
        coordX: 2, coordY: 2, id: 'C3', status: 'vacant', void: false,
      },
      undefined,
      {
        coordX: 0, coordY: 2, id: 'A3', status: 'vacant', void: false,
      },
      undefined,
    ]);
  });

  // VERTICAL SHIP ORIENTATION //
  test('return an array of vertically ascending squares', () => {
    const traversal1 = traverser(vacantSquares, squareH8, 'vertical', 1);
    const traversal2 = traverser(vacantSquares, squareH8, 'vertical', 2);

    expect(helper.getIds(traversal1.ascend())).toEqual(['H8']);
    expect(helper.getIds(traversal2.ascend())).toEqual(['H8', 'H9']);
  });

  test('return an array of vertically descending squares', () => {
    const traversal3 = traverser(vacantSquares, squareH8, 'vertical', 3);
    const traversal4 = traverser(vacantSquares, squareH8, 'vertical', 4);

    expect(helper.getIds(traversal3.descend())).toEqual(['H8', 'H7', 'H6']);
    expect(helper.getIds(traversal4.descend())).toEqual(['H8', 'H7', 'H6', 'H5']);
  });

  test('return an ascending array that contains undefined item', () => {
    // make a vertical 4 step ascending traversal starting with square H8 and passing square H10
    const edgeTraversal = traverser(vacantSquares, squareH8, 'vertical', 4);

    // make square H9 unavailable
    vacantSquares.splice(78, 1);

    expect(edgeTraversal.ascend()).toEqual([
      {
        coordX: 7, coordY: 7, id: 'H8', status: 'vacant', void: false,
      },
      undefined,
      {
        coordX: 7, coordY: 9, id: 'H10', status: 'vacant', void: false,
      },
      undefined,
    ]);
  });
});
