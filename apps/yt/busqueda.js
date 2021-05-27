var scrollT = 0, arrayRecomendados = [], resultado, intervaloBusq;

var promesaIntervaloBusq = new Promise((resolve, reject) => {
    intervaloBusq = setInterval(function(){ return scrollearWeb(scrollT).then(() => resolve(true)); }, 1000);
});

iniciarBusq();

async function llenarResultadoBusq(){
    return await new Promise((resolve)=>{
        jQuery("ytd-video-renderer").map(function(a, b){
            var img = jQuery(this).find("#thumbnail img").attr("src");
            var link = jQuery(this).find("#thumbnail").attr("href");
            var titulo = jQuery(this).find("#video-title").text();
            var canalink = jQuery(this).find("#channel-name").find("a").attr("href");
            var canal = jQuery(this).find("#channel-name").find("a").text();
            var canalverif = jQuery(this).find(".badge-style-type-verified").length;
            var tiempo = jQuery(this).find("#metadata-line")[0].innerText;
            arrayRecomendados.push({titulo: titulo, href: link, tiempo: tiempo, canal: canal, canalink: canalink, verif: canalverif, img: img});
            console.log(a, jQuery("ytd-video-renderer").length-1);
            if(a == jQuery("ytd-video-renderer").length-1){
                resolve([{recomendados: arrayRecomendados, socket: "servidor-resultados"}])
            }
        });
        window.scrollTo({top: 0});
    }).then((res)=>{
        appCargador(false);
        chrome.runtime.sendMessage(res);
    });
}

async function iniciarBusq(){
    return await promesaIntervaloBusq.then(()=>{
        return llenarResultadoBusq();
    });
}

function scrollearWebBusq(top){
    
    return new Promise((resolve)=>{
        if(!jQuery("ytd-continuation-item-renderer").find("paper-spinner").attr("active") != undefined){
            scrollT = top+1000;
            window.scrollTo({top: scrollT});
            if(scrollT >= 10000){
                resolve(true);
                clearInterval(intervaloBusq);
            }
        }
    });
        
}

