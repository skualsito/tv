var socket = io('http://192.168.0.104:3000');
var tabloca, qr, token;

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
  
  if (changeInfo.status == 'complete') {
    
    if(tab.url.indexOf("netflix.com") !== -1) {
      socket.emit("enviar-web", "netflix");
      if(tab.url.indexOf("netflix.com/browse") !== -1){
        netflixHome();
      } else if(tab.url.indexOf("netflix.com/watch") !== -1){
        socket.emit("com-bg-app", "activar-control");
      } else if(tab.url.indexOf("netflix.com/search") !== -1){
        netflixSearch();
      }
      

    } else if(tab.url.indexOf("youtube.com") !== -1){
      socket.emit("enviar-web", "youtube");
        scriptScrap('apps/yt/home.js');
      if(tab.url.indexOf("youtube.com/results") !== -1){
        scriptScrap('apps/yt/busqueda.js');
      }
      if(tab.url.indexOf("youtube.com/watch") !== -1){
        socket.emit("com-bg-app", "activar-control");
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

//Netflix
socket.on('obtener-netflix-home', function(){
  netflixHome();
});
socket.on('obtener-netflix-audsub', function(){
  netflixSubtitulos();
});
function netflixHome(){
  chrome.tabs.executeScript(tabloca, {file:'js/jquery.min.js'}, function(result){
    chrome.tabs.executeScript(tabloca, {file:'apps/netflix/home.js'}, async function(resultado){
        socket.emit("netflix-home", resultado);
    });
  });
}
function netflixSearch() {
  chrome.tabs.executeScript(tabloca, {file:'js/jquery.min.js'}, function(result){
    chrome.tabs.executeScript(tabloca, {file:'apps/netflix/busqueda.js'}, function(resultado){
      socket.emit('servidor-resultados', resultado);
    });
  });

}

function netflixSubtitulos() {
  chrome.tabs.executeScript(tabloca, {file:'js/jquery.min.js'}, function(result){
    chrome.tabs.executeScript(tabloca, {file:'apps/netflix/subtitulos.js'}, function(resultado){
      socket.emit('netflix-subtitulos', resultado);
    });
  });

}





//Youtube

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  console.log(msg);
  socket.emit(msg[0].socket, msg);
});

socket.on('obtener-recomendados-yt', function(){
  scriptScrap('apps/yt/home.js');
});

function scriptScrap(archivo){
  chrome.tabs.executeScript(tabloca, {file:'js/jquery.min.js'}, ()=>{
    chrome.tabs.executeScript(tabloca, {file:'js/loading.js'}, ()=>{
      chrome.tabs.executeScript(tabloca, {file:archivo}, ()=>{
          
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
