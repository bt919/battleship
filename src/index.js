import "./styles.css";
import {
  Gameboard,
  initialBoard,
  npcBoard,
  Player,
  computerPlayer,
} from "./game.js";
import {
  displayPlayerBoard,
  displayBlankEnemy,
  displayEnemyBoard,
  displayInitialBoard,
  setHDraggableToFalse,
} from "./display.js";

setHDraggableToFalse();
const playerGame = initialBoard();
const npcGame = npcBoard();
const board1 = document.querySelector(".board1"); // display player board inside this
const board2 = document.querySelector(".board2"); // display computer board inside this
displayInitialBoard(board1, playerGame); // allows player to drag and drop ships
displayBlankEnemy(board2, npcGame);

document.querySelector("button").addEventListener("click", () => {
  const elementsToRemove = document.querySelectorAll("h3, h4, button");
  elementsToRemove.forEach((element) =>
    element.parentNode.removeChild(element)
  );
  document.querySelector(".content").style["margin-bottom"] = "380px";

  const player = Player(playerGame);
  const computer = computerPlayer(playerGame);
  // while (!player.isLose() && !computer.isLose()) {
  // let the player and computer alternate in making moves
  displayPlayerBoard(board1, playerGame);
  function callback() {
    computer.randomAttack();
  }
  displayEnemyBoard(board2, npcGame, callback, board1, playerGame);
  // }
});
