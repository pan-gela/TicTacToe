const Tictactoe = {
    player: "X",
    state: ["", "", "", "", "", "", "", "", ""], //empty game board
    gameOver: false,

    start() { //start the game
        this.makeBoard();
        document.getElementById("reset").addEventListener("click", () => this.reset());
    },

    reset() {  //reset the game
        this.state = ["", "", "", "", "", "", "", "", ""];
        this.gameOver = false;
        this.player = "X";
        this.makeBoard();
    },

    updateMessage (msg) { //change the text below the board
        document.getElementById("message").innerText = msg;
    },

    makeBoard() { //create the game board
        const board = document.querySelector(".board");
        board.innerHTML = "";
        this.state.forEach((cell, index) => {
            const cellElement = document.createElement("div");
            cellElement.innerText = cell;
            cellElement.classList.add("cell");
            cellElement.addEventListener("click", () => this.checkMove(index, cellElement));
            board.appendChild(cellElement);
        });
        
        this.updateMessage(`Player ${this.player}'s turn`);
    },

    checkMove(i, cellElement) {  //checks how the move affects the game

        if (this.gameOver || this.state[i]) {
            return;
        }

        this.state[i] = this.player;

        cellElement.innerText = this.player;

        const winner = this.checkWin();
        if (winner) {
            this.gameOver = true;
            this.updateMessage(`Player ${this.player} wins!`);
            return;
        } else if (this.state.every((cell) => cell)) {
            this.gameOver = true;
            this.updateMessage("It's a tie!");
        } else {
            this.player = this.player === "X" ? "O" : "X";
            this.updateMessage(`Player ${this.player}'s turn`);
        }
    },

    checkWin() { //checks if a player has won
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        return winningCombos.find((combo) =>
            combo.every((index) => this.state[index] === this.player)
        );

    },
 
};

Tictactoe.start();