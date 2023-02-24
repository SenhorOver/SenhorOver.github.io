
//Componentes = Cada parte terá um arquivo javascript com um objeto que o controlará
//esse objeto Main será o responsável por controlar toda a Lista de Tarefas

//Esse projeto funciona de uma forma diferente dos outros que um já fiz. (Não é um jeito certo,
// é só um jeito diferente de fazer, depende de cada um escolher o que é melhor para o seu projeto)

const Main = {


    init(){ // Responsável por iniciar tudo
        this.cacheSelectors()
        this.bindEvents()
    },

    cacheSelectors(){ // Responsável por selecionar elementos HTML e armazená-los em uma variável
        this.$checkButtons = document.querySelectorAll('.check')
        //Toda variável que armazena um elemento HTML - Coloque um cifrão (Boa prática)
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButtons = document.querySelectorAll('.remove')

    },

    bindEvents(){ // Responsável por adicionar eventos nos elementos HTML armazenados
        //const self = this //Uma maneiro de arrumar problema com o this, juncom com bind() e arrow function
        this.$checkButtons.forEach(button => {
            button.onclick = this.Events.checkButton_click
        })

        this.$inputTask.onkeypress = this.Events.inputTask_keypress.bind(this)
    
        this.$removeButtons.forEach(button => {
            button.onclick = this.Events.removeButton_click
        })
    },


    Events: {
        checkButton_click(e){
            const li = e.target.parentElement
            const isDone = li.classList.contains('done')

            if(!isDone){                
                return li.classList.add('done')
            }
            li.classList.remove('done')
        },

        inputTask_keypress(e){
            const key = e.key
            const value = e.target.value
            if(key === 'Enter'){
                this.$list.innerHTML += `  
                <li>
                    <div class="check"></div>
                    <label class="task">
                        ${value}
                    </label>
                    <button class="remove"></button>
                </li>
                `
                e.target.value = ''

                this.cacheSelectors()
                this.bindEvents()
            }
        },

        removeButton_click(e){
            const li = e.target.parentElement

            li.classList.add('removed')

            setTimeout(function(){
                li.classList.add('hidden')
            },300)
        }
    }

}

Main.init()