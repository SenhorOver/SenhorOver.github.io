
class DarkMode{
    constructor(){
        this.topBg = document.querySelector('.background')
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

            this.colorChange.backgroundColors.bind(this)()

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

        backgroundColors(){
            console.log(this.topBg);
            if(!this.topBg.classList.contains('dark') && !this.topBg.classList.contains('white')){
                this.topBg.classList.add('dark')
                return
            }

            if(this.topBg.classList.contains('dark')){
                this.topBg.classList.remove('dark')
                this.topBg.classList.add('white')
                return
            }

            this.topBg.classList.remove('white')
            this.topBg.classList.add('dark')
        }
    }
}

const darkMode = new DarkMode()
darkMode.init()