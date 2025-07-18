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
        closeBtn = document.querySelector('[data-close]'),  
        modalWindow = document.querySelector('.modal'),
        submit = document.querySelector('.btn_dark'),
        input = document.querySelector('.modal__input')

    function showModal(){
        modalWindow.classList.add('show')
        modalWindow.classList.remove('hide')
        document.body.style.overflow = 'hidden'
        // clearInterval(modalTimerid)
    }

    function hideModal(){
        modalWindow.classList.add('hide')
        modalWindow.classList.remove('show')
        document.body.style.overflow = ''
    }
    


    openBtns.forEach((button) => {
        button.addEventListener('click', showModal)
    })
    
    closeBtn.addEventListener('click', hideModal)

    modalWindow.addEventListener('click', (e)=> {
        if(e.target === modalWindow){
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

    window.addEventListener('scroll', byScroll)
});