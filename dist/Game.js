"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        console.log("reach to the game");
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            playload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            playload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        console.log("move made");
        // validating the move had been done by the correct player or not
        // if the move string is even then player 1 else player 2
        if (this.board.moves().length % 2 === 0 && socket !== this.player1) {
            return;
        }
        if (this.board.moves().length % 2 === 1 && socket !== this.player2) {
            return;
        }
        try {
            this.board.move(move);
        }
        catch (e) {
            console.log(e);
            return;
        }
        // the game is over for both the peoples 
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                playload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            this.player2.send(JSON.stringify({
                type: messages_1.MOVE,
                playload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            return;
        }
        // the game is not over 
        // the player 1 had done the move and let the player 2 know that 
        console.log("start game");
        if (this.board.moves().length % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: messages_1.MOVE,
                playload: move
            }));
        }
        // the player 2 has done the move and let player 1 know that 
        else {
            this.player1.send(JSON.stringify({
                type: messages_1.MOVE,
                playload: move
            }));
        }
    }
}
exports.Game = Game;
