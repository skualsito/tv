var arrayBusqueda = [];
$(".galleryLockups").find(".slider-item").map(function(a, b){
    var titulo = $(b).find("a.slider-refocus").attr("aria-label");
    var link = $(b).find("a.slider-refocus").attr("href");
    var img = $(b).find("img.boxart-image").attr("src");
    arrayBusqueda.push({titulo: titulo, href: link, img: img});
});
var resultado = [{resultados: arrayBusqueda, busqueda: $(".searchInput input").val()}];
resultado
