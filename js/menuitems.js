class ItemCard {
  constructor(name, descr, price, category, src, ...classes) {
    this.name = name;
    this.descr = descr;
    this.price = price;
    this.category = category;
    this.src = src;
    this.classes = classes;
  }

  render() {
    const element = document.createElement('div');

    if (this.classes.length === 0) {
      element.classList.add('menu__item');
    } else {
      this.classes.forEach(className => element.classList.add(className));
    }

    element.innerHTML = `
      <img src="${this.src}" alt="${this.name}">
      <h3 class="item-subtitle">${this.name}</h3>
      <div class="item-descr">${this.descr}</div>
      <div class="item-divider"></div>
      <div class="item-price">
        <div class="item-cost">Цена:</div>
        <div class="item-total"><span>${this.price}</span>АМД</div>
      </div>
      <button class = "buy__button">В корзину</button>
    `;

    document.querySelector('#menu').append(element);
  }
}

axios.get('http://localhost:3000/menuItems')
  .then(response => {
    const data = response.data;
    const menu = document.querySelector('#menu');
    const buttonsContainer = document.getElementById('buttons');

   
    function renderItems(items) {
      menu.innerHTML = '';
      items.forEach(({ name, description, price, category, img }) => {
        new ItemCard(name, description, price, category, img).render();
      });
    }


    renderItems(data);

    const categories = [...new Set(data.map(item => item.category))];

    const allBtn = document.createElement('button');
    allBtn.textContent = 'Все';
    allBtn.classList.add('btn-value');
    allBtn.addEventListener('click', () => renderItems(data));
    buttonsContainer.appendChild(allBtn);


    categories.forEach(category => {
      const btn = document.createElement('button');
      btn.textContent = category;
      btn.classList.add('btn-value');
      btn.addEventListener('click', () => {
        const filtered = data.filter(item => item.category === category);
        renderItems(filtered);
      });
      buttonsContainer.appendChild(btn);
    });

    document.getElementById("search").addEventListener('click', () => {
      let searchInput = document.getElementById('search-input').value.toLowerCase();
      document.querySelector(".menu-container").innerHTML = '';
      response.data
        .filter(item => item.name.toLowerCase().includes(searchInput))
        .forEach(({name, description, price, category, img}) =>{
          new ItemCard(name, description, price, category, img).render();
        })
    })
  })
  .catch(err =>{
     console.error("Barev");
  })