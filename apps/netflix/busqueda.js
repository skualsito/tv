var arrayRecomendados = [];
jQuery("ytd-video-renderer").map(function(a, b){
    var img = jQuery(this).find("#thumbnail img").attr("src");
    var link = jQuery(this).find("#thumbnail").attr("href");
    var titulo = jQuery(this).find("#video-title").text();
    var canalink = jQuery(this).find("#channel-name").find("a").attr("href");
    var canal = jQuery(this).find("#channel-name").find("a").text();
    var canalverif = jQuery(this).find(".badge-style-type-verified").length;
    var tiempo = jQuery(this).find("#metadata-line")[0].innerText;
    arrayRecomendados.push({titulo: titulo, href: link, tiempo: tiempo, canal: canal, canalink: canalink, verif: canalverif, img: img});
});
var resultado = [{recomendados: arrayRecomendados}];
resultado
