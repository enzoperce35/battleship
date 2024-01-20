import { createEl } from '../../src/dom/dom_helper';
import { ViewUpdate } from '../../src/dom/view_updater';
import { Game } from '../../src/game';
import { Player } from '../../src/player';

document.body.append(
  createEl('main'),
  createEl('game-display'),
);

const game = new Game(Player(true), Player());
const update = new ViewUpdate(game);

describe('viewUpdate', () => {
  describe('updateMain', () => {
    test('update main three times', () => {
      const spy = jest.spyOn(update.main, 'appendChild');

      update.updateMain();

      expect(spy).toHaveBeenCalledTimes(3);
    });

    test('update player boards', () => {
      const spy = jest.spyOn(update.display, 'gameBoard');

      update.updateMain();

      expect(spy).toHaveBeenCalledWith(game.player1, 1);
      expect(spy).toHaveBeenCalledWith(game.player2, 2);
    });

    test('update status board', () => {
      const spy = jest.spyOn(update.display, 'statusBoard');

      update.updateMain();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('highlightReceiver', () => {
    document.body.append(createEl('p1-board'), createEl('p2-board'));

    it('highlights the receiver board', () => {
      update.highlightReceiver();

      const attackerBoard = document.getElementById('p1-board');
      const receiverBoard = document.getElementById('p2-board');

      expect(Number(attackerBoard.style.opacity)).not.toEqual(1);
      expect(Number(receiverBoard.style.opacity)).toEqual(1);
    });
  });

  describe('updateDisplay', () => {
    test('update view', () => {
      const spy = jest.spyOn(update.view, 'appendChild');

      update.updateDisplay();

      expect(spy).toHaveBeenCalled();
    });

    test('update game result', () => {
      const spy = jest.spyOn(update.display, 'gameResult');

      update.updateDisplay();

      expect(spy).toHaveBeenCalled();
    });
  });
});
