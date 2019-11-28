$(".button-nfplayerPause").trigger("click");
$(".button-nfplayerSubtitles").trigger("click");
var arrayAudio = [];
$(".track-list-audio li.track").map(function(a, b){
    arrayAudio.push({nombre: $(this).text(), uia: $(this).attr("data-uia"), selected: ($(this).hasClass("selected")) ? 1 : 0});
});
var arrayTexto = [];
$(".track-list-subtitles li.track").map(function(a, b){
    arrayTexto.push({nombre: $(this).text(), uia: $(this).attr("data-uia"), selected: ($(this).hasClass("selected")) ? 1 : 0});
});

var resultado = [{titAud: $(".track-list-audio h3").text(), audio: arrayAudio, titTex: $(".track-list-subtitles h3").text(), textos: arrayTexto}];
resultado