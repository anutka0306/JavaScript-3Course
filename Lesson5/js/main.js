const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    imgCatalog: 'https://placehold.it/200x150',
    searchField: ''
  },

  methods: {
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product){
      console.log(product.id_product);
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
  }
});
