import { WebSocketServer } from 'ws';
import { GameManager } from './GameManger';

const wss = new WebSocketServer({ port: 8080 });
    const gamemanager = new GameManager();
wss.on('connection', function connection(ws) {
    // console.log("connected successfully on 8080");
    gamemanager.addUser(ws);
    ws.on("disconect", ()=>gamemanager.deleteUser(ws) 
    
);
// console.log("disconnected successfully");
});