import PubSub from "pubsub-js";
import { Game } from "../src/game";
import { Player } from "../src/player";
import { randomSelect } from "../src/app_helper";

let game;
let pubsub_spy;

beforeEach(() => {
  game = new Game(Player(true), Player());

  pubsub_spy = jest.spyOn(PubSub, 'publish');
})

describe('players', () => {
  test('return two players', () => {
    expect(game.players()).toEqual([game.player1, game.player2]);
  })
});

describe('switchTurn', () => {
  function attack(result) {
    let attacked_square = randomSelect(game.receiver.getBoard().getSquares());

    attacked_square.status = result;

    return attacked_square;
  }

  test('attacker must switch', () => {
    const attacker = game.attacker;
    const attacked_square = attack('missed')

    game.switchTurn(attacked_square);

    expect(game.attacker).not.toBe(attacker);
  })

  test('attacker must not switch', () => {
    const attacker = game.attacker;
    const attacked_square = attack('hit')

    game.switchTurn(attacked_square);

    expect(game.attacker).toBe(attacker);
  })
});

describe('takeTurn', () => {
  jest.useFakeTimers();

  test('call PubSub.publish new_turn', () => {
    game.takeTurn();

    expect(pubsub_spy).toHaveBeenCalledWith('new_turn', game);
  });

  test('call player.attack', () => {
    const receiver = game.receiver;

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
