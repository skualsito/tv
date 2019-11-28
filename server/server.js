var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080, function() {
	console.log('Servidor corriendo');
});

io.on('connection', function(socket) {
    console.log('Conectado');


    socket.on('crear-conexion', function(data){
      socket.join('sala'+data);
    });
    socket.on('entrar-conexion', function(data){
      socket.join('sala'+data);
      io.to('sala'+data).emit('emparejados');
    });

    
    socket.on('com-bg-app', function(data){
      //io.to(socket).emit(data);
      io.emit(data);
      //console.log(socket.rooms);
    });

    socket.on('servidor-funcion', function(data){
      io.emit('mandar-funcion', data);
    });
    socket.on('servidor-resultados', function(data){
      if(data)
      io.emit('resultados', data[0]);
    });

    socket.on("yt-on", function(data){
      if(data)
      io.emit("yt-on-client", data[0]);
    });

    socket.on("netflix-home", function(data){
      if(data)
      io.emit("netflix-home-client", data[0]);
    });

    socket.on("netflix-subtitulos", function(data){
      if(data)
      io.emit("netflix-subtitulos-client", data[0]);
    });

});
