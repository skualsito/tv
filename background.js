var socket = io('http://11.11.15.8:8080');
var tabloca;

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': chrome.extension.getURL('index.html')}, function(tab) {
    tabloca = tab.id;
  });
});
chrome.tabs.onUpdated.addListener(function(tabid, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    if(tab.url.indexOf("netflix.com") !== -1) {
      if(tab.url.indexOf("netflix.com/browse") !== -1){
        netflixHome();
      }

    } else if(tab.url.indexOf("youtube.com") !== -1){
      obtRecom();
      if(tab.url.indexOf("youtube.com/results") !== -1){
        obtResul();
      }
      if(tab.url.indexOf("youtube.com/watch") !== -1){
        socket.emit("com-bg-app", "activar-control");
      }
      
    }
  }
});



socket.on('index', function(){
  chrome.tabs.update(tabloca, {url: chrome.extension.getURL('index.html')});
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
function netflixHome(){
  chrome.tabs.executeScript(tabloca, {file:'js/jquery.min.js'}, function(result){
    chrome.tabs.executeScript(tabloca, {file:'apps/netflix/home.js'}, function(resultado){
        socket.emit("netflix-home", resultado);
    });
  });
}





//Youtube
socket.on('obtener-recomendados-yt', function(){
    obtRecom();
});

function obtRecom(){
  chrome.tabs.executeScript(tabloca, {file:'js/jquery.min.js'}, function(result){
    chrome.tabs.executeScript(tabloca, {file:'apps/yt/home.js'}, function(resultado){
        socket.emit("yt-on", resultado);
    });
  });
}

socket.on('obtener-resultados-yt', function(){
  obtResul();
});

function obtResul() {
  chrome.tabs.executeScript(tabloca, {file:'js/jquery.min.js'}, function(result){
    chrome.tabs.executeScript(tabloca, {file:'apps/yt/busqueda.js'}, function(resultado){
      socket.emit('servidor-resultados', resultado);
    });
  });

}


