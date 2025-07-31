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






            //------------------------TIMER------------------------
    
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

    //creating card: request - fetch
    const getResource = async (url) =>{
        const res = await fetch(url)
        if(!res.ok){
            throw new Error(`Something is wrong with fetch ${url}, status: ${res.status}`)
        }

        return await res.json(); 
   };

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




//-----------------------------Forms-----------------------------

    const forms = document.querySelectorAll('form'),
          message = {
            loading: 'img/form/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
          }

    forms.forEach(item => {
        bindpostData(item)
    })      

   const postData = async (url, data) =>{
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        return await res.json(); 
   };
    
   function bindpostData(form) {
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

       const json = JSON.stringify(Object.fromEntries(formData.entries()));


        postData('http://localhost:3000/requests', json)
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






    //-------------------------------------Slider-------------------------------------

    const slides = document.querySelectorAll(".offer__slide"),
          current = document.querySelector("#current"),
          total = document.querySelector('#total')
          next = document.querySelector(".offer__slider-next"),
          prev = document.querySelector(".offer__slider-prev");

   
    let slideIndex = 0;

    if(slides.length < 10){
        total.textContent = `0${slides.length}`
    }else{
        total.textContent = slides.length
    }
    
    function hideSlide(){
        slides.forEach((item) =>{
            item.classList.add('hide')
            item.classList.remove('show')
        })
    }

    function showSlide(i = 0){
        slides[i].classList.add('show')
        slides[i].classList.remove('hide')
        if(slides.length < 10){
            current.textContent = `0${i + 1}`
        }else{
            current.textContent = i + 1
        }
    }

    hideSlide()
    showSlide();

    next.addEventListener('click', ()=>{
        slideIndex++;
        if(slideIndex >= slides.length){
            slideIndex = 0
        }
        hideSlide()
        showSlide(slideIndex)
    })

    prev.addEventListener('click', ()=>{
        slideIndex--;
        if(slideIndex < 0){
            slideIndex = 3;
        }
        hideSlide()
        showSlide(slideIndex)
    })

});

 