if($(".list-profiles").length > 0){
    var arrayRecomendados = [];
    $("li.profile").map(function(a, b){
        var img = $(this).find(".profile-icon").attr("style").replace("background-image:url(", "").replace(")", "")
        var link = $(this).find(".profile-link").attr("href");
        var nombre = $(this).find(".profile-name").text()
        if(nombre && link && img){
            arrayRecomendados.push({nombre: nombre, href: link, img: img});
        }
    });
    var resultado = [{recomendados: arrayRecomendados, tipo: 1, pregunta: $(".profile-gate-label").text()}];
} else {
    var grande = {logoTitulo: $(".billboard-row .billboard .info .billboard-title .title-logo").attr("src"), sinop: $(".billboard-row .billboard .info .synopsis").text(), imgFondo: $(".billboard-row .billboard .hero-image-wrapper .static-image").attr("src"), href: $(".billboard-row .billboard .info .billboard-links > a.playLink").attr("href")};
    var arrayTodo = [];
    $(".lolomoRow").map(function(a, b) { 
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
        
    });

    var resultado = [{grande: grande, todo: arrayTodo, avatar: $(".profile-icon").attr("src"), tipo: 2}];
}
resultado