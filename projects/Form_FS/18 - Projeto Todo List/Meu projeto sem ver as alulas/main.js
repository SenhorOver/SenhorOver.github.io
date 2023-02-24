(function(){
    let input = document.querySelector('.input')
    let tarefas = document.querySelector('.tarefas')

    document.addEventListener('click', function(e){
        const el = e.target
        if(el.classList.contains('botaoFeito') && el.classList.contains('ligado')){
            el.classList.remove('ligado')
            let div = el.querySelector('div')
            div.classList.remove('ligado')
            div.classList.remove('verde')
            let span = el.nextSibling
            span.style.textDecoration = 'none'
            return
        }

        if(el.classList.contains('verde') && el.classList.contains('ligado')){
            let botao = el.parentElement
            span = botao.nextSibling
            botao.classList.remove('ligado')
            span.style.textDecoration = 'none'
            el.classList.remove('ligado')
            el.classList.remove('verde')
            return
        }


        if(el.classList.contains('botaoFeito')){
            el.classList.add('ligado')
            controle = true
            let div = el.querySelector('div')
            div.classList.add('verde')
            div.classList.add('ligado')
            let span = el.nextSibling
            span.style.textDecoration = 'line-through'
        } 



        if(el.classList.contains('remover')){
            el.parentElement.remove()
            return
        }
        if(el.classList.contains('remover-span')){
            const valor = el.parentElement
            valor.parentElement.remove()
            return
        }
    })


    input.addEventListener('keypress',function(e){
        if(e.keyCode === 13){
            if(input.value){
                criaTarefa(input.value)
            }
        }
    })

    function criaTag(tag){
        return document.createElement(tag)
    }

    function limpaInput(){
        input.value = ''
    }

    function criaTarefa(valor){
        let li = criaTag('li')
        let div1 = criaTag('div')
        let button1 = criaTag('button')
        let button2 = criaTag('button')
        let span = criaTag('span')
        let div2 = criaTag('div')
        let span2 = criaTag('span')

        span.innerHTML = valor
        span2.innerHTML = 'X'
        span2.classList.add('remover-span')
        button2.classList.add('remover')
        button1.classList.add('botaoFeito')
        
        button2.appendChild(span2)
        button1.appendChild(div2)
        div1.appendChild(button1)
        div1.appendChild(span)
        li.appendChild(div1)
        li.appendChild(button2)
        tarefas.appendChild(li)

        limpaInput()
    }
})()