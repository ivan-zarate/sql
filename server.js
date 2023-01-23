const express = require("express");
const cors = require('cors');
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server)


const router = require("./Routes/products");
const chat = require("./Routes/messages");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8080;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/api', router);
app.use('/api', chat);
app.use(express.static("public"));

const mensajes = [];

io.on('connection', socket => {
  console.log('Nuevo cliente conectado!');
  socket.emit('mensajes', mensajes);
  socket.on('mensaje', data => {
    mensajes.push({ socketid: socket.id, mensaje: data })
    io.sockets.emit('mensajes', mensajes);
  });
});

const srv = server.listen(port, () => {
  console.log(`Escuchando app en el puerto ${srv.address().port}`);
});

srv.on('error', error => console.log(`Error en servidor ${error}`))