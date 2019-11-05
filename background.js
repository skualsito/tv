var socket;
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': chrome.extension.getURL('index.html')}, function(tab) {
    socket = io('http://localhost:8080');
  });
});
chrome.tabs.onUpdated.addListener(function(tabid, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    if(tab.url.indexOf("netflix.com") !== -1) {


    } else if(tab.url.indexOf("youtube.com") !== -1){
      const tabloca = tabid;    
      socket.on('mandar-funcion', function(data){
        console.log("entra");
        chrome.tabs.executeScript(tabloca, {file:'js/jquery.min.js'}, function(result){
          chrome.tabs.executeScript(tabloca, {code: data}, function (){
            console.log(data);
          });
        });
      });

      obtRecom();
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
      

      if(tab.url.indexOf("youtube.com/results") !== -1){
        obtResul();
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
        
        
      }
      
      
    }
  }
});


