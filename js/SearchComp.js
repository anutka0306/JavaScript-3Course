Vue.component('search',{
  data(){
      return{
        catalogUrl: '/catalogData.json',
        userSearch: '',
        products: [],
        filtered: [],
      }
  },
  methods:{
    filter(userSearch){
      let regexp = new RegExp(this.userSearch, 'i');
      this.filtered = this.products.filter(el => regexp.test(el.product_name));
      for(item in this.products){
        document.getElementById(this.products[item].id_product).classList.add('invisible');
      }
      for(item in this.filtered){
        document.getElementById(this.filtered[item].id_product).classList.remove('invisible');
      }
      console.log(this.filtered);
    }
  },
  mounted(){
    console.log(this.userSearch);
    this.$parent.getJson(`${API + this.catalogUrl}`)
        .then(data => {
            for(let el of data){
                this.products.push(el);
                this.filtered.push(el);
            }
        });
  },

  template:`<form action="#" class="search-form" @submit.prevent="filter(userSearch)">
      <input type="text" class="search-field" v-model="userSearch">
      <button class="btn-search" type="submit">
          <i class="fas fa-search"></i>
      </button>
  </form>`
});
