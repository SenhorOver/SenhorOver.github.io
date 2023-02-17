class Main{
    constructor() {
        // HOME PAGE
        this.homeWords = ['FrontEnd.', 'Backend.', 'FullStack.']
        this.arrIndex = 0
        this.textInterval = null
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
    }

    bindEvents() {
         this.events().home.writing()
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
            }

        }
    }
}

const main = new Main()
main.init()