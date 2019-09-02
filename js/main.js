const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class CartList {
    constructor(container = ".cart__container"){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this.amount = 0;
        this._render;
        this._getCart()
            .then(data =>{
                this.amount = data['amount'];
                this.countGoods = data['countGoods'];
                this.goods = [...data['contents']];
                this._render();
            });
    }


    _getCart(){
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    _render(){
        const block = document.querySelector(this.container);

        for(let product of this.goods){
            const productObject = new CartItem(product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());

        }
        block.insertAdjacentHTML('beforeend', `<p>Total quantity: ${this.countGoods}</p>`)
        block.insertAdjacentHTML('beforeend', `<p>Total price: ${this.amount}</p>`)
    }

}

class CartItem {
    constructor(product){
        this.product_name = product.product_name;
        this.quantity = product.quantity;
        this.price = product.price;
        this.id_product = product.id_product;
    }
    render(){
        return `<div class="product-item" data-id = "${this.id_product}">
            <div class="desc">
            <h6>${this.product_name}</h6>
            <p>${this.price}</p>
            <p>${this.quantity}</p>
            </div>
          </div>`;
    }
}


class ProductList {
    constructor(container = ".products"){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._getProducts()
            .then(data =>{
                this.goods = [...data];
                this._render();
            });

        this.getTotalPrice();
    }

    getTotalPrice(){
        this._getProducts().then(data =>{
            let totalPrice = 0;
            for(let i = 0; i < data.length; i++){
                totalPrice += data[i].price;
            }
            console.log(totalPrice);
        });
    }



  _getProducts(){
      return fetch(`${API}/catalogData.json`)
          .then(result => result.json())
          .catch(error => {
              console.log(error);
          });
  }

    _render(){
        const block = document.querySelector(this.container);

        for(let product of this.goods){
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
}

class ProductItem {
    constructor(product, img ='https://placehold.it/200x150'){
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id = "${this.id_product}">
            <img src="${this.img}" alt = "Some img">
            <div class="desc">
            <h3>${this.product_name}</h3>
            <p>${this.price}</p>
            <button class="by-btn">Добавить</button>
            </div>
          </div>`;
    }
}

const list = new ProductList();
const cart = new CartList();