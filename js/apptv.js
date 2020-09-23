$(function () {
   var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };    var today  = new Date();
    var qrcode = new QRCode("qrcode");
    //var socket = io('http://192.168.1.106:8080');

    var fondos = ["rose", "blue", "gray", "red", ""];
    var fondo = fondos[Math.floor(Math.random()*fondos.length)];

    $("body").addClass(fondo);
    $(".bienvenida p").html(today.toLocaleDateString("es-MX", options)); 
    
    qrcode.clear();
    let qr = localStorage.getItem("qrcode");
    qrcode.makeCode(`juan.com/${qr}`);
    $(".qr-contenido h5").html(qr);

    $(document).on("click", ".btn-qr", function () {
        
        $(".qr-contenido").toggleClass("activo");
        if(!$(".qr-contenido").hasClass("activo"))
            return false;

        
        
        
    });
    $(document).on("click", ".btn-search", function () {
        $(".buscador-input").toggleClass("activo");
    });
});
