import express from 'express';

import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express()
//A pro 3590, a pro 3589
const port = 3589
app.use(cors());
const server = createServer(app);

const llistaUsers = [];

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
        allowedHeaders: ["Access-Control-Allow-Origin"],
    }
});

io.on('connection', (socket) => {
    llistaUsers.push(socket);
    console.log('a user connected');
    console.log(socket.id);

    socket.on('hola', (name) => {
        socket.name = name;
        console.log('hola,', name);

        io.emit('nou usuari', llistaUsers.map((user) => user.name));
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
        llistaUsers.splice(llistaUsers.indexOf(socket), 1);
        socket.disconnect();
    });
});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})