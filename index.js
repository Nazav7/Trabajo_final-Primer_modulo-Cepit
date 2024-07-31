const products = ["Milk", "Bread", "Egg", "Apple", "Chicken Breast", "Oatmeal", "Tomato Sauce", "Cheese", "Jam", "Honey"];
const prices = [3.00, 2.50, 2.00, 1.50, 6.00, 3.00, 1.50, 4.00, 3.50, 3.00];
const images = ['imagenes/milk.png', 'imagenes/bread.png', 'imagenes/egg.png', 'imagenes/apple.png', 'imagenes/chicken.png', 'imagenes/oatmeal.png', 'imagenes/tomato-sauce.png', 'imagenes/cheese.png', 'imagenes/jam.png', 'imagenes/honey.png'];

// Funcion para crear producto en oferta
function createOfferProduct(arrProducts, arrPrices, arrImages) {
    const offerCard = document.getElementById('offer-card');
    for (let i = 0; i < arrProducts.length; i++) {
        if (arrProducts[i] === "Egg") { 
            offerCard.innerHTML = `
                <p>-30% Off</p>
                <img src="${arrImages[i]}" alt="offer product">
                <h3>${arrProducts[i]}</h3>
                <p>$${(arrPrices[i] * 0.7).toFixed(2)}</p>
                <p><del>$${arrPrices[i].toFixed(2)}</del></p>
            `;
        }
    }
}

// Llamada a la funcion para crear producto en oferta
createOfferProduct(products, prices, images);