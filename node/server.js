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
let iniciador = null;

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
        allowedHeaders: ["Access-Control-Allow-Origin"],
    }
});

io.on('connection', (socket) => {
    
    
    console.log('a user connected');
    console.log(socket.id);

    socket.on('hola', (name) => {
        if (llistaUsers.length == 0) {
            socket.emit('comencar');
        } else {
            socket.emit('conectar', iniciador)
        }
        
        socket.name = name;
        console.log('hola,', name);

        console.log("llista AVANS de ficar-lo", llistaUsers);

        llistaUsers.push(socket);

        console.log("llista DESPRÉS de ficar-lo", llistaUsers);


        io.emit('nou usuari', llistaUsers.map((user) => user.name));
    });

    socket.on('answer', (data, socketIniciador) => {
        io.to(socketIniciador).emit('answer', data);
    });

    socket.on('creat inici', (data) => {
        console.log('creat inici', data);
        iniciador = {data, idSocket: socket.id};
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        llistaUsers.splice(llistaUsers.indexOf(socket), 1);
        socket.disconnect();
        console.log(llistaUsers);
    });
});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})