import { Ship, Gameboard, Player } from "./src/game.js";

test("Ship methods hit and isSunk work", () => {
  const ship = Ship(1);
  expect(ship.isSunk()).toBe(false);

  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("Gameboard could report that all ships have sunk", () => {
  const game = Gameboard();
  game.placeShip(1, 4, 4, 0);

  expect(game.isAllSunk()).toBe(false);
  game.receiveAttack(4, 4);
  expect(game.isAllSunk()).toBe(true);
});

test("Player could lose", () => {
  const player = Player("player 1");
  const game = Gameboard();
  game.placeShip(1, 4, 4, 0);

  expect(player.isLose(game)).toBe(false);

  player.receiveAttack(4, 4, game);
  expect(player.isLose(game)).toBe(true);
});
