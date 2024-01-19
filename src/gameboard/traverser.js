import * as helper from '../app_helper';

export function traverser(vacantSquares, randomSqr, orientation, steps) {
  let travStep = 'ascending';

  function doTraversal(step, axis) {
    if (travStep === 'ascending') {
      return (axis === 'X') ? randomSqr.coordX + step : randomSqr.coordY + step;
    }
    return (axis === 'X') ? randomSqr.coordX - step : randomSqr.coordY - step;
  }

  function traverseY(step) {
    const { coordX } = randomSqr;
    const coordY = doTraversal(step, 'Y');

    return helper.findSquare(vacantSquares, coordX, coordY);
  }

  function traverseX(step) {
    const coordX = doTraversal(step, 'X');
    const { coordY } = randomSqr;

    return helper.findSquare(vacantSquares, coordX, coordY);
  }

  function traverse() {
    const traversals = [randomSqr];

    for (let step = 1; step < steps; step++) {
      if (orientation === 'horizontal') {
        traversals.push(traverseX(step));
      } else {
        traversals.push(traverseY(step));
      }
    }

    return traversals;
  }

  function ascend() {
    travStep = 'ascending';

    return traverse();
  }

  function descend() {
    travStep = 'descending';

    return traverse();
  }

  return { ascend, descend };
}
