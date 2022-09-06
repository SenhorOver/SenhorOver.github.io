
const Main = {
    mobileMenu: document.querySelector('.bg'),
    transparentBg: document.querySelector('.transparent-bg'),

    init(){
        this.selectors()
        this.events()
    },

    selectors(){
        this.closeMenu = document.querySelector('#close-menu')
        this.openMenu = document.querySelector('#open-menu')
        this.mobileFeatures = document.querySelector('#features')
    },

    events(){
        this.closeMenu.onclick = this.Events.svgClick_OpenCloseMenu.bind(this)
        this.openMenu.onclick = this.Events.svgClick_OpenCloseMenu.bind(this)
        this.mobileFeatures.onclick = this.Events.mobileClick_CollapsedExpanded.bind(this)
    
    },

    Events: {
        svgClick_OpenCloseMenu(){ 
            this.transparentBg.classList.remove('none')
            this.mobileMenu.classList.remove('none')
            if(!this.mobileMenu.classList.contains('removed') && !this.mobileMenu.classList.contains('open')){
                this.transparentBg.classList.add('open')
                return this.mobileMenu.classList.add('open')
            }

            if(this.mobileMenu.classList.contains('removed')){
                this.mobileMenu.classList.remove('removed')
                this.mobileMenu.classList.add('open')
                this.transparentBg.classList.remove('removed')
                return this.transparentBg.classList.add('open')
            }

            this.mobileMenu.classList.remove('open')
            this.mobileMenu.classList.add('removed')
            this.transparentBg.classList.remove('open')
            this.transparentBg.classList.add('removed')

            setTimeout(() => {
                this.transparentBg.classList.add('none')
                this.mobileMenu.classList.add('none')
            }, 300)
        },

        mobileClick_CollapsedExpanded(){
            
        },
    }
}

Main.init()