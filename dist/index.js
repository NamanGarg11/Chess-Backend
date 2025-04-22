"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManger_1 = require("./GameManger");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gamemanager = new GameManger_1.GameManager();
wss.on('connection', function connection(ws) {
    // console.log("connected successfully on 8080");
    gamemanager.addUser(ws);
    ws.on("disconect", () => gamemanager.deleteUser(ws));
    // console.log("disconnected successfully");
});
