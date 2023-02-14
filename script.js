class Main {
    init() {
        this.cacheSelectors()
        this.bindEvents()
    }

    cacheSelectors() {
        this.liCover = document.querySelectorAll('.preview')
        this.cardCover = document.querySelectorAll('.card-cover')
    }

    bindEvents(){
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


            rmOrAddNone(el, bool) {
                if(bool) return el.classList.remove('none')
                return el.classList.add('none')
            }
        }
    }
}


const pageEvents = new Main()
pageEvents.init()