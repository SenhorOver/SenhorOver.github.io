
const Main = {
    mobileMenu: document.querySelector('.bg'),
    transparentBg: document.querySelector('.transparent-bg'),
    openMobileSubmenu: document.querySelector('#features'),
    openMobileSubmenu1: document.querySelector('#company'),
    mobileSubMenu: document.querySelectorAll('.submenu'),


    init(){
        this.selectors()
        this.events()
    },

    selectors(){
        this.closeMenu = document.querySelector('#close-menu')
        this.openMenu = document.querySelector('#open-menu')
        this.mobileFeatures = document.querySelector('#features-click')
        this.mobileCompany = document.querySelector('#company-click')
    },

    events(){
        this.closeMenu.onclick = this.Events.svgClick_OpenCloseMenu.bind(this)
        this.openMenu.onclick = this.Events.svgClick_OpenCloseMenu.bind(this)
        this.mobileFeatures.onclick = this.Events.mobileClick_CollapsedExpanded.bind(this)
        this.mobileCompany.onclick = this.Events.mobileClick_CollapsedExpanded.bind(this)
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

        mobileClick_CollapsedExpanded(e){
            let num = 1
            const el = e.target
            try{
                const pai = el.nextSibling.nextSibling.children
                const subMenu = el.nextSibling.nextSibling
                if(el.classList.contains('closed')){
                    el.classList.remove('removed')
                    el.classList.add('open')
                    subMenu.classList.remove('none')
                    console.log(subMenu);
                    for(let i of pai){
                        i.style.transformOrigin = 'top center;'
                        i.style.animation = `slideDown 300ms ${num * 60}ms ease-in-out forwards`
                        i.classList.remove('none')
                        num++
                    }
                    return el.classList.remove('closed')
                }
                for(let i of pai){
                    i.style.transformOrigin = 'top center;'
                    i.style.animation = `slideUp 300ms ${num * 60}ms ease-in-out forwards`
                    num--
                }
                el.classList.add('removed')
                el.classList.remove('open')
                setTimeout(function(){
                    subMenu.classList.add('none')
                }, 200)
                return el.classList.add('closed')
                
            } catch(e){}
            
        },
    }
}

Main.init()