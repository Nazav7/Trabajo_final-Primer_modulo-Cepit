const products = ["Milk", "Bread", "Egg", "Apple", "Chicken Breast", "Oatmeal", "Tomato Sauce", "Cheese", "Jam", "Honey"]
const stock = [50, 30, 60, 40, 25, 35, 30, 25, 55, 40]
const prices = [3.00, 2.50, 2.00, 1.50, 6.00, 3.00, 1.50, 4.00, 3.50, 3.00]
const images = ['imagenes/milk.png','imagenes/bread.png','imagenes/egg.png','imagenes/apple.png','imagenes/chicken.png','imagenes/oatmeal.png','imagenes/tomato-sauce.png','imagenes/cheese.png','imagenes/jam.png','imagenes/honey.png']

function createProducts(arrProducts, arrPrices, arrStock,arrImages) {
    const productList = document.getElementById('product-list');
    for (let i = 0; i < arrProducts.length; i++) { //o con forEach: products.forEach((element, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-card';
        productDiv.innerHTML = `
    <p class= "product-stock">Stock: ${arrStock[i]}</p>
    <h2>${arrProducts[i]}</h2>
    <img src="${arrImages[i]}" alt="product">
    <p>$${arrPrices[i]}</p>
    <input type="number" id="quantity-${i}" name="quantity" min="0" max="${arrStock[i]}" placeholder="Quantity">
    `;
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
        if (quantity > 0 && quantity <= stock[i]) {
            total += quantity * prices[i];
            stock[i] = stock[i] - quantity;
            productStock[i].innerText = stock[i];
        } else if (quantity > stock[i]) {
            error += `No hay suficiente stock de ${products[i]}. `;
        } else if (quantity <= 0) {
            error += `Cantidad inválida para ${products[i]}. `;
        }
    });

    if (error) {
        document.getElementById('total').innerText = error;
    } else {
        document.getElementById('total').innerText = `Total: $${total.toFixed(2)}`;
    }
});

