let carts = document.querySelectorAll(".add-cart");

let products = [
    {
        name: 'Black Bag',
        tag: 'bag',
        price: 98,
        inCart: 0,
    },

    {
        name: 'HP Laptop',
        tag: 'laptop',
        price: 120,
        inCart: 0,
    },

    {
        name: 'Phone',
        tag: 'phone 1',
        price: 89,
        inCart: 0,
    },

    {
        name: 'Umbrella',
        tag: 'umbrella 2',
        price: 50,
        inCart: 0,
    },

    {
        name: 'Scale',
        tag: 'scale (2)',
        price: 200,
        inCart: 0,
    },

    {
        name: 'Desktop System',
        tag: 'desktop (2)',
        price: 300,
        inCart: 0,
    }
]

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
        addEventListener(products[i])
    })
}

function onLoadCartNumbers () {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    
    let productNumbers = localStorage.getItem("cartNumbers");

    productNumbers = parseInt(productNumbers);

    if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector(".cart span").textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector(".cart span").textContent = 1;
    }

    setItems(product);
    
}

function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {

        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    
}

function totalCost(product) {
    //console.log("The product price is", product.price);
    let cartCost = localStorage.getItem("totalCost");
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);


    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart() {
    let productsInCart = localStorage.getItem('cartItems');
    let cartItem = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItem);
    
    let cartCost = localStorage.getItem("totalCost");
    let productContainer = document.querySelector(".products");
    console.log("cartItems");

    if(cartItem && productContainer) {
        productContainer.innerHTML += '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="product-title">
                <img src="./image/${item.tag}.jpg">
                <span>${item.name}</span>
            <div class="price">$${item.price},00</div>
            <div class="quantity">
                <ion-icon name="remove"></ion-icon>    
                <span>${item.inCart}</span>
                <ion-icon name="add"></ion-icon>
            </div>

            <div class="total">
                $${item.inCart * item.price},00
            </div>

            `  

        });
        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total 
                </h4>
                <h4 class="basketTotal">
                    ${cartCost},00
                </h4> 
            </div>
        `
    }
}

function addToCart(inCart) {
    productContainer.innerHTML
}
onLoadCartNumbers ();
displayCart();
