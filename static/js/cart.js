var empty = document.getElementById('empty')

if(empty!=undefined){
    buy.classList.add('empty')
}
else{
    var title = document.getElementsByClassName('title')

    for(let i=0; i<title.length; i++){
        var elem = String(title[i].innerHTML)
        title[i].innerHTML = ''

        flag = 0
        while(true){
            var pos = elem.indexOf('&lt;br&gt;', flag)
            if(pos == -1){
                title[i].innerHTML += elem.slice(flag)
                break
            }
            title[i].innerHTML += elem.slice(flag, pos)
            title[i].innerHTML += '<br>'

            flag = 10 + pos
        }
    }
}