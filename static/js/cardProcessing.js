var btn = ''
$('button[value="minus"]').on("click", function(){
    btn = 'minus'
})
$('button[value="plus"]').on("click", function(){
    btn = 'plus'
})
if(window.location.pathname == '/cart'){
    $('button[value="del"]').on("click", function(){
        btn = 'del'
    })
}

$('form').submit(function(event){
    event.preventDefault();
    let th = $(this);

    let name = th.find('input[name="name"]').val()
    let title = th.find('input[name="title"]').val()
    let price = th.find('input[name="price"]').val()
    let img = th.find('input[name="img"]').val()

    $.ajax({
        url: window.location.pathname,
        type: 'POST',
        data: {
            'name': name,
            'title': title,
            'price': price,
            'img': img,
            'btn': btn,
        },
        success: function(){
            let count = th.find('.out').text()
            count = Number(count)
            if(window.location.pathname == '/cart'){
                var item = $('#itemP').text()
                item = item.substring(0, item.length - 10);
                item = Number(item)

                var totalPrice = $('#priceP').text()
                totalPrice = totalPrice.substring(0, totalPrice.length - 13);
                totalPrice = Number(totalPrice)


                var title = th.find('.title').text()
                var price = title.substring(title.indexOf('\n',1)+1, title.indexOf(' руб',1))
                price = Number(price)
            }

            if(btn == 'minus' && count > 0){
                count -= 1
                if(window.location.pathname == '/cart'){
                    item = item - 1
                    item = String(item)+' предметов'
                    $('#itemP').text(item)

                    totalPrice = totalPrice - price
                    totalPrice = String(totalPrice)+' руб к оплате'
                    $('#priceP').text(totalPrice)
                }
            }
            if(btn == 'plus'){
                count += 1
                if(window.location.pathname == '/cart'){
                    item = item + 1
                    item = String(item)+' предметов'
                    $('#itemP').text(item)

                    totalPrice = totalPrice + price
                    totalPrice = String(totalPrice)+' руб к оплате'
                    $('#priceP').text(totalPrice)
                }
            }
            if(btn == 'minus' && count == 0 && window.location.pathname == '/cart'){
                th.remove()
                var cardList = document.getElementsByClassName('card')
                if(cardList.length == 0){
                    $('#cards').remove()
                    buy.classList.add('empty')
                    body.innerHTML += '<div class="emptyBody" id="empty"><p>вы пока ничего не выбрали</p><p>перейдите в каталог</p><a href="/galary">В КАТАЛОГ</a></div>'
                }
            }
            th.find('.out').text(count)
            
        }
    })  
})