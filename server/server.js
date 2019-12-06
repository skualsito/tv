var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080, function() {
	console.log('Servidor corriendo');
});
var salas = [];
io.on('connection', function(socket) {
    console.log('Conectado');
    

    socket.on('random', function(resolve){
      resolve(nRandom());
    });


    socket.on('crear-conexion', function(data){
      socket.join('sala'+data);
    });
    socket.on('entrar-conexion', function(data){
      socket.join('sala'+data);
      io.to('sala'+data).emit('emparejados');
      
    });


    socket.on("enviar-web", function(data){
      io.to(Object.keys(socket.rooms)[1]).emit("web-cliente", data);
    });

    
    socket.on('com-bg-app', function(data){
      io.to(Object.keys(socket.rooms)[1]).emit(data);
      //io.emit(data);
      //console.log(socket.rooms);
    });

    socket.on('servidor-funcion', function(data){
      io.to(Object.keys(socket.rooms)[1]).emit('mandar-funcion', data);
    });
    socket.on('servidor-resultados', function(data){
      if(data)
      io.to(Object.keys(socket.rooms)[1]).emit('resultados', data[0]);
    });

    socket.on("yt-on", function(data){
      if(data)
      io.to(Object.keys(socket.rooms)[1]).emit("yt-on-client", data[0]);
    });

    socket.on("netflix-home", function(data){
      if(data)
      io.to(Object.keys(socket.rooms)[1]).emit("netflix-home-client", data[0]);
    });

    socket.on("netflix-subtitulos", function(data){
      if(data)
      io.to(Object.keys(socket.rooms)[1]).emit("netflix-subtitulos-client", data[0]);
    });

});
function nRandom(){
  var n = pad(Math.floor(Math.random() * 999999) + 1, 6);
  if(salas.indexOf(n) !== -1) 
    n = nRandom();
  return n;
}
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}