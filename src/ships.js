export function createShip(length) {
  let hitCount = 0;

  return {
    shipLength: () => length,
    hits: () => hitCount,
    addHit: () => hitCount += 1,
    isSunk: () => length == hitCount
  }
}
