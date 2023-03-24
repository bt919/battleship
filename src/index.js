import "./styles.css";
import { Gameboard, initialBoard } from "./game.js";
import {
  displayPlayerBoard,
  displayEnemyBoard,
  displayInitialBoard,
} from "./display.js";

const startGame = initialBoard();
const board1 = document.querySelector(".board1");
const board2 = document.querySelector(".board2");
displayInitialBoard(board1, startGame);
displayEnemyBoard(board2, startGame);

const squares = document.querySelectorAll(".board1 > div");
squares.forEach((square) => {
  square.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  });
  square.addEventListener("dragenter", (e) => {
    e.preventDefault();
  });
  square.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  square.addEventListener("dragleave", (e) => {});
  square.addEventListener("drop", (e) => {
    // get the draggable element
    const id = e.dataTransfer.getData("text/plain");
    const draggable = document.getElementById(id);

    // add it to the drop target
    e.target.appendChild(draggable);
  });
});
