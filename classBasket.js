class Cart {
    constructor() {
        this.items = {};
        this.modalWrapper = document.querySelector('.modal__item__container');
        this.modalTotalWrapper = document.querySelector('.modal__total__wrapper__price');
        this.modalThead = document.querySelector('.modal__thead');
        this.init();
    }

    addItem(id, name, price, image) {
        this.items[id] = {
            id: id,
            name: name,
            price: price,
            image: image,
            count: 1
        };
    }

    drawItem(items) {
        let cartHTML = '';
        for (let item in items) {

            let html = `
               <tr>
                    <td>
                        <div class="modal__img">
                            <img src="${this.items[item].image}" alt="product">
                        </div>
                        <h2 class="modal__product_name">${this.items[item].name}</h2>
                    </td>
                    <td>
                        <h2 class="modal__product_price">£ ${this.items[item].price}</h2>
                    </td>
                    <td>
                        <div class="product__count__wrapper">
                            <input type="number" class="product__number" value="${this.items[item].count}">
                            <div class="icon__wrapper">
                                <span class="product__plus" data-id="${this.items[item].id}">
                                    <i class="fas fa-chevron-up product__plus" data-id="${this.items[item].id}"></i>
                                </span>
                                <span class="product__minus" data-id="${this.items[item].id}">
                                    <i class="fas fa-chevron-down product__minus" data-id="${this.items[item].id}"></i>
                                </span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <h2 class="modal__product_price">£ ${this.items[item].price * this.items[item].count}</h2>
                    </td>
                    <td><button class="modal__item__remoove" data-id="${this.items[item].id}" }>&#215;</button></td>
                </tr>
            `
            cartHTML += html;
        }
        this.modalWrapper.innerHTML = cartHTML;
    }

    drawPoint(){
        let point;
        point = Object.entries(this.items).length;
        cart__point.innerHTML = point;
    }


    drawTotal() {
        let total = 0;
        let totalHTML;
        let totalThead;
        if (Object.entries(this.items).length === 0) {
            totalHTML = `<td colspan="5" style="text-align: center; padding: 70px 0">Нажаль у кошику немає товару</td>`;
            totalThead = `<span></span>`;
            this.modalTotalWrapper.innerHTML = totalHTML;
            this.modalThead.innerHTML = totalThead;
        } else {
            for (let item in this.items) {
                total += this.items[item].price * this.items[item].count;
            }
            totalHTML = `<td colspan="5" style="padding: 25px">Total price: £ ${total}</td>`
            totalThead = `
                <tr>
                    <th>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                    <th>REMOVE</th>
                </tr>
            `
            this.modalTotalWrapper.innerHTML = totalHTML;
            this.modalThead.innerHTML = totalThead;
        }
    }

    init() {
        container.addEventListener('click', (event) => {
            let target = event.target;
            let id = target.getAttribute('data-id');
            if(target.classList.contains('products__item__basket') || target.classList.contains('products__item__ico')){
                let item = products.find((item) => {
                    if (item.id === id) {
                        return item;
                    }
                });
                this.addItem(item.id, item.name, item.price, item.image);
                this.drawPoint();
            }
        });

        modalOpen.addEventListener('click', () => {
            this.drawItem(this.items);
            this.drawTotal();
        });

        this.modalWrapper.addEventListener('click', (event) => {
            let target = event.target;
            let id = target.getAttribute('data-id');
            if (target.classList.contains('product__plus')) {
                this.items[id].count++;
                this.drawItem(this.items);
                this.drawTotal();
            }
            if (target.classList.contains('product__minus') && this.items[id].count > 1) {
                this.items[id].count--;
                this.drawItem(this.items);
                this.drawTotal();
            }

            if (target.classList.contains('modal__item__remoove')) {
                document.querySelectorAll('.modal__item__remoove').forEach((btn) => {
                    btn.addEventListener('click', (event) => {
                        let target = event.target;
                        let id = target.getAttribute('data-id');
                        delete this.items[id];
                        this.drawItem(this.items);
                        this.drawTotal();
                        this.drawPoint();
                    });
                });
            }
        });
    }
}

let myCart = new Cart();
