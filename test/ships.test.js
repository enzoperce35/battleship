import { Ship } from "../src/ships";
import { gameBoard } from "../src/gameboard/gameboard";
import * as helper from "../src/app_helper";

let ship;

beforeEach(() => {
  ship = new Ship(3, 2)
})

describe('Ship', () => {
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

});

describe('addHit', () => {
  test('ship hits should turn 1', () => {
    ship.addHit();

    expect(ship.hits).toBe(1)
  })
})

describe('isSunk', () => {
  test('ship should sink', () => {
    for(let i = 0; i < 3; i++) {
      ship.addHit()
    }

    expect(ship.isSunk()).toBeTruthy()
  })
})

describe('getHints', () => {
  function attack(ship, square) {
    ship.hits += 1;
    square['occupant'] = ship.id;
    square.status = 'hit';
    square.void = true;
  }

  function positionShip(board, ship, square, orientation) {
    jest.spyOn(helper, 'randomSelect').mockReturnValue(square);

    ship.findPosition(board.getSquares())

    ship.orientation = orientation;
  }

  describe('vertical', () => {
    let newShip = new Ship(4, 0);
    const board = gameBoard();
    const E5 = board.getSquares()[44];
    const E8 = board.getSquares()[47];

    // position ship to square E5
    beforeAll(() => {
      positionShip(board, newShip, E5, 'vertical')
    })

    // make a first attack to square E5 where newship is positioned
    test('return 4 hints', () => {
      attack(newShip, E5)

      expect(helper.getIds(newShip.getHints(board))).toEqual(["D5", "F5", "E4", "E6"])
    })

    // make a second attack to square E8 where newship is positioned
    test('return 4 hints', () => {
      attack(newShip, E8)

      expect(helper.getIds(newShip.getHints(board))).toEqual(["E4", "E6", "E7", "E9"])
    })
  })

  describe('horizontal', () => {
    let newShip = new Ship(4, 0);
    const board = gameBoard();
    const E5 = board.getSquares()[44];
    const F5 = board.getSquares()[54];
    const G5 = board.getSquares()[64];

    // horizontally position ship to square E5
    beforeAll(() => {
      positionShip(board, newShip, E5, 'horizontal')
    })

    // make a first attack to square E5 where newship is positioned
    test('return 4 hints', () => {
      attack(newShip, E5)

      expect(helper.getIds(newShip.getHints(board))).toEqual(["D5", "F5", "E4", "E6"])
    })

    // make a second attack to square G5 where newship is positioned
    test('return 4 hints', () => {
      attack(newShip, F5)

      expect(helper.getIds(newShip.getHints(board))).toEqual(["D5", "G5"])
      //expect(board.getSquares('occupant', newShip.id).filter(sqr => sqr.status == 'hit')).toEqual('test')
    })
  })
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
