import * as helper from "../app_helper";

export function traverser(vacantSquares, randomSqr, orientation, steps) {
  let travStep = 'ascending';

  function doTraversal(step, axis) {
    if (travStep == 'ascending') {
      return (axis == 'X') ? randomSqr.coordX + step : randomSqr.coordY + step
    } else {
      return (axis == 'X') ? randomSqr.coordX - step : randomSqr.coordY - step
    }
  }

  function traverse_Y(step) {
    const coordX = randomSqr.coordX;
    const coordY = doTraversal(step, 'Y');

    return helper.findSquare(vacantSquares, coordX, coordY);
  }

  function traverse_X(step) {
    const coordX = doTraversal(step, 'X');
    const coordY = randomSqr.coordY;

    return helper.findSquare(vacantSquares, coordX, coordY);
  }

  function traverse() {
    let traversals = [randomSqr]

    for(let step = 1; step < steps; step++) {
      if (orientation == 'horizontal') {
        traversals.push(traverse_X(step))
      } else {
        traversals.push(traverse_Y(step))
      }
    }

    return traversals
  }

  function ascend() {
    travStep = 'ascending'

    return traverse()
  }

  function descend() {
    travStep = 'descending'

    return traverse()
  }

  return { ascend, descend }
}
