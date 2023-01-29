window.customElements.define(
    'progress-bar',
    class bar extends HTMLElement {
        constructor() {
            super()
        }

        render() {
            this.innerHTML = `
                <div id="widget" style="padding: 10px 0; box-sizing: border-box; width: ${this.width}; height: 35px;">
                    <div id="inactive" style="width: ${parseFloat(this.width) - 30}px; height: 20px; background: #DDDDDD; position: relative; top: 5px; left: 15px; order: 0; border-radius: 10px;">
                        <div id="progress" style="width: ${(100/(this.length-1)*(this.currentProgress-1))+(100/(this.length-1)*(this.progress/100))}%; height: 100%; background: ${this.colors.progress}; border-radius: 0 10px 10px 0; position: absolute; border-radius: 10px;"></div>
                        <div id="active" style="width: ${this.active}%; height: 100%; background: ${this.colors.active}; border-radius: 0 10px 10px 0; position: absolute; border-radius: 10px;"></div>
                    </div>
                    <div id="dots" style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; position: relative; width: ${this.width}px; order: 1; bottom: 20px"></div>
                </div>
            `

            const dots = document.getElementById('dots')

            if (this.active < 100) {
                for (let i = 1; i <= this.length; i++) {
                    const dot = document.createElement('div')
                    dot.id = `dot${i}`
                    dot.style.boxSizing = 'border-box'
                    dot.style.display = 'flex'
                    dot.style.justifyContent = 'center'
                    dot.style.alignItems = 'center'
                    dot.style.width = '30px'
                    dot.style.height = '30px'
                    dot.style.borderRadius = '50%'
                    if (this.currentActive >= i) {
                        dot.style.background = this.colors.active
                        dot.style.border = '1px solid #FFFFFF'
                    } else if (this.currentProgress >= i) {
                        dot.style.background = this.colors.progress
                        dot.style.border = `1px solid #FFFFFF`
                    } else {
                        dot.style.background = '#FFFFFF'
                        dot.style.border = `1px solid ${this.colors.inactive}`
                    }

                    const num = document.createElement('p')
                    num.id = `text${i}`
                    num.innerText = i.toString()
                    num.style.margin = '0'
                    num.style.fontFamily = 'Inter'
                    num.style.fontSize = '12px'
                    num.style.lineHeight = '15px'
                    num.style.fontWeight = '500'

                    dot.appendChild(num)
                    dots.appendChild(dot)
                }
            } else {
                const dot = document.createElement('div')
                dot.id = `dot`
                dot.style.boxSizing = 'border-box'
                dot.style.display = 'flex'
                dot.style.justifyContent = 'center'
                dot.style.alignItems = 'center'
                dot.style.width = '30px'
                dot.style.height = '30px'
                dot.style.borderRadius = '50%'
                dot.style.background = this.colors.active
                dot.style.border = '1px solid #FFFFFF'
                dot.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 20px; height: 20px;"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>'
                dots.style.justifyContent = 'center'

                dots.appendChild(dot)
            }
        }

        connectedCallback() {
            this.colors = {
                active: this.hasAttribute('activeColor') ? this.getAttribute('activeColor') : '#00CE08',
                inactive: this.hasAttribute('inactive') ? this.getAttribute('inactive') : '#DDDDDD',
                progress: this.hasAttribute('progressColor') ? this.getAttribute('progressColor') : '#FF9900'
            }
            this.length = this.hasAttribute('length') ? this.getAttribute('length') : '5'
            this.progress = this.hasAttribute('progress') ? this.getAttribute('progress') : '0'
            this.width = this.hasAttribute('width') ? this.getAttribute('width') : '300'
            this.active = this.hasAttribute('active') ? this.getAttribute('active') : '0'
            this.currentActive = this.hasAttribute('currentActive') ? this.getAttribute('currentActive') : '0'
            this.currentProgress = this.hasAttribute('currentProgress') ? this.getAttribute('currentProgress') : '0'

            if (!this.rendered) {
                this.render();
                this.rendered = true;
            }
        }

        static get observedAttributes() {
            return ['progress', 'active', 'currentActive', 'currentProgress']
        }

        attributeChangedCallback(name, oldValue, newValue) {
            this.render();
        }
    }
)