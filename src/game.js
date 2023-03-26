const Ship = (length) => {
  let hits = 0;

  const hit = () => {
    hits += 1;
  };

  const isSunk = () => hits === length;

  return { hit, isSunk };
};

const Gameboard = () => {
  const board = [];
  // 0 denotes sea, Ship denotes ship, 1 denotes a ship hit and 2 denotes a miss hit
  for (let i = 0; i < 10; i += 1) board.push(new Array(10).fill(0));
  const ships = []; // stores 4 1-length, 3 2-length, 2 3-length, and 1 4-length

  const placeShip = (shipLength, x, y, mode) => {
    const ship = Ship(shipLength);
    ships.push(ship);
    let success = false;
    if (mode === 0 && x + shipLength <= 10) {
      // we could place ship facing down
      let count = 0;
      while (count < shipLength) {
        board[x + count][y] = ship;
        count += 1;
      }
      success = true;
    } else if (mode === 1 && x - shipLength >= 0) {
      // we could place ship facing up
      let count = 0;
      while (count < shipLength) {
        board[x - count][y] = ship;
        count += 1;
      }
      success = true;
    } else if (mode === 2 && y + shipLength <= 10) {
      // we could place ship facing to the right
      let count = 0;
      while (count < shipLength) {
        board[x][y + count] = ship;
        count += 1;
      }
      success = true;
    } else if (mode === 3 && y - shipLength >= 0) {
      // we could place ship facing to the left
      let count = 0;
      while (count < shipLength) {
        board[x][y - count] = ship;
        count += 1;
      }
      success = true;
    }

    return success;
  };

  const receiveAttack = (x, y) => {
    const square = board[x][y];
    if (square === 0) {
      // sea so missed hit
      board[x][y] = 2;
    } else {
      // ship so ship hit
      board[x][y] = 1;
      square.hit();
      if (square.isSunk()) {
        const index = ships.indexOf(ships);
        ships.splice(index, 1);
      }
    }

    return board[x][y];
  };

  const isAllSunk = () => ships.length === 0;

  const getBoard = () => board;

  return { receiveAttack, placeShip, isAllSunk, getBoard };
};

const Player = (game) => {
  const isLose = () => game.isAllSunk();

  const attack = (player, x, y) => player.receiveAttack(x, y);

  const receiveAttack = (x, y) => game.receiveAttack(x, y);

  return { isLose, attack, receiveAttack };
};

const computerPlayer = (game) => {
  /* takes players board and attacks it */
  const attacks = [];
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      attacks.push(`${i}|${j}`);
    }
  }

  let j;
  let temp;
  for (let i = attacks.length - 1; i > 0; i -= 1) {
    // shuffle the attacks
    j = Math.floor(Math.random() * (i + 1));
    temp = attacks[i];
    attacks[i] = attacks[j];
    attacks[j] = temp;
  }

  const randomAttack = () => {
    const attack = attacks.shift();
    const [x, y] = attack.split("|");
    game.receiveAttack(x, y);
  };

  return { randomAttack, attacks };
};

const initialBoard = () => {
  const game = Gameboard();
  game.placeShip(1, 9, 0, 0);
  game.placeShip(2, 6, 1, 0);
  game.placeShip(2, 0, 1, 0);
  game.placeShip(1, 3, 2, 0);
  game.placeShip(3, 6, 3, 0);
  game.placeShip(1, 0, 5, 0);
  game.placeShip(3, 0, 9, 0);
  game.placeShip(2, 2, 5, 2);
  game.placeShip(4, 4, 5, 2);
  game.placeShip(1, 8, 8, 0);

  return game;
};

const npcBoard = () => {
  const game = Gameboard();
  game.placeShip(1, 5, 5, 0);
  game.placeShip(2, 6, 1, 2);
  game.placeShip(2, 6, 7, 0);
  game.placeShip(1, 8, 1, 0);
  game.placeShip(3, 9, 3, 2);
  game.placeShip(1, 3, 7, 0);
  game.placeShip(3, 0, 9, 0);
  game.placeShip(2, 3, 2, 0);
  game.placeShip(4, 0, 0, 0);
  game.placeShip(1, 8, 9, 0);

  return game;
};

export { Ship, Gameboard, Player, initialBoard, npcBoard, computerPlayer };
