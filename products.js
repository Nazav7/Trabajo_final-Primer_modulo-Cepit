const products = ["Milk", "Bread", "Egg", "Apple", "Chicken Breast", "Oatmeal", "Tomato Sauce", "Cheese", "Jam", "Honey"]
const stock = [50, 30, 60, 40, 25, 35, 30, 25, 55, 40]
const prices = [3.00, 2.50, 2.00, 1.50, 6.00, 3.00, 1.50, 4.00, 3.50, 3.00]
const images = ['imagenes/milk.png','imagenes/bread.png','imagenes/egg.png','imagenes/apple.png','imagenes/chicken.png','imagenes/oatmeal.png','imagenes/tomato-sauce.png','imagenes/cheese.png','imagenes/jam.png','imagenes/honey.png']

function createProducts(arrProducts, arrPrices, arrStock,arrImages) {
    const productList = document.getElementById('product-list');
    for (let i = 0; i < arrProducts.length; i++) { //o con forEach: products.forEach((element, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-card';
        if (arrProducts[i] === "Egg") {
            productDiv.classList.add('offer-card');
            productDiv.innerHTML = `
                <p class="product-stock">Stock: ${arrStock[i]}</p>
                <p>-30% Off</p>
                <img src="${arrImages[i]}" alt="offer product">
                <h3>${arrProducts[i]}</h3>
                <p>$${(arrPrices[i] * 0.7).toFixed(2)}</p>
                <p><del>$${arrPrices[i]}</del></p>
                <input type="number" id="quantity-${i}" name="quantity" min="0" max="${arrStock[i]}" placeholder="Quantity">
            `;
        } else {
            productDiv.innerHTML = `
                <p class="product-stock">Stock: ${arrStock[i]}</p>
                <img src="${arrImages[i]}" alt="product">
                <h3>${arrProducts[i]}</h3>
                <p>$${arrPrices[i].toFixed(2)}</p>
                <input type="number" id="quantity-${i}" name="quantity" min="0" max="${arrStock[i]}" placeholder="Quantity">
                `;
        }
        
        productList.appendChild(productDiv);
    }
}
createProducts(products, prices, stock, images);

const button = document.getElementById('buy-button')

button.addEventListener('click', () => {
    let total = 0;
    let error = '';
    let productStock = document.querySelectorAll(`.product-stock`);
    products.forEach((element, i) => {
        const quantity = parseInt(document.getElementById(`quantity-${i}`).value, 10);
        if (!isNaN(quantity) && quantity > 0 && quantity <= stock[i]) {
            total += quantity * prices[i];
            stock[i] = stock[i] - quantity;
            productStock[i].innerText = `Stock: ${stock[i]}`;
        } else if (!isNaN(quantity) && quantity > stock[i]) {
            error += `There is not enough stock of ${products[i]}. `;
        } else if (!isNaN(quantity) && quantity <= 0) {
            error += `Invalid quantity of ${products[i]}. `;
        }
    });

    if (error) {
        document.getElementById('total').innerText = error;
    } else {
        document.getElementById('total').innerText = `Total: $${total.toFixed(2)}`;
    }
});

