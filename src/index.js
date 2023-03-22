import "./styles.css";
import { Gameboard } from "./game.js";
import { displayPlayerBoard } from "./display.js";

const game = Gameboard();
game.placeShip(2, 4, 4, 0);
game.receiveAttack(4, 4);
game.receiveAttack(6, 6);
console.log(game.getBoard());
const container = document.querySelector(".content");
displayPlayerBoard(container, game);
