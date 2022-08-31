(function(){

const buttons = document.querySelector('.buttons')
const scores = document.querySelectorAll('.score')
const submit = document.querySelector('.submit')

buttons.addEventListener('click', e => {
    const el = e.target
    if(el.classList.contains('score')){
        scores.forEach(value => value.classList.remove('pressed'))
        el.classList.add('pressed')
    }
})

submit.addEventListener('click', e => {
    
})
})()