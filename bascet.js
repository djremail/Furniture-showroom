const modalWrapper = document.querySelector('.modal__item__container');
const modalTotalWrapper = document.querySelector('.modal__total__wrapper__price');

let Cart = function (){
    this.items = {};
    this.addItem = function (id,name, price, image){
        this.items[id] = {
            id:id,
            name:name,
            price:price,
            image:image,
            count: 1
        }
    }
    this.drawItem = function (items){
        let cartHTML = '';
        for (let item in items) {
            let html = `
                <div class="modal__item">
                    <div class="modal__img">
                        <img src="${this.items[item].image}" alt="product">
                    </div>
                    <h2 class="modal__product_name">${this.items[item].name}</h2>
                    <h2 class="modal__product_price">£ ${this.items[item].price}</h2>
                    <div class="product__count__wrapper">
                        <div class="product__plus" data-id="${this.items[item].id}">+</div>
                        <div class="product__number">${this.items[item].count}</div>
                        <div class="product__minus" data-id="${this.items[item].id}">-</div>
                    </div>
                    <h2 class="modal__product_price">£ ${this.items[item].price * this.items[item].count}</h2>
                    <div class="modal__item__remoove" data-id="${this.items[item].id}">&#215;</div>
                </div>
            `
            cartHTML += html;
        }
        modalWrapper.innerHTML = cartHTML
    }
    this.drawTotal = function (){
        let total = 0;
        let totalHTML;
        if (Object.entries(this.items).length === 0){
            totalHTML = `<h2 class="modal__total__price" style="text-align: center">Нажаль у кошику немає товару</h2>`
            modalTotalWrapper.innerHTML = totalHTML;
        }else {
            for (let item in this.items) {
                total += this.items[item].price * this.items[item].count;
            }
            totalHTML = `<h2 class="modal__total__price">Total price: £ ${total}</h2>`
            modalTotalWrapper.innerHTML = totalHTML;
        }
    }
    this.init = function (){
        let _self = this
        document.querySelectorAll('.products__item__basket').forEach(function (btnTOCart){
            btnTOCart.addEventListener('click', function (event){
                let target = event.target;
                let id = target.getAttribute('data-id');
                let item = products.find(item => {
                    if(item.id === id) {
                        return item
                    }
                })
                _self.addItem(item.id, item.name, item.price, item.image);
                console.log(_self.items)
            })
        })

        modalOpen.addEventListener('click', function (){
            _self.drawItem(_self.items)
            _self.drawTotal()
        })

        modalWrapper.addEventListener('click', function (event){
            let target = event.target
            let id = target.getAttribute('data-id');
            if (target.classList.contains('product__plus')){
                _self.items[id].count++;
                _self.drawItem(_self.items);
                _self.drawTotal()
            }
            if (target.classList.contains('product__minus') && _self.items[id].count > 1){
                _self.items[id].count--;
                _self.drawItem(_self.items);
                _self.drawTotal();
            }

            if (target.classList.contains('modal__item__remoove')){
                document.querySelectorAll('.modal__item__remoove').forEach(function (btn){
                    btn.addEventListener('click', function (event){
                        let target = event.target
                        let id = target.getAttribute('data-id');
                        delete _self.items[id];
                        _self.drawItem(_self.items);
                        _self.drawTotal();
                    })
                })
            }
        })
    }

}

let myCart = new Cart();
myCart.init();