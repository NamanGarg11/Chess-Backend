import { WebSocket } from "ws";
import { INIT_GAME , MOVE} from "./messages";
import {Game} from "./Game";
export class GameManager{
    private games:Game[];
    private pendingUser:WebSocket | null;
    private users:WebSocket[];
    constructor(){
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(socket: WebSocket){
        this.users.push(socket);
        this.addHandler(socket);
    }
    deleteUser(socket: WebSocket){
        this.users = this.users.filter((user) => user !== socket);
       
    }
    addHandler(socket:WebSocket){
        socket.on("message", (data) => {
            console.log("inside handler");
            const message = JSON.parse(data.toString());
            if(message.type === INIT_GAME){
                    if(this.pendingUser){
                        console.log("inside initializer");
                        const game = new Game(this.pendingUser, socket);
                        this.games.push(game);
                        this.pendingUser = null;

                        // start game
                    }
                    else{
                        this.pendingUser= socket;
                    }
            }
            if(message.type === MOVE){
                console.log("inside message move")
                const game = this.games.find((game) => game.player1 === socket || game.player2 === socket);
                if(game){
                    game.makeMove(socket, message.move);
                }
            }
        });
    }
}