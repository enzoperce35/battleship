import { diffInPercentage, randomSelect } from '../app_helper';

export function SquarePicker(board) {
  const active = board.getSquares('void', false).filter((act) => act.status != 'revealed');
  const revealed = board.getSquares('status', 'revealed');

  function revealedSquarePercentage() {
    return diffInPercentage(revealed.length, active.length);
  }

  function auto(ai) {
    const hints = board.collectHints();
    const revealedHints = revealed.filter((rev) => hints.includes(rev));

    if (revealedSquarePercentage() > ai && hints.length > 0) {
      return randomSelect(hints);
    }
    return randomSelect(active.concat(revealedHints));
  }

  function manual() {
    const squares = document.getElementsByClassName('p2-squares active');

    return new Promise((resolve) => {
      for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', (e) => {
          const square = board.getSquares().find((sqr) => sqr.id === e.target.id);

          resolve(square);
        });
      }
    });
  }

  return {
    auto,
    manual,
  };
}
