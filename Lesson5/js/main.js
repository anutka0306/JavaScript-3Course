const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    imgCatalog: 'https://placehold.it/200x150',
    searchField: '',
    cartUrl: '/getBasket.json',
    cartProducts: [],
    show: false,
  },

  methods: {
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },

    addProduct(product, cartProducts){
      let productId = product.id_product;
      let find = cartProducts.find(product => product.id_product === productId);
      if(find){
        find.quantity++;
      }else{
        let newCartProduct = {
          id_product: productId,
          price: product.price,
          product_name: product.product_name,
          quantity: 1
        };
        cartProducts.push(newCartProduct);
      }
      //console.log(productId);
    },
    delProduct(cartProduct, cartProducts){
      let productId = cartProduct.id_product;
      let find = cartProducts.find(cartProduct => cartProduct.id_product === productId);
      if(find.quantity == 1){
        let findIndex = cartProducts.indexOf(find);
        cartProducts.splice(findIndex,1);
        //console.log(cartProducts.indexOf(find));
      }else{
      find.quantity--;
    }
    },

    filterProduct(searchField, products){
      console.log(searchField);
      const regExp = new RegExp(searchField, 'i');
      for(let product of products){
        if(!product.product_name.match(regExp)){
          document.getElementById(`${product.id_product}`).classList.add('invisible');
        }else {
          document.getElementById(`${product.id_product}`).classList.remove('invisible');
        }
      }
    }
  },

  mounted(){
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for(let el of data){
          this.products.push(el);
        }
      });

      this.getJson(`${API + this.cartUrl}`)
        .then(data => {
          for(let el of data.contents){
            this.cartProducts.push(el);
        }
        });
  }
});
