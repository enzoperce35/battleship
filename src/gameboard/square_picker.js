import { diffInPercentage, randomSelect } from "../app_helper";

export function SquarePicker(board) {
  let active = board.getSquares('void', false).filter(act => act.status != 'revealed');
  let revealed = board.getSquares('status', 'revealed');

  function revealedSquarePercentage() {
    return diffInPercentage(revealed.length, active.length);
  }

  function auto(ai) {
    let hints = board.collectHints();
    let revealed_hints = revealed.filter(rev => hints.includes(rev));

    if (revealedSquarePercentage() > ai && hints.length > 0) {
      return randomSelect(hints);
    } else {
      return randomSelect(active.concat(revealed_hints));
    }
  }

  function manual() {
    const squares = document.getElementsByClassName('p2-squares active');

    return new Promise(function(resolve) {
      for(let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', (e) => {
          const square = board.getSquares().find(sqr => sqr.id == e.target.id);

          resolve(square);
        })
      }
    })
  }

  return {
    auto,
    manual,
  }
}
