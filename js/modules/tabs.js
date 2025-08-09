function tabs(tabsSel, tabsContentSel, tabsParentSel, activeClass) {
    const tabs = document.querySelectorAll(tabsSel),
          tabsContent = document.querySelectorAll(tabsContentSel),
          tabsParent = document.querySelector(tabsParentSel);

    function hideTabContent(){
        tabsContent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show', 'fade')
        })

        tabs.forEach(item => {
            item.classList.remove(activeClass)
        })
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade')
        tabsContent[i].classList.remove('hide')
        tabs[i].classList.add(activeClass)
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if(target && target.classList.contains(tabsSel.slice(1))){
            tabs.forEach((item, i) => {
                if(target === item){
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })
}

export default tabs

