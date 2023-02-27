
//Componentes = Cada parte terá um arquivo javascript com um objeto que o controlará
//esse objeto Main será o responsável por controlar toda a Lista de Tarefas

//Esse projeto funciona de uma forma diferente dos outros que um já fiz. (Não é um jeito certo,
// é só um jeito diferente de fazer, depende de cada um escolher o que é melhor par o seu projeto)

const Main = {

    init(){ // Responsável por iniciar tudo
        this.getLocalStorage()
        this.cacheSelectors()
        this.bindEvents()
        this.setLocalStorage(this.$listItems)
    },

    cacheSelectors(){ // Responsável por selecionar elementos HTML e armazená-los em uma variável
        this.$checkButtons = document.querySelectorAll('.check')
        //Toda variável que armazena um elemento HTML - Coloque um cifrão (Boa prática)
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButtons = document.querySelectorAll('.remove')
        this.$listItems = document.querySelectorAll('li')

    },

    bindEvents(){ // Responsável por adicionar eventos nos elementos HTML armazenados
        //const self = this //Uma maneiro de arrumar problema com o this, junto com bind(this) e arrow function
        this.$checkButtons.forEach(button => {
            button.onclick = this.Events.checkButton_click.bind(this)
        })
        
        this.$inputTask.onkeypress = this.Events.inputTask_keypress.bind(this)
        
        this.$removeButtons.forEach(button => {
            button.onclick = this.Events.removeButton_click.bind(this)
        })        

    },

    getLocalStorage(){
        this.cacheSelectors()
        let items = localStorage.getItem('lista')
        items = JSON.parse(items)
        if(!items) return
        items.forEach(item => {
            if(item.done){
                this.$list.innerHTML += this.criarEstrutura(item.item, "done")
            } else{
                this.$list.innerHTML += this.criarEstrutura(item.item)
            }
        })
    },

    setLocalStorage(li){
        const lis = []
        li.forEach(valor => {
            if(!valor.classList.contains('removed')){
                if(valor.classList.contains('done')){
                    lis.push({item: valor.children[1].innerText, done: true})
                } else{
                    lis.push({item: valor.children[1].innerText, done: false})
                }
            }
        })
        const lisJSON = JSON.stringify(lis)
        localStorage.setItem('lista', lisJSON)
    },


    Events: {
        checkButton_click(e){
            const li = e.target.parentElement
            const isDone = li.classList.contains('done')

            if(!isDone){ 
                li.classList.add('done')
                this.cacheSelectors()
                this.bindEvents()
                this.setLocalStorage(this.$listItems)
                return 
            }
            li.classList.remove('done')
            this.cacheSelectors()
            this.bindEvents()
            this.setLocalStorage(this.$listItems)

        },

        inputTask_keypress(e){
            const key = e.key
            const value = e.target.value
            if(key === 'Enter'){
                if(value){
                    this.$list.innerHTML += this.criarEstrutura(value)
                    e.target.value = ''
                    this.cacheSelectors()
                    this.bindEvents()
                    this.setLocalStorage(this.$listItems)
                }
            }
        },

        removeButton_click(e){
            const li = e.target.parentElement

            li.classList.add('removed')

            setTimeout(function(){
                li.classList.add('hidden')
            },300)

            this.cacheSelectors()
            this.bindEvents()
            this.setLocalStorage(this.$listItems)
        }
    },
    criarEstrutura(content, done){
        if(done){
            return `  
            <li class="${done}">
                <div class="check"></div>
                <label class="task">
                    ${content}
                </label>
                <button class="remove"></button>
            </li>
            `
        }
        return `  
        <li>
            <div class="check"></div>
            <label class="task">
                ${content}
            </label>
            <button class="remove"></button>
        </li>
        `
    }
}

Main.init()