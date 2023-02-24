class Main{
    constructor() {
        // HEADER + NAVBAR
        this.activeNav = false
        this.sideNav = document.querySelector('.side-menu')

        // HOME PAGE
        this.homeWords = ['FrontEnd.', 'Backend.', 'FullStack.']
        this.arrIndex = 0
        this.textInterval = null


        // NAVBAR PAGES
        this.pageNames = ['home', 'about', 'skills', 'resume', 'portfolio', 'contact']
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
        // BODY
        this.body = document.querySelector('body')

        // HEADER + NAVBAR
        this.menu = document.querySelector('.menu-toggle')
        this.sideBtnNavbar = document.querySelectorAll('.pages')
        this.mainTitle = document.querySelector('.main-title')

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
        this.body.onload = this.events().utils.body_Load

        this.menu.onclick = this.events().header.menuToggle_Click

        this.events().home.writing()

        this.homeBtnContact.onclick = this.events().navbarPages.btn_Click

        this.mainTitle.onclick = this.events().navbarPages.btn_Click

        this.btnNavbar.forEach(button => {
            button.onclick = this.events().navbarPages.btn_Click
        })

        this.sideBtnNavbar.forEach(button => {
            button.onclick = this.events().navbarPages.btn_Click
        })

        this.btnFilter.forEach(button => {
            button.onclick = this.events().listProjects.btnFilter_Click
        })

        this.form.onsubmit = this.events().contactForm.form_Submit
    }

    events() {
        return {
            header: {
                menuToggle_Click: (e) => {
                    const el = e.currentTarget
                    const [ham0, ham, ham1] = el.children
                    if(this.activeNav) {
                        this.events().utils.rmAddClass(ham, 'hidden', true)
                        this.events().utils.rmAddClass(ham0, 'Xrotate', true)
                        this.events().utils.rmAddClass(ham1, 'Xrotate1', true)
                        this.events().utils.rmAddClass(el, 'above-side', true)
                        this.events().utils.rmAddClass(this.sideNav, 'sideAnim', true)
                        this.activeNav = false
                        return
                    }
                    this.events().utils.rmAddClass(ham, 'hidden', false)
                    this.events().utils.rmAddClass(ham0, 'Xrotate', false)
                    this.events().utils.rmAddClass(ham1, 'Xrotate1', false)
                    this.events().utils.rmAddClass(el, 'above-side', false)
                    this.events().utils.rmAddClass(this.sideNav, 'sideAnim', false)
                    this.activeNav = true
                }
            },

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
                    const data = el.dataset
                    let page = null
                    for(let i in data) {
                        page = i
                    }
                    if(!page) return
                    if(el.classList.contains('btn-active')) return
                    
                    const indexPage = this.pageNames.indexOf(page)
                    
                    this.btnNavbar.forEach((button, index) => {
                        const span = button.firstElementChild.firstElementChild
                        if(index === indexPage) return this.events().utils.rmAddClass(span, 'btn-active', false)
                        if(span.classList.contains('btn-active')) return this.events().utils.rmAddClass(span, 'btn-active', true)
                    })

                    this.sideBtnNavbar.forEach((button, index) => {
                        const a = button.firstElementChild
                        if(index - 1 === indexPage) return this.events().utils.rmAddClass(a, 'btn-active', false)
                        if(a.classList.contains('btn-active')) return this.events().utils.rmAddClass(a, 'btn-active', true)
                    })                
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
                },

                body_Load: () => {
                    const pages = document.querySelectorAll('.pages-default')
                    pages.forEach(page => {
                        page.classList.remove('none')
                    })
                    this.cacheSelectors()
                    this.bindEvents()
                }
            }

        }
    }
}

const main = new Main()
main.init()