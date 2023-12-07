import { Ship } from "../src/ships";
import { gameBoard } from "../src/gameboard/gameboard";
import * as helper from "../src/app_helper";

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3, 2)
  })

  test('return ship id', () => {
    expect(ship.id).toBe('ship3')
  })

  test('return ship length', () => {
    expect(ship.shipLength).toEqual(3);
  });

  test('return vertical or horizontal for ship orientation', () => {
    expect(['vertical', 'horizontal']).toContain(ship.orientation)
  })

  test('return ship hits', () => {
    expect(ship.hits).toBe(0);
  })

  test('addHit', () => {
    ship.addHit();

    expect(ship.hits).toBe(1);
  })

  test('isSunk', () => {
    for(let i = 0; i < 3; i++) {
      ship.addHit()
    }

    expect(ship.isSunk()).toBeTruthy()
  })

  describe('findPosition', () => {
    const squares = gameBoard().getSquares();
    const squareH3 = {"coordX": 7, "coordY": 2, "id": "H3", "status": "vacant"};
    const squareC8 = {"coordX": 2, "coordY": 7, "id": "C8", "status": "vacant"};

    function testShip(length, shipOrientation) {
      let newShip = new Ship(length, 0);

      newShip.orientation = shipOrientation;

      return newShip
    }

    describe('horizontal ship', () => {

      // return square H3 for randomSelect call inside findPosition
      beforeAll(() => {
        jest.spyOn(helper, 'randomSelect').mockReturnValue(squareH3);
      })

      test('return an array of 1 horizontal square object', () => {
        ship = testShip(1, 'horizontal');

        expect(helper.getIds(ship.findPosition(squares))).toEqual(["H3"])
      })

      test('return an array of 2 ascending horizontal square object', () => {
        ship = testShip(2, 'horizontal');

        expect(helper.getIds(ship.findPosition(squares))).toEqual(["H3", "I3"])
      })

      test('return an array of 3 ascending horizontal square object', () => {
        ship = testShip(3, 'horizontal');

        expect(helper.getIds(ship.findPosition(squares))).toEqual(["H3", "I3", "J3"])
      })

      test('return an array of 4 descending horizontal square object', () => {
        ship = testShip(4, 'horizontal');

        expect(helper.getIds(ship.findPosition(squares))).toEqual(["H3", "G3", "F3", "E3"])
      })
    })

    describe('vertical ship', () => {

      // return square C8 for randomSelect call inside findPosition
      beforeAll(() => {
        jest.spyOn(helper, 'randomSelect').mockReturnValue(squareC8);
      })

      test('return an array of 1 vertical square object', () => {
        ship = testShip(1, 'vertical');

        expect(helper.getIds(ship.findPosition(squares))).toEqual(["C8"])
      })

      test('return an array of 2 ascending vertical square object', () => {
        ship = testShip(2, 'vertical');

        expect(helper.getIds(ship.findPosition(squares))).toEqual(["C8", "C9"])
      })

      test('return an array of 3 ascending vertical square object', () => {
        ship = testShip(3, 'vertical');

        expect(helper.getIds(ship.findPosition(squares))).toEqual(["C8", "C9", "C10"])
      })

      test('return an array of 4 descending vertical square object', () => {
        ship = testShip(4, 'vertical');

        expect(helper.getIds(ship.findPosition(squares))).toEqual(["C8", "C7", "C6", "C5"])
      })
    })
  })
});
