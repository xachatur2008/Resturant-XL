function showModal(modalSelector, modalTimerId){
    const modalWindow = document.querySelector(modalSelector)
    modalWindow.classList.add('show')
    modalWindow.classList.remove('hide')
    document.body.style.overflow = 'hidden'
    console.log(modalTimerId)
    if(modalTimerId){
        clearInterval(modalTimerId)
    }
}

function hideModal(modalSelector){
    const modalWindow = document.querySelector(modalSelector)
    modalWindow.classList.add('hide')
    modalWindow.classList.remove('show')
    document.body.style.overflow = 'auto'
}



function modal(triggerSelector, modalSelector, modalTimerId){
    const openBtns = document.querySelectorAll(triggerSelector),
          modalWindow = document.querySelector(modalSelector)


    openBtns.forEach((button) => {
        button.addEventListener('click', () => showModal(modalSelector, modalTimerId))
    })
    
    
    modalWindow.addEventListener('click', (e)=> {
        if(e.target === modalWindow || e.target.getAttribute('data-close') == ''){
           hideModal(modalSelector);
        }
    })

    document.addEventListener('keydown', (e) =>{
        if(e.code === "Escape" && modalWindow.classList.contains('show')){
            hideModal(modalSelector);
        }
    })


     function byScroll(){
         if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
            showModal(modalSelector, modalTimerId)
            window.removeEventListener('scroll', byScroll)
        }
    }

     window.addEventListener('scroll', byScroll)
}

export default modal;
export {showModal, hideModal};