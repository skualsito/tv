console.log("script: NX-busqueda");
var scrollT = 0, arrayBusqueda = [], resultado, intervalo;

var promesaIntervalo = new Promise((resolve, reject) => {
    intervalo = setInterval(function(){ return scrollearWeb(scrollT).then(() => resolve(true)); }, 1000);
});

iniciar();

async function llenarResultado(){
    return await new Promise((resolve)=>{
        $(".galleryLockups").find(".slider-item").map(function(a, b){
            var titulo = $(b).find("a.slider-refocus").attr("aria-label");
            var link = $(b).find("a.slider-refocus").attr("href");
            var img = $(b).find("img.boxart-image").attr("src");
            arrayBusqueda.push({titulo: titulo, href: link, img: img});
            if(a == $(".galleryLockups").find(".slider-item").length-1){
                resolve([{resultados: arrayBusqueda, busqueda: $(".searchInput input").val(), socket: "servidor-resultados"}]);
            }
        });
        window.scrollTo({top: 0});
    }).then((res)=>{
        appCargador(false);
        chrome.runtime.sendMessage(res);
    });
}

async function iniciar(){
    return await promesaIntervalo.then(()=>{
        return llenarResultado();
    });
}

function scrollearWeb(top){
    
    return new Promise((resolve)=>{
        scrollT = top+1000;
        window.scrollTo({top: scrollT});
        if(scrollT >= 2000){
            resolve(true);
            clearInterval(intervalo);
        }
    });
        
}