
class DarkMode{
    constructor(){
        this.topBg = document.querySelector('.background')
        this.h1 = document.querySelector('h1')
        this.body = document.querySelector('body')
        this.topCards = document.querySelectorAll('.topCards')
        this.overview = document.querySelector('.overview')
    }

    init(){
        this.selectors()
        this.bindEvent()
    }

    selectors(){
        this.button = document.querySelector('#dark-mode')
    }

    bindEvent(){
        this.button.onclick = this.Events.buttonClick_changeMode.bind(this)
    }

    Events = {
        buttonClick_changeMode(e){
            const el = e.target
            
            this.colorChange.buttonColor(el)

            this.colorChange.bodyColor.bind(this)()

            this.colorChange.bgTop.bind(this)()

            this.colorChange.h1Title.bind(this)()

            this.colorChange.topCardsColor.bind(this)()

            this.colorChange.overviewDark.bind(this)()
        }
    }
    
    colorChange = {
        buttonColor(el){
            if(!el.classList.contains('dark') && !el.classList.contains('white')){
                el.classList.add('dark')
                return
            }

            if(el.classList.contains('dark')){
                el.classList.remove('dark')
                el.classList.add('white')
                return
            }

            el.classList.remove('white')
            el.classList.add('dark')
        },

        bodyColor(){
            if(this.body.classList.contains('dark')){
                this.body.classList.remove('dark')
                return
            }
            this.body.classList.add('dark')
        },

        bgTop(){
            if(this.topBg.classList.contains('dark')){
                this.topBg.classList.remove('dark')
                return
            }
            this.topBg.classList.add('dark')
        },

        h1Title(){
            if(this.h1.classList.contains('dark')){
                this.h1.classList.remove('dark')
                return
            }
            this.h1.classList.add('dark')
        },

        topCardsColor(){
            this.topCards.forEach(el => {
                if(el.classList.contains('dark')){
                    el.classList.remove('dark')
                    return
                }
                el.classList.add('dark')
            });
        },

        overviewDark(){
            if(this.overview.classList.contains('dark')){
                this.overview.classList.remove('dark')
                return
            }
            this.overview.classList.add('dark')
        }
    }
}

const darkMode = new DarkMode()
darkMode.init()