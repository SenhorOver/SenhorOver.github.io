const menu = document.querySelector('#menu')
const mobile = document.querySelector('.mobile-menu')

menu.addEventListener('click', function(){
    if(mobile.classList.contains('open')){
        mobile.classList.remove('open')
        return
    }
    mobile.classList.add('open')
})