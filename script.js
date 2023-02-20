class Main{
    constructor() {
        // HOME PAGE
        this.homeWords = ['FrontEnd.', 'Backend.', 'FullStack.']
        this.arrIndex = 0
        this.textInterval = null


        // NAVBAR PAGES
        this.pageNames = ['Home', 'Sobre', 'Habilidades', 'Experiência', 'Portfólio', 'Contato']
        this.pages = document.querySelectorAll('.content')
    }

    init() {
        this.cacheSelectors()
        this.bindEvents()
    }

    cacheSelectors() {
        // HEADER + NAVBAR


        // HOME PAGE
        this.writingText = document.querySelector('#writing-text');


        // NAVBAR PAGES
        this.btnNavbar = document.querySelectorAll('.nav-button');
    }

    bindEvents() {
         this.events().home.writing()

         this.btnNavbar.forEach(button => {
            button.onclick = this.events().navbarPages.btn_Click
         })
    }

    events() {
        return {
            home: {
                writing: () => {
                    clearInterval(this.textInterval)
                    let index = 0
                    this.textInterval = setInterval(() => {
                        if(this.homeWords[this.arrIndex][index]) {
                            this.writingText.innerText += this.homeWords[this.arrIndex][index]
                            return index++
                        } 
                        
                        this.arrIndex++
                        if(this.arrIndex > 2) this.arrIndex = 0;
                        this.events().home.deleting()
                    }, 150)
                },

                deleting: () => {
                    clearInterval(this.textInterval)
                    let index = this.writingText.innerText.length - 1
                    setTimeout(() => {
                        this.textInterval = setInterval(() => {
                            this.writingText.innerText = this.writingText.innerText.slice(0, index)
                            index--
                            if(index < 0) {
                                this.events().home.writing()
                            }
                        },70)
                    }, 400)
                }
            },

            navbarPages: {
                btn_Click: (e) => {
                    const el = e.target
                    if(el.localName !== 'span') return
                    if(el.classList.contains('active')) return

                    this.btnNavbar.forEach(button => {
                        const span = button.firstElementChild.firstElementChild
                        if(span.classList.contains('btn-active')) return this.events().utils.rmAddClass(span, 'btn-active', true)
                    })
                    el.classList.add('btn-active')

                    const pageText = e.target.parentElement.nextElementSibling.innerText
                    const indexPage = this.pageNames.indexOf(pageText)
                    this.pages.forEach((page, index) => {
                        if(index < indexPage) {
                            this.events().utils.rmAddClass(page, 'page-up', false)
                        }

                        if(index >= indexPage) {
                            this.events().utils.rmAddClass(page, 'page-up', true)
                        }
                    })
                }
            },





            utils: {
                rmAddClass: (el, className, rm) => {
                    if(rm) return el.classList.remove(className)
                    el.classList.add(className)
                }
            }

        }
    }
}

const main = new Main()
main.init()