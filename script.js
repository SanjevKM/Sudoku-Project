const initialBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

function createBoard() {
    const board = document.getElementById('sudoku-board');
    board.innerHTML = ''; // Clear the board if already exists

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('input');
            cell.setAttribute('type', 'number');
            cell.setAttribute('min', '1');
            cell.setAttribute('max', '9');

            if (initialBoard[row][col] !== 0) {
                cell.value = initialBoard[row][col];
                cell.disabled = true; // Disable cells with initial numbers
            }

            cell.id = `cell-${row}-${col}`;
            board.appendChild(cell);
        }
    }
}

function solveSudoku() {
    const board = [];

    for (let row = 0; row < 9; row++) {
        board[row] = [];
        for (let col = 0; col < 9; col++) {
            const cellValue = document.getElementById(`cell-${row}-${col}`).value;
            board[row][col] = cellValue ? parseInt(cellValue) : 0;
        }
    }

    if (solve(board)) {
        updateBoard(board);
    } else {
        openModal(); // Open the modal if no solution exists
    }
}

function openModal() {
    document.getElementById('no-solution-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('no-solution-modal').style.display = 'none';
}

function updateBoard(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.getElementById(`cell-${row}-${col}`);
            cell.value = board[row][col];
        }
    }
}

// Sudoku solving algorithm 
function isValid(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) {
            return false;
        }
    }

    const startRow = row - row % 3,
          startCol = col - col % 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }

    return true;
}

function solve(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solve(board)) {
                            return true;
                        } else {
                            board[row][col] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

window.onload = createBoard;
