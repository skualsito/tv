function crearLoading(){
    jQuery("body").prepend(`
    <style>
        #cargador {
            position: fixed;
            z-index: -1;
            background: #282828;
            width: 100%;
            height: 100%;
            text-align: center;
            opacity: 0;
            -webkit-transition: all .5s ease-in-out;
            -moz-transition: all .5s ease-in-out;
            -o-transition: all .5s ease-in-out;
            transition: all .5s ease-in-out;
        }
        #cargador.activo {
            z-index: 9999;
            opacity: 1;
        }
        #cargador .lds-ellipsis {
            position: absolute;
            left: calc(50% - 32px);
            top: calc(50% - 32px);
        }
        .lds-ellipsis {
            display: inline-block;
            position: relative;
            width: 64px;
            height: 64px;
        }
        .lds-ellipsis div {
            position: absolute;
            top: 27px;
            width: 11px;
            height: 11px;
            border-radius: 50%;
            background: #fff;
            animation-timing-function: cubic-bezier(0, 1, 1, 0);
        }
        .lds-ellipsis div:nth-child(1) {
            left: 6px;
            animation: lds-ellipsis1 0.6s infinite;
        }
        .lds-ellipsis div:nth-child(2) {
            left: 6px;
            animation: lds-ellipsis2 0.6s infinite;
        }
        .lds-ellipsis div:nth-child(3) {
            left: 26px;
            animation: lds-ellipsis2 0.6s infinite;
        }
        .lds-ellipsis div:nth-child(4) {
            left: 45px;
            animation: lds-ellipsis3 0.6s infinite;
        }
        @keyframes lds-ellipsis1 {
            0% {
                transform: scale(0);
            }
            100% {
                transform: scale(1);
            }
        }
        @keyframes lds-ellipsis3 {
            0% {
                transform: scale(1);
            }
            100% {
                transform: scale(0);
            }
        }
        @keyframes lds-ellipsis2 {
            0% {
                transform: translate(0, 0);
            }
            100% {
                transform: translate(19px, 0);
            }
        }
        </style>
    <div id="cargador" class="activo"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>
    `);
}


function appCargador(t = true) {

    if(!t){
      jQuery("#cargador").removeClass("activo");
    } else {
      jQuery("#cargador").addClass("activo");
    }
  }
function initLoadingo(){
    if(!jQuery("#cargador").length){
        crearLoading();
    } else {
        appCargador(true);
    }
}

initLoadingo();