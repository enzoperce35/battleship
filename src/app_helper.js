function getIds(arr) {
  return arr.map(obj => obj.id)
}

function randomSelect(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

function toAlpha(i) {
  return 'ABCDEFGHIJ'.split('')[i];
}

function findSquare(squares, coordX, coordY) {
  return squares.find((sqr) =>
    sqr.coordX == coordX &&
    sqr.coordY == coordY
  )
}

function findShip(board, shipId) {
  return board.getShips().find(ship => ship.id == shipId)
}

function findSquares(board, collectiveStatus) {
  return board.getSquares().filter((sqr) => sqr.status == collectiveStatus);
}

export {getIds, randomSelect, toAlpha, findSquare, findShip, findSquares}
