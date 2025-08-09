function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter}){
     const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          current = document.querySelector(currentCounter),
          total = document.querySelector(totalCounter),
          next = document.querySelector(nextArrow),
          prev = document.querySelector(prevArrow);


   
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

    function dot_opacity(arr, index){
        arr.forEach(item => item.style.opacity = '.5');
        arr[index].style.opacity = 1
    }

    hideSlide()
    showSlide();

    slider.style.position = 'relative'
    
    const indicators = document.createElement('ol'),
          dots = [];
    
    indicators.classList.add("carousel-indicators");
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for(let i = 0; i<slides.length; i++){
        const dot = document.createElement('li')
        dot.setAttribute('data-slide-to', i + 1)
        dot.style.cssText = `
            box-sizing: content-box;
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if(i == 0){
            dot.style.opacity = 1;
        }
        indicators.append(dot)
        dots.push(dot)
    }
    next.addEventListener('click', ()=>{
        slideIndex++;
        if(slideIndex >= slides.length){
            slideIndex = 0
        }
        hideSlide()
        showSlide(slideIndex)

        dot_opacity(dots, slideIndex)
    })

    prev.addEventListener('click', ()=>{
        slideIndex--;
        if(slideIndex < 0){
            slideIndex = slides.length - 1;;
        }
        hideSlide()
        showSlide(slideIndex)

        dot_opacity(dots, slideIndex)
    })

   setInterval(() => {
        slideIndex++;
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        hideSlide();
        showSlide(slideIndex);
        dot_opacity(dots, slideIndex);
    }, 4000);

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to')
            slideIndex = slideTo - 1;
            hideSlide();
            showSlide(slideIndex)
            dot_opacity(dots, slideIndex)
        })
    })
}

export default slider