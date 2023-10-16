const express = require('express');

const app = express();
app.use(express.static('public'));
const path = require('path');

const ws = require('ws');

let USERNAMES = [];

app.get('/planetPage/:planet', (req,res) =>{
    res.sendFile('public\\planet.html?type=' + req.params['planet'], {root: __dirname});
})

app.get('/description/:planet', (req, res) => {
    const config = require(__dirname + '\\videos\\planets.json');
    res.send(config[req.params['planet']]['description'])
});

app.get('/video/:planet', (req, res) => {
    res.sendFile(__dirname + '/videos/' + req.params['planet'] + '.mp4');
});

app.get('/asset/:assetName', (req, res) => {
    res.sendFile(__dirname + '/assets/' + req.params['assetName']);
});

app.get('/messages/:planet', (req, res) => {
    res.send(messages[req.params['planet']]);
});



let CLIENTS = [];
let messages = {'sun': [], 'mercury': [], 'venus': [], 'earth': [], 'mars': [], 'jupiter': [], 'saturn': [], 'uranus': [], 'neptune': []};

const wsServer = new ws.Server({ noServer: true });

wsServer.on('connection', (socket, req) => {
    CLIENTS.push(socket);
    // for (let i = 0; i < messages.length; i++){
    //     socket.send(JSON.stringify(messages[i]))
    // }

    socket.on('message', message => {
        let m = message.toString('utf-8')
        let parsed = JSON.parse(m)
        messages[parsed[2]].push(parsed)
        for (let i = 0; i < CLIENTS.length; i++){
            if (CLIENTS[i] != socket){
                CLIENTS[i].send(JSON.stringify(parsed))
                console.log(parsed)
            }
        }
    })

    socket.on('close',  () => {
        console.log('user disconnect', CLIENTS.length)
        const index = CLIENTS.indexOf(socket);
        if (index > -1) {
            CLIENTS.splice(index, 1);
        }
    })
});

const server = app.listen(3000, () =>{
    console.log('http://localhost:3000/')
});

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});