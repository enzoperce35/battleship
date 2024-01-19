import { gameBoard } from "../src/gameboard/gameboard";
import { SquarePicker } from "../src/gameboard/square_picker";
import * as helper from "../src/app_helper";
import { createEl } from "../src/dom/dom_helper";

let board = gameBoard();
let square_c6 = board.getSquares()[25];
const pick = SquarePicker(board);

describe('auto', () => {
  const AI = 10;

  beforeEach(() => {
    square_c6.status = 'revealed';

    // make square c6 an attack hint
    jest.spyOn(board, 'collectHints').mockReturnValue([square_c6]);
  })

  test('pick square_c6 with very low percentage', () => {
    // make revealed squares more many
    jest.spyOn(helper, 'diffInPercentage').mockReturnValue(9);

    expect(pick.auto(AI)).not.toEqual(square_c6);
  })

  test('pick square_c6 assuredly', () => {
    // make revealed squares fewer
    jest.spyOn(helper, 'diffInPercentage').mockReturnValue(11);

    expect(pick.auto(AI)).toEqual(square_c6);
  })
})

describe('manual', () => {

  beforeAll(() => {
    board.getSquares().forEach(sqr => document.body.append(createEl(sqr.id,'p2-squares active', 'span')))
  })

  test('return the target square', () => {
    const selected_square = document.getElementById('E5');
    const target_square = board.getSquares().find(sqr => sqr.id == selected_square.id);
    const manual_pick = pick.manual();

    selected_square.click();

    expect(manual_pick).resolves.toEqual(target_square);
   })
})
