var scrollT = 0, arrayRecomendados = [], resultado, intervalo;

var promesaIntervalo = new Promise((resolve, reject) => {
    intervalo = setInterval(function(){ return scrollearWeb(scrollT).then(() => resolve(true)); }, 1000);
});

iniciar();

async function llenarResultado(){
    return await new Promise((resolve)=>{
        jQuery("ytd-rich-item-renderer").map(function(a, b){
            var img = jQuery(this).find("#thumbnail").find("img").attr("src");
            var link = jQuery(this).find("#thumbnail").attr("href");
            var titulo = jQuery(this).find("#video-title").text();
            var canalink = jQuery(this).find("#channel-name").find("a").attr("href");
            var canal = jQuery(this).find("#channel-name").find("a").text();
            var canalverif = jQuery(this).find(".badge-style-type-verified").length;
            var tiempo = (jQuery(this).find("#metadata-line")[0]) ? jQuery(this).find("#metadata-line")[0].innerText : "";
            arrayRecomendados.push({titulo: titulo, href: link, tiempo: tiempo, canal: canal, canalink: canalink, verif: canalverif, img: img});
            if(a == jQuery("ytd-rich-item-renderer").length-1){
                resolve([{recomendados: arrayRecomendados, usuario: jQuery('#avatar-btn img').attr("src"), socket: "yt-on"}])
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
        if(!jQuery("ytd-continuation-item-renderer").find("paper-spinner").attr("active") != undefined){
            scrollT = top+1000;
            window.scrollTo({top: scrollT});
            if(scrollT >= 10000){
                resolve(true);
                clearInterval(intervalo);
            }
        }
    });
        
}



