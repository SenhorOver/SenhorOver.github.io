(function(){

const buttons = document.querySelector('.buttons')
const scores = document.querySelectorAll('.score')
const submit = document.querySelector('.submit')
const containers = document.querySelectorAll('.container')
let test

buttons.addEventListener('click', e => {
    const el = e.target
    if(el.classList.contains('score')){
        scores.forEach(value => value.classList.remove('pressed'))
        el.classList.add('pressed')
        test = el.innerText
    }
})

submit.addEventListener('click', () => {
    if(test){
        const score = document.querySelector('.selectedScore')
        containers[0].classList.add('none')
        containers[1].classList.remove('none')
        score.innerText = `You selected ${test} out of 5`
    }
})
})()