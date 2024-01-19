import PubSub from 'pubsub-js';
import { Game } from '../src/game';
import { Player } from '../src/player';
import { randomSelect } from '../src/app_helper';

let game;
let pubsub_spy;

beforeEach(() => {
  game = new Game(Player(true), Player());

  pubsub_spy = jest.spyOn(PubSub, 'publish');
});

describe('players', () => {
  test('return two players', () => {
    expect(game.players()).toEqual([game.player1, game.player2]);
  });
});

describe('switchTurn', () => {
  function attack(result) {
    const attackedSquare = randomSelect(game.receiver.getBoard().getSquares());

    attackedSquare.status = result;

    return attackedSquare;
  }

  test('attacker must switch', () => {
    const { attacker } = game;
    const attackedSquare = attack('missed');

    game.switchTurn(attackedSquare);

    expect(game.attacker).not.toBe(attacker);
  });

  test('attacker must not switch', () => {
    const { attacker } = game;
    const attackedSquare = attack('hit');

    game.switchTurn(attackedSquare);

    expect(game.attacker).toBe(attacker);
  });
});

describe('takeTurn', () => {
  jest.useFakeTimers();

  test('call PubSub.publish new_turn', () => {
    game.takeTurn();

    expect(pubsub_spy).toHaveBeenCalledWith('new_turn', game);
  });

  test('call player.attack', () => {
    const { receiver } = game;

    const spy = jest.spyOn(game.attacker, 'attack');

    game.takeTurn();

    jest.runAllTimers();

    expect(spy).toHaveBeenCalledWith(receiver);
  });

  test('do not call game_over', () => {
    game.takeTurn();

    expect(game.over).toBeFalsy();
    expect(pubsub_spy).not.toHaveBeenCalledWith('game_over', game);
  });

  test('call game_over', () => {
    jest.spyOn(game.receiver.getBoard(), 'allShipsSunk').mockReturnValue(true);

    game.takeTurn();

    expect(game.over).toBeTruthy();
    expect(pubsub_spy).toHaveBeenCalledWith('game_over', game);
  });
});

describe('play', () => {
  it('should wait for a turn', () => {
    const spy = jest.spyOn(game, 'takeTurn');

    game.play();

    expect(spy).toBeCalled();
  });
});
