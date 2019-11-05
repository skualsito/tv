var arrayRecomendados = [];
$("ytd-grid-video-renderer").map(function(a, b){
    var img = $(this).find("#thumbnail").find("img").attr("src");
    var link = $(this).find("#thumbnail").attr("href");
    var titulo = $(this).find("#video-title").text();
    var canalink = $(this).find("#channel-name").find("a").attr("href");
    var canal = $(this).find("#channel-name").find("a").text();
    var canalverif = $(this).find(".badge-style-type-verified").length;
    var tiempo = $(this).find("#metadata-line")[0].innerText;
    arrayRecomendados.push({titulo: titulo, href: link, tiempo: tiempo, canal: canal, canalink: canalink, verif: canalverif, img: img});
});
var resultado = [{recomendados: arrayRecomendados, usuario: $('#avatar-btn img').attr("src")}];
resultado