import { Player } from "../src/player";
import { SquarePicker } from "../src/gameboard/square_picker";
import { randomSelect } from "../src/app_helper";

let player1;
let player2;

jest.mock("../src/gameboard/square_picker")

beforeEach(() => {
  player1 = Player(true);
  player2 = Player();
});

describe('getBoard', () => {
  test('return player board', () => {
    expect(player1.getBoard()).toBeDefined();
    expect(player2.getBoard()).toBeDefined();
  })
})

describe('hasAI', () => {
  test('returns true if player has AI', () => {
    expect(player1.hasAI()).toBeFalsy();
    expect(player2.hasAI()).toBeTruthy();
  })
})

describe('getIntel', () => {
  test('return 5', () => {
    expect(player2.getIntel()).toEqual(5);
  })
})

describe('attack', () => {
  let mockedActualModule;

  beforeEach(() => {
    // create a mocked version of the square_picker module
    mockedActualModule = jest.requireActual("../src/gameboard/square_picker")
  })

  function getSpy(pick) {
    // get the mocked version of squarePicker
    const picker = mockedActualModule.SquarePicker(player1.getBoard());

    // use it as the replacement for the original/unmocked SquarePicker of attack function
    SquarePicker.mockImplementation(() => picker)

    // spy on it and one of it's return functions
    return jest.spyOn(picker, pick)
  }

  test('make a manual attack', () => {
    const spy = getSpy('manual').mockReturnValue(randomSelect(player2.getBoard().getSquares()));

    player1.attack(player2);

    expect(spy).toHaveBeenCalled();
  })

  test('make an auto attack', () => {
    const spy = getSpy('auto');

    player2.attack(player1);

    expect(spy).toHaveBeenCalled();
  })
})
