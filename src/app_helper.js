function getIds(arr) {
  return arr.map((obj) => obj.id);
}

function randomSelect(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function toAlpha(i) {
  return 'ABCDEFGHIJ'.split('')[i];
}

function findSquare(squares, coordX, coordY) {
  return squares.find((sqr) => sqr.coordX === coordX
    && sqr.coordY === coordY);
}

function diffInPercentage(numA, numB) {
  return (numA / numB) * 100;
}

function findShip(board, shipId) {
  return board.getShips().find((ship) => ship.id === shipId);
}

export {
  getIds,
  randomSelect,
  toAlpha,
  findSquare,
  findShip,
  diffInPercentage,
};
