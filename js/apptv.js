$(function () {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    var qrcode = new QRCode("qrcode");
    var socket = io('http://11.11.15.8:8080');

    var fondos = ["rose", "blue", "gray", "red", ""];
    var fondo = fondos[Math.floor(Math.random()*fondos.length)];

    $("body").addClass(fondo);
    $(".bienvenida p").html(today.toLocaleDateString("es-MX", options)); 

    $(document).on("click", ".btn-qr", function () {
        
        $(".qr-contenido").toggleClass("activo");
        if(!$(".qr-contenido").hasClass("activo"))
            return false;

        qrcode.clear();
        socket.emit("random", function(data){
            qrcode.makeCode(`juan.com/${data}`);
            $(".qr-contenido h5").html(data);
        });
        
    });
    $(document).on("click", ".btn-search", function () {
        $(".buscador-input").toggleClass("activo");
    });
});
