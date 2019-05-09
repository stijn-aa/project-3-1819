var socket = io();


(function () {



    socket.on('buildLog', function (titel, msg, tags) {
        buildLog(titel, msg, tags)
     
    })

}());

function buildLog(titel, msg, tags){

    console.log(titel, msg, tags)
}