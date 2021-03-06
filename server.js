var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const ovr = io.of('/overview');
const sbt = io.of('/submit')




app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/overview', function (req, res) {
    res.sendFile(__dirname + '/public/overview.html');
});
app.get('/submit', function (req, res) {
    res.sendFile(__dirname + '/public/submit.html');
});


ovr.on('connect', function (socket) {
    console.log(socket.id, "has joind: Overview")
    socket.join('overview')

})


sbt.on('connect', function (socket) {
    socket.join('submit')
    console.log(socket.id, "has joind: Submit")

    socket.on('uploadLog', function (titel, msg, tags) {
        console.log(titel, msg, tags)
        ovr.to('overview').emit('buildLog', titel, msg, tags)
    })

})


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
})