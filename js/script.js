const board = document.getElementById("board");
const turnStatus = document.getElementById("turn-status");

let grid = [];
let currentPlayer = "player"; // Player Red (Spartan)
let playerPos = { x: 0, y: 0 };
let opponentPos = { x: 4, y: 4 };
let player1Character = "🛡️"; // Default character for Player 1
let player2Character = "⚔️"; // Default character for Player 2

function createBoard() {
  board.innerHTML = "";
  for (let row = 0; row < 5; row++) {
    grid[row] = [];
    for (let col = 0; col < 5; col++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      board.appendChild(cell);
      grid[row][col] = cell;
    }
  }
  grid[0][0].innerHTML = `<span class="player">${player1Character}</span>`; // Player Red Spartan
  grid[4][4].innerHTML = `<span class="opponent">${player2Character}</span>`; // Player Blue Spartan
}

function movePlayer(player, direction) {
  if (checkVictory()) return; // Stop if game is over

  let currentPos = player === "player" ? playerPos : opponentPos;
  let newPos = { x: currentPos.x, y: currentPos.y };

  if (direction === "up" && newPos.y > 0) newPos.y--;
  if (direction === "down" && newPos.y < 4) newPos.y++;
  if (direction === "left" && newPos.x > 0) newPos.x--;
  if (direction === "right" && newPos.x < 4) newPos.x++;

  grid[currentPos.y][currentPos.x].innerHTML = ""; // Clear current position

  // Update new position
  currentPos.x = newPos.x;
  currentPos.y = newPos.y;

  if (player === "player") {
    grid[currentPos.y][
      currentPos.x
    ].innerHTML = `<span class="player">${player1Character}</span>`;
    currentPlayer = "opponent";
    turnStatus.innerHTML = "Player Turn: Blue Spartan";
  } else {
    grid[currentPos.y][
      currentPos.x
    ].innerHTML = `<span class="opponent">${player2Character}</span>`;
    currentPlayer = "player";
    turnStatus.innerHTML = "Player Turn: Red Spartan";
  }

  checkVictory();
}

function checkVictory() {
  if (playerPos.x === opponentPos.x && playerPos.y === opponentPos.y) {
    turnStatus.innerHTML = `The Red Spartan wins!`;
    return true;
  }
  return false;
}

function updateCharacter(player, character) {
  if (player === "player") {
    player1Character = character;
  } else {
    player2Character = character;
  }
}

function restartGame() {
  playerPos = { x: 0, y: 0 };
  opponentPos = { x: 4, y: 4 };
  currentPlayer = "player";
  turnStatus.innerHTML = "Player Turn: Red Spartan";
  createBoard();
}

// Keyboard controls
document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
  if (currentPlayer === "player") {
    switch (event.key) {
      case "w":
      case "W":
        movePlayer("player", "up");
        break;
      case "a":
      case "A":
        movePlayer("player", "left");
        break;
      case "s":
      case "S":
        movePlayer("player", "down");
        break;
      case "d":
      case "D":
        movePlayer("player", "right");
        break;
    }
  } else {
    switch (event.key) {
      case "ArrowUp":
        movePlayer("opponent", "up");
        break;
      case "ArrowLeft":
        movePlayer("opponent", "left");
        break;
      case "ArrowDown":
        movePlayer("opponent", "down");
        break;
      case "ArrowRight":
        movePlayer("opponent", "right");
        break;
    }
  }
}

// Initialize the game board
createBoard();
