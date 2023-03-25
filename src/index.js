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
