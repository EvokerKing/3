window.customElements.define(
    'progress-bar',
    class bar extends HTMLElement {
        constructor() {
            super()
        }

        render() {
            this.innerHTML = `
                <div id="widget" style="padding: 10px 0; box-sizing: border-box; width: ${this.width}px; height: 35px;">
                    <div id="inactive" style="width: ${parseFloat(this.width) - 30}px; height: 20px; background: #DDDDDD; position: relative; top: 5px; left: 15px; order: 0;">
                        <div id="progress" style="width: ${this.progress}%; height: 100%; background: ${this.colors.progress}; border-radius: 0 10px 10px 0; position: absolute;"></div>
                        <div id="active" style="width: ${this.active}%; height: 100%; background: ${this.colors.active}; border-radius: 0 10px 10px 0; position: absolute;"></div>
                    </div>
                    <div id="dots" style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; position: relative; width: ${this.width}px; order: 1; bottom: 20px"></div>
                </div>
            `

            const dots = document.getElementById('dots')

            if (this.progress < 100) {
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