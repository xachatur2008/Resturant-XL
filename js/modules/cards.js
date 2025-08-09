function cards(){
     class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 380;
        }

        changeToAMD(){
            this.price =  Math.floor(this.price * this.transfer)
        }

        render(){
            this.changeToAMD();
            
            const element = document.createElement('div');
            if(this.classes.length === 0){
                this.element = 'menu__item'
                element.classList.add(this.element)
            } else{
                this.classes.forEach(className => element.classList.add(className))
            }
            
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> АМД/день</div>
                </div>
            `
            this.parent.append(element)
        }
    }

    //    getResource('http://localhost:3000/menu')
    //         .then(data => {
    //             data.forEach(({img, altImg, title, descr, price}) => {
    //                 new MenuCard(img, altImg, title, descr, price, '.menu .container').render();
    //             })
    //         })

    //creating card: request - axios

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altImg, title, descr, price}) => {
                new MenuCard(img, altImg, title, descr, price, '.menu .container').render()
            })
        })
}

export default cards;