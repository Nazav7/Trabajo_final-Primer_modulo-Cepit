const products = ["Milk", "Bread", "Egg", "Apple", "Chicken Breast", "Oatmeal", "Tomato Sauce", "Cheese", "Jam", "Honey"]
const stock = [50, 30, 60, 40, 25, 35, 30, 25, 55, 40]
const prices = [3.00, 2.50, 2.00, 1.50, 6.00, 3.00, 1.50, 4.00, 3.50, 3.00]
const images = ['imagenes/milk.png', 'imagenes/bread.png', 'imagenes/egg.png', 'imagenes/apple.png', 'imagenes/chicken.png', 'imagenes/oatmeal.png', 'imagenes/tomato-sauce.png', 'imagenes/cheese.png', 'imagenes/jam.png', 'imagenes/honey.png']
const buyButton = document.getElementById('buy-button')

// Función que crea la lista de productos en el DOM.
function createProducts(arrProducts, arrPrices, arrStock, arrImages) {
    // Contenedor donde se añadirán los productos
    const productList = document.getElementById('product-list');
    // Itera sobre los productos para crear sus elementos en el DOM
    for (let i = 0; i < arrProducts.length; i++) { //o con forEach: products.forEach((element, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-card';
        // Si el producto es "Egg", aplica descuento y añade otra clase
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
            // Si no es "Egg", muestra productos sin descuento
            productDiv.innerHTML = `
                <p class="product-stock">Stock: ${arrStock[i]}</p>
                <img src="${arrImages[i]}" alt="product">
                <h3>${arrProducts[i]}</h3>
                <p>$${arrPrices[i].toFixed(2)}</p>
                <input type="number" id="quantity-${i}" name="quantity" min="0" max="${arrStock[i]}" placeholder="Quantity">
                `;
        }
        // Añade los productos al contenedor
        productList.appendChild(productDiv);
    }
}

// Llamada a la función
createProducts(products, prices, stock, images);

// Variable global para acumular el total de la compra
let total = 0;

// Añade un evento al botón comprar
buyButton.addEventListener('click', () => {
    let error = '';
    let productStock = document.querySelectorAll(`.product-stock`);
    // Itera sobre los productos para calcular el total y actualizar el stock
    products.forEach((element, i) => {
        // Obtiene el valor ingresado por el usuario
        const quantity = parseInt(document.getElementById(`quantity-${i}`).value, 10);
        const quantityInput = document.getElementById(`quantity-${i}`);
        // Si la cantidad es válida calcula el stock y el total
        if (!isNaN(quantity) && quantity > 0 && quantity <= stock[i]) {
            total += quantity * prices[i];
            stock[i] = stock[i] - quantity;
            productStock[i].innerText = `Stock: ${stock[i]}`;
            // Sino si la cantidad ingresada es mayor al stock muestra mensaje de error
        } else if (!isNaN(quantity) && quantity > stock[i]) {
            error += `There is not enough stock of ${products[i]}. `;
            // Sino si la cantidad ingresada es menor a cero muestra mensaje de error
        } else if (!isNaN(quantity) && quantity < 0) {
            error += `Invalid quantity of ${products[i]}. `;
        }
        // Vacía el campo de entrada
        quantityInput.value = "";
    });

    // Si error es true muestra mensaje de error, y añade una clase
    if (error) {
        document.getElementById('error').innerText = error;
        document.getElementById('error').classList.add('error');
    } else {
    // Sino limpia el mensaje de error y muestra el total
        document.getElementById('error').innerText = '';
        document.getElementById('total').innerText = `Total: $${total.toFixed(2)}`;
    }
})

