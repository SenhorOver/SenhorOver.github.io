class Main{
    constructor() {
        // HOME PAGE
        this.homeWords = ['FrontEnd.', 'Backend.', 'FullStack.']
        this.arrIndex = 0
        this.textInterval = null


        // NAVBAR PAGES
        this.pageNames = ['Home', 'Sobre', 'Habilidades', 'Experiência', 'Portfólio', 'Contato']
        this.pages = document.querySelectorAll('.content')


        // LIST PROJECTS
        this.projects = document.querySelectorAll('.proj')
        this.timeout = null
    }

    init() {
        this.cacheSelectors()
        this.bindEvents()
    }

    cacheSelectors() {
        // HEADER + NAVBAR


        // HOME PAGE
        this.writingText = document.querySelector('#writing-text');
        this.homeBtnContact = document.querySelector('.contact-navbar')


        // NAVBAR PAGES
        this.btnNavbar = document.querySelectorAll('.nav-button');



        // LIST PROJECTS
        this.btnFilter = document.querySelectorAll('.btn-filter')

        // CONTACT FORM
        this.form = document.querySelector('form')
    }

    bindEvents() {
         this.events().home.writing()

         this.homeBtnContact.onclick = this.events().navbarPages.btn_Click

         this.btnNavbar.forEach(button => {
            button.onclick = this.events().navbarPages.btn_Click
         })

         this.btnFilter.forEach(button => {
            button.onclick = this.events().listProjects.btnFilter_Click
         })

         this.form.onsubmit = this.events().contactForm.form_Submit
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
                },

                contactBtn_Click: e => {
                    e.preventDefault()
                    this.btnNavbar.forEach((button, index) => {
                        const span = button.firstElementChild.firstElementChild
                        if(span.classList.contains('btn-active')) return this.events().utils.rmAddClass(span, 'btn-active', true)
                        if(index === 5) this.events().utils.rmAddClass(span, 'btn-active', false)
                    })
                }
            },

            navbarPages: {
                btn_Click: (e) => {
                    const el = e.target
                    if(el.localName !== 'span' && !el.classList.contains('contact-navbar')) return
                    if(el.classList.contains('btn-active')) return
                    
                    this.btnNavbar.forEach((button, index) => {
                        const span = button.firstElementChild.firstElementChild
                        if(span.classList.contains('btn-active')) return this.events().utils.rmAddClass(span, 'btn-active', true)
                        if(index === 5 && el.classList.contains('contact-navbar')) this.events().utils.rmAddClass(span, 'btn-active', false)
                    })
                    !el.classList.contains('contact-navbar') ? el.classList.add('btn-active') : null
                    
                    let pageText = !el.classList.contains('contact-navbar') ? el.parentElement.nextElementSibling.innerHTML : 'Contato'
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

            listProjects: {
                btnFilter_Click: (e) => {
                    if(this.timeout) return
                    const el = e.target
                    this.btnFilter.forEach(btn => this.events().utils.rmAddClass(btn, 'active', true))

                    if(el.innerText === 'FrontEnd') {
                        this.projects.forEach(project => {
                            if(project.classList.contains('frontend')) {
                                this.events().utils.rmAddClass(project, 'abs', true)
                                this.events().utils.rmAddClass(project, 'filtred', true)
                                return
                            }

                            this.events().utils.rmAddClass(el, 'active', false)
                            this.events().utils.rmAddClass(project, 'filtred', false)
                            this.timeout = setTimeout(() => {
                                this.events().utils.rmAddClass(project, 'abs', false)
                                this.timeout = null
                            }, 400)
                        })
                        return
                    }

                    if(el.innerText === 'BackEnd') {
                        this.projects.forEach(project => {
                            if(project.classList.contains('backend')) {
                                this.events().utils.rmAddClass(project, 'abs', true)
                                this.events().utils.rmAddClass(project, 'filtred', true)
                                return
                            }
                            this.events().utils.rmAddClass(el, 'active', false)
                            this.events().utils.rmAddClass(project, 'filtred', false)
                            this.timeout = setTimeout(() => {
                                this.events().utils.rmAddClass(project, 'abs', false)
                                this.timeout = null
                            }, 400)
                        })
                        return
                    }

                    if(el.innerText === 'Destaques') {
                        this.projects.forEach(project => {
                            if(project.classList.contains('featured')) {
                                this.events().utils.rmAddClass(project, 'abs', true)
                                this.events().utils.rmAddClass(project, 'filtred', true)
                                return
                            }
                            this.events().utils.rmAddClass(el, 'active', false)
                            this.events().utils.rmAddClass(project, 'filtred', false)
                            this.timeout = setTimeout(() => {
                                this.events().utils.rmAddClass(project, 'abs', false)
                                this.timeout = null
                            }, 400)
                        })
                        return
                    }

                    this.events().utils.rmAddClass(el, 'active', false)
                    this.projects.forEach(project => {
                        this.events().utils.rmAddClass(project, 'abs', true)
                        this.events().utils.rmAddClass(project, 'filtred', true)
                    })
                }
            },

            contactForm: {
                form_Submit: (e) => {
                    e.preventDefault()

                    const email = this.form['email']
                    const subject = this.form['subject']
                    const body = this.form['body']

                    function mailto() {
                        window.location.href = `mailto:mrcsvs@outlook.com?body=${body.value}&subject=${subject.value}&email=${email.value}`
                    }

                    mailto()
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