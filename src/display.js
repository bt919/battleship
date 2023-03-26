import { Gameboard, Ship, computerPlayer } from "./game.js";

const displayPlayerBoard = (element, game) => {
  element.innerHTML = "";
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
      const rank = `i${i * 10 + j}`;
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

const displayBlankEnemy = (element, game) => {
  element.innerHTML = "";
  /* player board should show:
    sea with a plain square,
    ship hits with a red border/bg color and an X on the square,
    missed hits with a different bg color and a dot in the middle,
    ships are also shown with sea cause its not visible to turn player
  */
  const board = game.getBoard();
  const grid = document.createElement("div");
  grid.classList.add("board");
  grid.classList.add("enemyBoard");

  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      const rank = `i${i * 10 + j}`;
      const squareValue = board[i][j];
      const square = document.createElement("div");
      square.classList.add(rank);
      if (squareValue === 1) {
        square.classList.add("shipHit");
        square.textContent = "X";
      } else if (squareValue === 2) {
        square.classList.add("missedHit");
        const circle = document.createElement("div");
        circle.classList.add("circle");
        square.appendChild(circle);
      } else square.classList.add("sea");

      grid.appendChild(square);
    }
  }

  element.appendChild(grid);
};

const displayInitialBoard = (element, game) => {
  element.innerHTML = "";
  /* display the given board, but allow the ship squares to be dragged and
    dropped */
  const board = game.getBoard();
  const grid = document.createElement("div");
  grid.classList.add("board");
  grid.classList.add("playerBoard");
  const ships = [];
  /** TODO - make all sea squares droppable and make all ships squares
   * draggable. When a ship square is dragged onto a sea square, they should switch
   * 'sea' and 'ship' class names, and in the board attribute, we should make the
   * necessary switch there also. We might even have to re-add appropriate event
   * listeners afterwards.
   */

  function swapPieces(shipXY, seaXY) {
    /* whenever a drop event happens, we need to swap the two pieces 
    on the game board */
    const temp = board[shipXY[0]][shipXY[1]];
    board[shipXY[0]][shipXY[1]] = board[seaXY[0]][seaXY[1]];
    board[seaXY[0]][seaXY[1]] = temp;
  }

  function dragstart(e) {
    e.dataTransfer.setData(
      "text/plain",
      `${e.target.id}|${e.target.classList[0]}|${e.target.textContent}`
    );
  }

  function dragover(e) {
    e.preventDefault();
  }

  function removeEventListeners(el) {
    const newElement = el.cloneNode(true);
    el.parentNode.replaceChild(newElement, el);
  }

  function drop(e) {
    const data = e.dataTransfer.getData("text/plain").split("|");
    const dragElement = document.querySelector(`#${data[0]}`);
    const dropElement = document.querySelector(`#${e.target.id}`);
    const temp = dropElement.classList[0];
    dropElement.className = "";
    dropElement.classList.add(`${data[1]}`);
    dropElement.textContent = `${data[2]}`;
    dragElement.textContent = "";
    dragElement.className = "";
    dragElement.classList.add(`${temp}`);
    removeEventListeners(dragElement);
    removeEventListeners(dropElement);
    const nextDrop = document.querySelector(`#${dragElement.id}`);
    const nextDrag = document.querySelector(`#${dropElement.id}`);
    nextDrop.setAttribute("draggable", false);
    nextDrag.setAttribute("draggable", true);
    nextDrop.addEventListener("drop", (ev) => drop(ev));
    nextDrop.addEventListener("dragover", (ev) => dragover(ev));
    nextDrag.addEventListener("dragstart", (ev) => dragstart(ev));

    let dragID = nextDrop.id;
    dragID = dragID.slice(1, dragID.length);
    dragID = parseInt(dragID, 10);
    let dropID = nextDrag.id;
    dropID = dropID.slice(1, dropID.length);
    dropID = parseInt(dropID, 10);
    const shipXY = [Math.floor(dragID / 10), dragID % 10];
    const seaXY = [Math.floor(dropID / 10), dropID % 10];
    swapPieces(shipXY, seaXY); // order of parameters passed doesnt matter
  }

  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      const rank = `i${i * 10 + j}`;
      const squareValue = board[i][j];
      const square = document.createElement("div");
      square.setAttribute("id", rank);
      if (squareValue === 0) {
        square.classList.add("sea");
        square.addEventListener("dragover", (e) => dragover(e));
        square.addEventListener("drop", (e) => drop(e));
      } else {
        let index = ships.indexOf(squareValue);
        if (index === -1) {
          ships.push(squareValue);
          index = ships.indexOf(squareValue);
        }
        square.textContent = `${index}`;
        square.classList.add("ship");
        square.setAttribute("draggable", true);
        square.addEventListener("dragstart", (e) => dragstart(e));
      }

      grid.appendChild(square);
    }
  }

  element.appendChild(grid);
};

const setHDraggableToFalse = () => {
  const hElements = document.querySelectorAll("h1, h3, h4");
  hElements.forEach((hElement) =>
    hElement.addEventListener("dragstart", (e) => e.preventDefault())
  );
};

const displayEnemyBoard = (element, game, cb, element2, game2) => {
  element.innerHTML = "";
  /* player board should show:
    sea with a plain square,
    ship hits with a red border/bg color and an X on the square,
    missed hits with a different bg color and a dot in the middle,
    ships are also shown with sea cause its not visible to turn player
  */
  const board = game.getBoard();
  const grid = document.createElement("div");
  grid.classList.add("board");
  grid.classList.add("enemyBoard");

  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      const rank = `i${i * 10 + j}`;
      const squareValue = board[i][j];
      const square = document.createElement("div");
      square.classList.add(rank);
      if (squareValue === 1) {
        square.classList.add("shipHit");
        square.textContent = "X";
      } else if (squareValue === 2) {
        square.classList.add("missedHit");
        const circle = document.createElement("div");
        circle.classList.add("circle");
        square.appendChild(circle);
      } else {
        square.classList.add("sea");
        square.addEventListener("mouseenter", () => {
          square.style.backgroundColor = "#e86c75";
        });
        square.addEventListener("mouseleave", () => {
          square.style.backgroundColor = "#eceff4";
        });
        square.addEventListener("click", () => {
          if (typeof board[i][j] === "object") {
            game.receiveAttack(i, j);
            board[i][j] = 1;
          } else board[i][j] = 2;
          cb();
          displayEnemyBoard(element, game, cb, element2, game2);
          displayPlayerBoard(element2, game2);
          if (game.isAllSunk()) {
            console.log("player has won!");
            const h3 = document.createElement("h3");
            h3.textContent = "Player has won!";
            h3.style.marginTop = "-175px";
            document.querySelector("body").appendChild(h3);
            displayBlankEnemy(element, game);
          } else if (game2.isAllSunk()) {
            console.log("computer has won");
            const h3 = document.createElement("h3");
            h3.textContent = "Computer has won!";
            h3.style.marginTop = "-175px";
            document.querySelector("body").appendChild(h3);
            displayBlankEnemy(element, game);
          }
        });
      }

      grid.appendChild(square);
    }
  }

  element.appendChild(grid);
};

export {
  displayPlayerBoard,
  displayBlankEnemy,
  displayEnemyBoard,
  displayInitialBoard,
  setHDraggableToFalse,
};
