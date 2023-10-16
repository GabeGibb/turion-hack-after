
localStorage.setItem('username', name)


document.getElementById('username').addEventListener('keypress', function(e){
    if (e['key'] == 'Enter'){
        setUserName();
    }
})

function setUserName(){
    let elem = $('#username')
    let name = elem.val()
    localStorage.setItem('username', name)
    console.log(localStorage.getItem('username'))
    window.location.href = 'index.html';
}