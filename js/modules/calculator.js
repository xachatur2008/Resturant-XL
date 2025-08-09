function calculator(){
     const result = document.querySelector(".calculating__result span"),
          menuType = document.querySelector(".menu-type")
   
    let sex, height, weight, age, ratio;
    
    function initLocalSettings(selector, activeClass){
        const elements = document.querySelectorAll(selector)
        
        elements.forEach(element =>{
            element.classList.remove(activeClass);
            if(element.getAttribute('id') === localStorage.getItem('sex')){
                element.classList.add(activeClass)
            }
            if(element.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                element.classList.add(activeClass)
            }
        })
    }

    
    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex')
    }else{
        sex = 'female'
        localStorage.setItem('sex', 'female')
    }

    
    if(localStorage.getItem('ratio')){
        ratio = +localStorage.getItem('ratio')
    }else{
        ratio = 1.375
        localStorage.setItem('ratio', 1.375)
    }

    function calcTotal(){
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent = '____'
            menuType.textContent = ''
            return;
        }

        if(sex === 'female'){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
        }else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
        }

        let calories = +result.textContent
        const menu = getMenuByCalories(calories);
        document.querySelector('.menu-type').textContent = `Рекомендуемое меню: ${menu}`;
    }

    calcTotal()

    function getStaticData(parentSelector, activeClass){
        const elements = document.querySelectorAll(`${parentSelector} div`);

        document.querySelector(parentSelector).addEventListener('click', (e) => {
            if(e.target.classList.contains('calculating__choose-item')){
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio')
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
                }else{
                    sex = e.target.getAttribute('id')
                    localStorage.setItem('sex', e.target.getAttribute('id'))
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass)
                })
                e.target.classList.add(activeClass)
            }
              calcTotal()
        })
    }

    function getDynamicData(selector){
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)){
                input.style.border = '1px solid red'
            }else{
              input.style.border = 'none'  
            }

            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value
                    break;
                case 'weight':
                    weight = +input.value
                    break;
                case 'age':
                    age = +input.value
                    break;
            }
              calcTotal()
        })
    }

    function getMenuByCalories(calories) {
        if (calories < 1800) {
            return 'Фитнес';
        } else if (calories >= 1800 && calories <= 2500) {
            return 'Сбалансированное';
        } else {
            return 'Премиум';
        }
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big ', 'calculating__choose-item_active');

    getDynamicData('#height')
    getDynamicData('#weight')
    getDynamicData('#age')

    getStaticData('#gender', 'calculating__choose-item_active');
    getStaticData('.calculating__choose_big', 'calculating__choose-item_active');

}

export default calculator