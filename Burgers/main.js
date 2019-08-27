class HamburgerList {
    constructor(container = ".hamburger__options") {
        this.container = container;
        this.block = document.querySelector(container);
        this.size = [];
        this.stuffing = [];
        this.topping = [];
        this.allOptions = [];
        this.getSize();
        this.getStuffing();
        this.getToppings();
    }


    getToppings() {
        this.topping = [
            {name: 'dressing', price: 15, calories: 0},
            {name: 'mayo', price: 20, calories: 5}
        ];
        for(let option of this.topping){
            let hamburgerOption = new OptionItem(option, 'burgerTopping');
            this.allOptions.push(hamburgerOption);
            hamburgerOption = hamburgerOption.render();
            this.block.insertAdjacentHTML('beforeend', hamburgerOption);

        }

    }

    getSize() {
        this.size = [
            {name: 'small', price: 50, calories: 20},
            {name: 'big', price: 100, calories: 40}
        ];
        for(let option of this.size){
            let hamburgerOption = new OptionItem(option, 'burgerSize');
            this.allOptions.push(hamburgerOption);
            hamburgerOption = hamburgerOption.render();
            this.block.insertAdjacentHTML('beforeend', hamburgerOption);

        }
    }

    getStuffing() {
        this.stuffing = [
            {name: 'cheese', price: 10, calories: 20},
            {name: 'salad', price: 20, calories: 5},
            {name: 'potato', price: 15, calories: 10}
        ];
        for(let option of this.stuffing){
            let hamburgerOption = new OptionItem(option, 'burgerStuffing');
            this.allOptions.push(hamburgerOption);
            hamburgerOption = hamburgerOption.render();
            this.block.insertAdjacentHTML('beforeend', hamburgerOption);

        }
    }
}



class OptionItem{
    constructor(option, groupName){
        this.name = option.name;
        this.price = option.price;
        this.calories = option.calories;
        this.groupName = groupName;
    }
    render(){
        return `<input data-group="${this.groupName}" 
data-price="${this.price}" data-calories="${this.calories}" type="radio" name="${this.groupName}" value="${this.name}">
${this.name}<br>`;
    }
}

class Hamburger{
    constructor(container = '.hamburger__ready'){
        this.container = container;
        this.block = document.querySelector(container);
        this.hamburger = [];
        this.size = document.querySelectorAll('[data-group = burgerSize]');
        this.stuffing = document.querySelectorAll('[data-group = burgerStuffing]');
        this.topping = document.querySelectorAll('[data-group = burgerTopping]');
        this.totalPrice = 0;
        this.totalCalories = 0;
        this.getHamburgerOptions();
    }
    getHamburgerOptions(){
        for(let i = 0; i < this.size.length; i++){
           if(this.size[i].checked) {
               this.hamburger[0] =[];
                this.hamburger[0].push(this.size[i].value);
                this.hamburger[0].push(this.size[i].getAttribute('data-price'));
                this.hamburger[0].push(this.size[i].getAttribute('data-calories'));
           }
        }
        for(let i = 0; i < this.stuffing.length; i++){
            if(this.stuffing[i].checked) {
                this.hamburger[1] =[];
                this.hamburger[1].push(this.stuffing[i].value);
                this.hamburger[1].push(this.stuffing[i].getAttribute('data-price'));
                this.hamburger[1].push(this.stuffing[i].getAttribute('data-calories'));

            }
        }
        for(let i = 0; i < this.topping.length; i++){
            if(this.topping[i].checked) {
                this.hamburger[2] =[];
                this.hamburger[2].push(this.topping[i].value);
                this.hamburger[2].push(this.topping[i].getAttribute('data-price'));
                this.hamburger[2].push(this.topping[i].getAttribute('data-calories'));
            }
        }
    for(let param of this.hamburger) {
        for (let paramItem of param) {
            this.block.insertAdjacentHTML('beforeend', `<p>${paramItem}</p>`);
        }
        this.totalPrice += Number(param[1]);
        this.totalCalories += Number(param[2]);
    }
        this.block.insertAdjacentHTML('beforeend', `<p>${this.totalCalories} - Каллорий</p>`);
        this.block.insertAdjacentHTML('beforeend', `<p>${this.totalPrice} - Цена бургера</p>`);

    }
}

const list = new HamburgerList();

document.querySelector('.makeBurger').addEventListener('click', makeBurger);
function makeBurger() {
    document.querySelector('.hamburger__ready').innerHTML = '';
    new Hamburger();
}


