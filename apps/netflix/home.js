console.log("script: NX-home");

if($(".list-profiles").length > 0){
    iniciarPerfiles();
} else {
    
    var grande = {logoTitulo: $(".billboard-row .billboard .info .billboard-title .title-logo").attr("src"), sinop: $(".billboard-row .billboard .info .synopsis").text(), imgFondo: $(".billboard-row .billboard .hero-image-wrapper .static-image").attr("src"), href: $(".billboard-row .billboard .info .billboard-links > a.playLink").attr("href")};
    var arrayTodo = [];
    var scrollT = 0, arrayTodo = [], resultado, intervalo;

    var promesaIntervalo = new Promise((resolve, reject) => {
        intervalo = setInterval(function(){ return scrollearWeb(scrollT).then(() => resolve(true)); }, 1000);
    });

    iniciar();

}




async function llenarResultado(){
    return await new Promise((resolve)=>{
        $(".lolomoRow").map(function(a, b){
            var este = $(this);
            var titulo = este.find(".rowTitle .row-header-title").text();
            var contexto = este.attr("data-list-context");
            var arrayPeli = [];
            if(contexto != "bigRow"){
                este.find(".slider-item").map((a, b)=>{
                    if($(b).find(".title-card-tall-panel .boxart-tall-panel").length > 0){
                        var img = $(b).find(".title-card-tall-panel .boxart-tall-panel img").attr("src");
                    } else {
                        var img = $(b).find(".title-card .boxart-container img").attr("src");
                    }
                    
                    var link = $(b).find(".title-card a").attr("href");
                    var titulo = $(b).find(".title-card a").attr("aria-label");
                    if(titulo && link && img){
                        arrayPeli.push({img: img, link: link, titulo: titulo});
                    }
                    
                });
                arrayTodo.push({titulo: titulo, contexto: contexto, pelis: arrayPeli});
            }
            if(a == $(".lolomoRow").length-1){
                resolve([{grande: grande, todo: arrayTodo, avatar: $(".profile-icon").attr("src"), tipo: 2, socket: "netflix-home"}]);
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

function iniciarPerfiles(){
    return llenarPerfiles();
}

async function llenarPerfiles(){
    return await new Promise((resolve)=>{
        var arrayRecomendados = [];
        $("li.profile").map(function(a, b){
            var img = $(this).find(".profile-icon").attr("style").replace("background-image:url(", "").replace(")", "")
            var link = $(this).find(".profile-link").attr("href");
            var nombre = $(this).find(".profile-name").text()
            if(nombre && link && img){
                arrayRecomendados.push({nombre: nombre, href: link, img: img});
            }
            if(a == $("li.profile").length-1){
                resolve([{recomendados: arrayRecomendados, tipo: 1, pregunta: $(".profile-gate-label").text(), socket: "netflix-home"}]);
            }
        });
    }).then((res)=>{
        appCargador(false);
        chrome.runtime.sendMessage(res);
    });
}

function scrollearWeb(top){
    
    return new Promise((resolve)=>{
        scrollT = top+1000;
        window.scrollTo({top: scrollT});
        if(scrollT >= 5000){
            resolve(true);
            clearInterval(intervalo);
        }
    });
        
}