document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById("product-list");

            // Clear existing products
            productList.innerHTML = "";

            // Populate with fetched products
            products.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.className = 'product'; // Add a class for styling
                productDiv.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Stock: ${product.quantityInStock}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                productList.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error("Error fetching products:", error);
        });
});

function addToCart(productId) {
    const token = localStorage.getItem('jwt');
    if (!token) {
        alert("You need to be logged in to add items to the cart.");
        return;
    }

    fetch('/api/cart/item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Include the token here
        },
        body: JSON.stringify({
            productID: productId,
            quantity: 1 // Assuming a default quantity of 1
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Item added to cart:', data);
            alert("Product added to cart!"); // Or update the UI dynamically
        })
        .catch(error => {
            console.error('Detailed error:', error);
            alert(`There was an error adding the product to the cart: ${error.message}`);
        });
}
