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
    if (mode === 0 && x + shipLength < 10) {
      // we could place ship facing to the right
      let count = 0;
      while (count < shipLength) {
        board[x + count][y] = ship;
        count += 1;
      }
      success = true;
    } else if (mode === 1 && x - shipLength >= 0) {
      // we could place ship facing to the left
      let count = 0;
      while (count < shipLength) {
        board[x - count][y] = ship;
        count += 1;
      }
      success = true;
    } else if (mode === 2 && y + shipLength < 10) {
      // we could place ship facing up
      let count = 0;
      while (count < shipLength) {
        board[x][y + count] = ship;
        count += 1;
      }
      success = true;
    } else if (mode === 3 && y - shipLength >= 0) {
      // we could place ship facing down
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

const Player = (name) => {
  const isLose = (game) => game.isAllSunk();

  const attack = (player, x, y) => player.receiveAttack(x, y);

  const receiveAttack = (x, y, game) => game.receiveAttack(x, y);

  return { isLose, attack, receiveAttack };
};

const computerPlayer = () => {
  const computer = Player("computer");
};

export { Ship, Gameboard, Player };
