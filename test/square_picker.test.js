import { gameBoard } from '../src/gameboard/gameboard';
import { SquarePicker } from '../src/gameboard/square_picker';
import * as helper from '../src/app_helper';
import { createEl } from '../src/dom/dom_helper';

const board = gameBoard();
const squareC6 = board.getSquares()[25];
const pick = SquarePicker(board);

describe('auto', () => {
  const AI = 10;

  beforeEach(() => {
    squareC6.status = 'revealed';

    // make square c6 an attack hint
    jest.spyOn(board, 'collectHints').mockReturnValue([squareC6]);
  });

  test('pick squareC6 with very low percentage', () => {
    // make revealed squares more many
    jest.spyOn(helper, 'diffInPercentage').mockReturnValue(9);

    expect(pick.auto(AI)).not.toEqual(squareC6);
  });

  test('pick squareC6 assuredly', () => {
    // make revealed squares fewer
    jest.spyOn(helper, 'diffInPercentage').mockReturnValue(11);

    expect(pick.auto(AI)).toEqual(squareC6);
  });
});

describe('manual', () => {
  beforeAll(() => {
    board.getSquares().forEach((sqr) => document.body.append(createEl(sqr.id, 'p2-squares active', 'span')));
  });

  test('return the target square', () => {
    const selectedSquare = document.getElementById('E5');
    const targetSquare = board.getSquares().find((sqr) => sqr.id == selectedSquare.id);
    const manualPick = pick.manual();

    selectedSquare.click();

    expect(manualPick).resolves.toEqual(targetSquare);
  });
});
