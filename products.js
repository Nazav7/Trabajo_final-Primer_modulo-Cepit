const products = ["Milk", "Bread", "Eggs", "Apples", "Chicken Breast", "Rice", "Tomato Sauce", "Cheese", "Cereal", "Orange Juice"]
const stock = [50, 30, 60, 40, 25, 35, 30, 25, 55, 40]
const prices = [3.00, 2.50, 2.00, 1.50, 6.00, 3.00, 1.50, 4.00, 3.50, 3.00]

function createProducts(arrProducts, arrPrices, arrStock) {
    const productList = document.getElementById('product-list');
    for (let i = 0; i < arrProducts.length; i++) { //o con forEach: products.forEach((element, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
    <p id= stock-${i}>Stock: ${arrStock[i]}</p>
    <h2>${arrProducts[i]}</h2>
    <p>Precio: $${arrPrices[i]}</p>
    <input type="number" id="quantity-${i}" name="quantity" min="0" max="${arrStock[i]}" placeholder="Quantity">
    `;
        productList.appendChild(productDiv);
    }
}
createProducts(products, prices, stock);

const button = document.getElementById('buy-button')

button.addEventListener('click', () => {
    let total = 0;
    let error = '';
    products.forEach((element, i) => {
        const quantity = parseInt(document.getElementById(`quantity-${i}`).value, 10);
        if (quantity > 0 && quantity <= stock[i]) {
            total += quantity * prices[i];
            stock[i] = stock[i] - quantity;
            document.getElementById(`stock-${i}`).innerText = stock[i];
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