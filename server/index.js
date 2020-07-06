const port = process.env.port || 7000;
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./Users.js');
const router = require("./router");
const cors = require("cors");
const cmd = require("./Commandes");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => { //permet la connexion
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room});
        
        if (error) return callback(error);
        
        socket.emit('message', { user: 'admin', text: `${user.name}, Bienvenue dans le channel ${user.room}`}); // accueil les users
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, A rejoins la conversation !`}); // envoi un message a tout le monde que le user a rejoins la salle
       
        socket.join(user.room); // le user entre dans la room
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message }); // omet le message a l'utilisateur spécifique
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})

       
        callback();
    });

    socket.on('Command', (message) => {
        if (message == "/part") {
            cmd.part(socket, io)
        } else if (message == "/nick") {
            cmd.nick(socket, io)
        } else if (message == "/list") {
            cmd.list(socket, io)
        } else if (message == "/create") {
            cmd.create(socket, io)
        } else if (message == "/suppr") {
            cmd.suppr(socket, io)
        }   
    });

    socket.on("disconnect", () => {
      cmd.part(socket, io);
    });
});

app.use(router); // on passe dans le routeur
server.listen(port, () => console.log(`le serveur a démarré sur le port  ${port}`)); // passe dans une variable 

