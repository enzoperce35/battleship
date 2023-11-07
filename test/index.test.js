import { createShip } from "../src/ships";

describe('ships', () => {
  const ship = createShip(4);

  test('return the ship length', () => {
    expect(ship.shipLength()).toEqual(4);
  });

  describe('ship must sink with four hits', () => {
    for(let i = 0; i < 4; i++) {
      ship.addHit()
    }

    test('applied hits should be 4', () => {
      expect(ship.hits()).toBe(4);
    })

    test('ship should sink', () => {
      expect(ship.isSunk()).toBeTruthy()
    })
  });
});
