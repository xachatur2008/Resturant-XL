window.addEventListener("DOMContentLoaded", () => {

            //---------------TABS---------------

    const tabs = document.querySelectorAll(".tabheader__item"),
          tabsContent = document.querySelectorAll(".tabcontent"),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent(){
        tabsContent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show', 'fade')
        })

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade')
        tabsContent[i].classList.remove('hide')
        tabs[i].classList.add('tabheader__item_active')
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if(target && target.classList.contains("tabheader__item")){
            tabs.forEach((item, i) => {
                if(target === item){
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })

                    //---------------TIMER---------------
    
    const deadline = "2025-07-20"

    function getTimeRemaining(endtime){
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date())
        
        if(t <= 0){
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        }else{
            days = Math.floor(t / (1000 * 60 * 60 * 24))
            hours = Math.floor(t / ( 1000 * 60 * 60) % 24)
            minutes = Math.floor((t / 1000 / 60) % 60)
            seconds = Math.floor((t / 1000) % 60 )
        }

        return{
            'total': t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };    
    }

    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`
        }else{
            return num;
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000) 
            
        updateClock()

        function updateClock(){
            const t = getTimeRemaining(endtime)
        
            days.innerHTML = getZero(t.days)
            hours.innerHTML = getZero(t.hours)
            minutes.innerHTML = getZero(t.minutes)
            seconds.innerHTML = getZero(t.seconds)
        }
    }

    setClock('.timer', deadline);

            //---------------MODAL---------------

    const openBtns = document.querySelectorAll('[data-modal]'),
          modalWindow = document.querySelector('.modal')

    
    function showModal(){
        modalWindow.classList.add('show')
        modalWindow.classList.remove('hide')
        document.body.style.overflow = 'hidden'
        // clearInterval(modalTimerid)
    }

    function hideModal(){
        modalWindow.classList.add('hide')
        modalWindow.classList.remove('show')
        document.body.style.overflow = 'auto'
    }
    


    openBtns.forEach((button) => {
        button.addEventListener('click', showModal)
    })
    
    
    modalWindow.addEventListener('click', (e)=> {
        if(e.target === modalWindow || e.target.getAttribute('data-close') == ''){
           hideModal();
        }
    })


    document.addEventListener('keydown', (e) =>{
        if(e.code === "Escape" && modalWindow.classList.contains('show')){
            hideModal();
        }
    })

    // const modalTimerid = setTimeout(showModal, 3000)

     function byScroll(){
         if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
            showModal()
            window.removeEventListener('scroll', byScroll)
        }
    }

     // window.addEventListener('scroll', byScroll)





    // ------------------------class for cards------------------------

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSlector, ...classes){
            this.src = src;
            this.alt = alt
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSlector);
            this.transfer = 100;
        }

        changeToAMD(){
            this.price =  this.price * this.transfer
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

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        12,
        '.menu .container',
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
        15,
        '.menu .container',
    ).render();

    //Forms

    const forms = document.querySelectorAll('form'),
          message = {
            loading: 'img/form/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
          }

    forms.forEach(item => {
        postData(item)
    })      

   function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        // form.append(statusMessage);
        form.insertAdjacentElement('afterend', statusMessage)

        const formData = new FormData(form);

        const object = {};

        formData.forEach(function(value, key){
            object[key] = value;
        })


        fetch('server.php', {
            method: "POST",
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(object)
        })
        .then(data => data.text())
        .then(data => {
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove();
        }).catch(() =>{
            showThanksModal(message.failure);
        }).finally(() => {
            form.reset()
        })
  
      });
    }

    function showThanksModal(message){
        
        const prevDialog = document.querySelector('.modal__dialog')
        prevDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class = "modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            prevDialog.classList.add('show');
            prevDialog.classList.remove('hide');
            hideModal();
        }, 4000)
    }
});