class Main {
    init() {
        this.cacheSelectors()
        this.bindEvents()
    }

    cacheSelectors() {
        this.liCover = document.querySelectorAll('.preview')
        this.cardCover = document.querySelectorAll('.card-cover')
        this.liList = document.querySelector('.list-menu').children
    }
    
    bindEvents(){
        for(let li of this.liList) {
            console.log(li)
            li.onclick = this.events().liList_Click
        }

        this.liCover.forEach(li => {
            li.onclick = this.events().liPreview_Click
        })

        this.cardCover.forEach(cover => {
            cover.onclick = this.events().cardCover_Click
        })
    }

    events = () => {
        return {
            liPreview_Click: (e) => {
                const element = e.target.parentElement.parentElement.children[1]
                this.events().rmOrAddNone(element, true)
            },

            cardCover_Click: (e) => {
                if(!e.target.classList.contains('card-cover')) return
                this.events().rmOrAddNone(e.target, false)
            },

            liList_Click: (e) => {
                const el = e.target.innerText
                const projects = document.querySelector('.projects')

                for (let project of projects.children) {
                    if(el === 'Frontend'){
                        if (project.classList.contains('frontend')) {
                            this.events().rmOrAddNone(project, true)
                        } else {
                            this.events().rmOrAddNone(project, false)
                        }
                        continue
                    }

                    if(el === 'Backend'){
                        if (project.classList.contains('backend')) {
                            this.events().rmOrAddNone(project, true)
                        } else {
                            this.events().rmOrAddNone(project, false)
                        }
                        continue
                    }
                    this.events().rmOrAddNone(project, true)
                }
            },

            rmOrAddNone(el, bool) {
                if(bool) return el.classList.remove('none')
                return el.classList.add('none')
            }
        }
    }
}


const pageEvents = new Main()
pageEvents.init()