import { player } from "../src/player";
import * as helper from "../src/app_helper";

let player1;
let player2;

beforeEach(() => {
  player1 = player();
  player2 = player();
})

describe('player', () => {
  test('return a defined player gameboard', () => {
    expect(player1.board()).toBeDefined();
    expect(player2.board()).toBeDefined();
  })

  describe('attack', () => {
    test('call gameboard receive attack function', () => {
      const square_c6 = player2.board().getSquares()[25];

      const spy = jest.spyOn(player2.board(), 'receive_attack');

      player1.attack(player2, square_c6);

      expect(spy).toHaveBeenCalledWith(square_c6.coordX, square_c6.coordY);
    })
  })

  describe('auto attack', () => {
    let square_c6;

    test('attack square_c6 with very low percentage', () => {
      square_c6 = player2.board().getSquares()[25];
      square_c6.status = 'revealed';

      jest.spyOn(helper, 'diffInPercentage').mockReturnValue(9);

      player1.autoAttack(player2)

      expect(square_c6.void).toBeFalsy();
    })

    test('attack square_c6 assuredly', () => {
      square_c6 = player1.board().getSquares()[25];
      square_c6.status = 'revealed';

      jest.spyOn(helper, 'diffInPercentage').mockReturnValue(11);
      jest.spyOn(player1.board(), 'collectHints').mockReturnValue([square_c6]);

      player2.autoAttack(player1)

      expect(square_c6.void).toBeTruthy();
    })
  })
})
