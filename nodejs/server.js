const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"],
      transports: ['websocket', 'polling'],
      credentials: true
  },
  allowEIO3: true
});
const md5 = require('md5');
const puerto = process.env.port || 3000;
const cors = require('cors');


server.listen(puerto, function() {
	console.log('Servidor corriendo puerto '+puerto);
});


var salas = [];
io.on('connection', function(socket) {
    

    socket.on('random', function(resolve){
      let randNum = nRandom();
      let obj = {qr: randNum, token: md5(randNum+'salitantitroll')};
      socket.join('sala'+randNum);
      salas.push(obj);
      resolve(obj);
      console.log('socket:random / '+randNum);
    });


    socket.on('crear-conexion', function(data){
      socket.join('sala'+data);
      console.log('socket:crear-conexion / '+'sala'+data);
    });

    socket.on('terminar-conexion', function(data){
      salas.map((v,i)=>{
        if(v.token===data)
          salas.splice(i, 1);
          console.log('socket:terminar-conexion / '+'index='+i);
      });
      //socket.disconnect();
    });

    socket.on('entrar-conexion', function(data){
      socket.join('sala'+data);
      io.to('sala'+data).emit('emparejados', data);
      console.log('socket:entrar-conexion / '+'sala'+data);
    });


    socket.on("enviar-web", function(data){
      io.to([ ...socket.rooms][1]).emit("web-cliente", data);
      console.log('socket:enviar-web / room:'+[ ...socket.rooms][1]+' web-cliente= '+data);
    });

    
    socket.on('com-bg-app', function(data){
      io.to([ ...socket.rooms][1]).emit(data);
      console.log('socket:com-bg-app / room:'+[ ...socket.rooms][1]+' data= '+data);
      //io.emit(data);
      //console.log(socket.rooms);
    });

    socket.on('servidor-funcion', function(data){
      io.to([ ...socket.rooms][1]).emit('mandar-funcion', data);
      console.log('socket:servidor-funcion / room:'+[ ...socket.rooms][1]+' mandar-funcion= '+data);
    });
    socket.on('servidor-resultados', function(data){
      if(data)
      io.to([ ...socket.rooms][1]).emit('resultados', data[0]);
      console.log('socket:servidor-resultados / room:'+[ ...socket.rooms][1]+' resultados= '+data[0]);
    });

    socket.on("yt-on", function(data){
      if(data)
      io.to([ ...socket.rooms][1]).emit("yt-on-client", data[0]);

      console.log('socket:yt-on / room:'+[ ...socket.rooms][1]+' yt-on-client= '+data[0]);
    });

    socket.on("netflix-home", function(data){
      if(data)
      io.to([ ...socket.rooms][1]).emit("netflix-home-client", data[0]);
      console.log('socket:netflix-home / room:'+[ ...socket.rooms][1]+' netflix-home-client= '+data[0]);
    });

    socket.on("netflix-subtitulos", function(data){
      if(data)
      io.to([ ...socket.rooms][1]).emit("netflix-subtitulos-client", data[0]);
      console.log('socket:netflix-subtitulos / room:'+[ ...socket.rooms][1]+' etflix-subtitulos-client= '+data[0]);
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