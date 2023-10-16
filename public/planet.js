const queryString = window.location.search;
const type = new URLSearchParams(queryString).get('type');
let user = localStorage.getItem('userName')

$('#planetName').text(type.toUpperCase())

$.get('description/' + type, function(data, status){
    $('#description').text(data)
})


var video = $('<video />', {
    id: 'video',
    src: 'video/' + type,
    type: 'video/mp4',
    controls: true
});
video.appendTo($('#mainContent'));

let url = new URL(document.location.href)
console.log(url)
let wsProtocol
if (url.protocol == "http:"){
    wsProtocol = 'ws://'
}
else{
    wsProtocol = 'wss://'
}
let wsUrl = wsProtocol + url.host
console.log(wsUrl)
client = new WebSocket(wsUrl);

client.onmessage = (event) => {
    console.log(event.data)
    let msg = JSON.parse(event.data);
    handleMessage(msg)

};

function handleMessage(msg){
    if(msg[2] != type){
        return;
    }
    if (msg[1] == localStorage.getItem('username')){
        addMessage(msg[0], true, localStorage.getItem('username'))
    }else{
        addMessage(msg[0], false, msg[1])
    }
}

function addMessage(msg, isUser = false, userName){
    let messages = $('#messages')
    let alignMessage = 'left'
    if (isUser){
        alignMessage = 'right'
    }
    let curMessage = $('<div class="message ' + alignMessage + '">'+userName +':<br>' + msg +'</div>')
    messages.prepend(curMessage)


}

document.getElementById('chatInput').addEventListener('keypress', function(e){
    if (e['key'] == 'Enter'){
        addMessage($('#chatInput').val(), true, localStorage.getItem('username'));
        client.send(JSON.stringify([$('#chatInput').val(), localStorage.getItem('username'), type]));
        $('#chatInput').val('')
    }
})


$.get('messages/'+type, function(data, status){
    for(let i =0; i < data.length; i++){
        handleMessage(data[i])
    }
})