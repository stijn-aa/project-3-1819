var socket = io('/overview');


(function () {



    socket.on('buildLog', function (titel, msg, tags) {
        console.log(titel, msg, tags)
        buildLog(titel, msg, tags)

    })

}());

function buildLog(titel, msg, tags) {



    //document.createElement("span")

    const log = document.querySelector("#logtable")
    log.insertAdjacentHTML("afterend", 
    `
    <div class="log">
        <span class="titel">${titel}</span>
        <span class="msg">${msg}</span>
        <span class="tag-team new">

        </span>
    </div>
    `
    )
    console.log(document.querySelector("span.new"))

    tags.forEach(element => {
        tagarea = document.querySelector("span.new")
        tagarea.insertAdjacentHTML("beforeend", 
        `
        <span class="overviewTag">${element}</span>`
        )
    });

    document.querySelector("span.new").classList.remove("new");

}