//var socket = io('http://localhost:3000');
var socket = io('http://jsmart-server.juanalmada.com');



var tabloca, qr, token, urlActiva;

const urlException = ["https://www.netflix.com/browse"];

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': chrome.extension.getURL('index.html')}, function(tab) {

    

    tabloca = tab.id;
    if(!qr && !token) {
      socket.emit("random", function(data){
        qr = data.qr;
        token = data.token;
        localStorage.setItem("qrcode", qr);
        localStorage.setItem("token", token);
        socket.emit("entrar-conexion", qr);
      });
    }
    
  });
});


chrome.tabs.onUpdated.addListener(function(tabid, changeInfo, tab) {
  if(tabid != tabloca)
    return false;

    if(urlActiva != tab.url){
      if(tab.url.indexOf("netflix.com") !== -1) {
        socket.emit("enviar-web", "netflix");
      } else if(tab.url.indexOf("youtube.com") !== -1){
        socket.emit("enviar-web", "youtube");
      }
    }

    
    
  if (changeInfo.status == 'complete' && (urlActiva != tab.url || urlException.includes(tab.url))) {
      urlActiva = tab.url;
      
    
    if(tab.url.indexOf("netflix.com") !== -1) {
      if(tab.url.indexOf("netflix.com/browse") !== -1){
        scriptScrap('apps/netflix/home.js');
      } else if(tab.url.indexOf("netflix.com/watch") !== -1){
        socket.emit("com-bg-app", "activar-control");
      } else if(tab.url.indexOf("netflix.com/search") !== -1){
        scriptScrap('apps/netflix/busqueda.js');
        
      }
      

    } else if(tab.url.indexOf("youtube.com") !== -1){
      if(tab.url.indexOf("youtube.com/results") !== -1){
        scriptScrap('apps/yt/busqueda.js');
      } else if(tab.url.indexOf("youtube.com/watch") !== -1) {
        socket.emit("com-bg-app", "activar-control");
      } else {
        scriptScrap('apps/yt/home.js');
      }
      
    }
  }
});


socket.on('index', function(){
  chrome.tabs.update(tabloca, {url: chrome.extension.getURL('index.html')});
  socket.emit("enviar-web", "control");
});

socket.on('mandar-funcion', function(data){
  chrome.tabs.executeScript(tabloca, {file:'js/jquery.min.js'}, function(result){
    chrome.tabs.executeScript(tabloca, {code: data}, function (){
    });
  });
});

socket.on('control-boton', function(data){
  chrome.tabs.sendMessage(tabloca, data);
});


//Netflix
socket.on('obtener-netflix-home', function(){
  scriptScrap('apps/netflix/home.js');
});
socket.on('obtener-netflix-audsub', function(){
  netflixSubtitulos();
});


function netflixSubtitulos() {
  chrome.tabs.executeScript(tabloca, {file:'js/jquery.min.js'}, function(result){
    chrome.tabs.executeScript(tabloca, {file:'apps/netflix/subtitulos.js'}, function(resultado){
      socket.emit('netflix-subtitulos', resultado);
    });
  });

}





//Youtube

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  socket.emit(msg[0].socket, msg);
});

socket.on('obtener-recomendados-yt', function(){
  scriptScrap('apps/yt/home.js');
});

function scriptScrap(archivo){
    console.log(archivo);
    chrome.tabs.executeScript(tabloca, {file:'js/jquery.min.js'}, ()=>{
      console.log("script-1");
      chrome.tabs.executeScript(tabloca, {file:'js/loading.js'}, ()=>{
        console.log("script-2");
        chrome.tabs.executeScript(tabloca, {file:archivo}, ()=>{
          console.log("script-3");
        });
      });
    });
}


socket.on('obtener-resultados-yt', function(){
  scriptScrap('apps/yt/busqueda.js');
});

function obtResul() {
  chrome.tabs.executeScript(tabloca, {file:'js/jquery.min.js'}, function(result){
    chrome.tabs.executeScript(tabloca, {file:'apps/yt/busqueda.js'}, function(resultado){
      socket.emit('servidor-resultados', resultado);
    });
  });

}


socket.on('emparejados', function(data){
  console.log("background:emparejados", data);
});




//cerrar
chrome.tabs.onRemoved.addListener(function(tabid, removed) {
  if(tabid != tabloca)
    return false;
  
    socket.emit('terminar-conexion', token);
    
});
