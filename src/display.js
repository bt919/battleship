import { Gameboard } from "./game.js";

const displayPlayerBoard = (element, game) => {
  /* player board should show:
    sea with a plain square,
    ship with a colored border, and same colored background,
    ship hits with a red border/bg color and an X on the square,
    missed hits with a different bg color and a dot in the middle.
  */
  const board = game.getBoard();
  const grid = document.createElement("div");
  grid.classList.add("board");
  grid.classList.add("playerBoard");

  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      const rank = `${i * 10 + j}`;
      const squareValue = board[i][j];
      const square = document.createElement("div");
      square.classList.add(rank);
      if (squareValue === 0) square.classList.add("sea");
      else if (squareValue === 1) {
        square.classList.add("shipHit");
        square.textContent = "X";
      } else if (squareValue === 2) {
        square.classList.add("missedHit");
        const circle = document.createElement("div");
        circle.classList.add("circle");
        square.appendChild(circle);
      } else square.classList.add("ship");

      grid.appendChild(square);
    }
  }

  element.appendChild(grid);
};

const displayEnemyBoard = (element, game) => {
  /* player board should show:
    sea with a plain square,
    ship hits with a red border/bg color and an X on the square,
    missed hits with a different bg color and a dot in the middle.
  */
};

export { displayPlayerBoard, displayEnemyBoard };
