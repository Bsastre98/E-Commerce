document.addEventListener('DOMContentLoaded', fetchCartItems);

function fetchCartItems() {
    // Assuming the cartID is stored in localStorage or obtained from the user session
    const cartID = localStorage.getItem('cartID');

    fetch('/api/cart/items/:cartID')  // Replace with your actual API endpoint
        .then(response => response.json())
        .then(items => {
            const cartItemsList = document.getElementById('cart-items');
            cartItemsList.innerHTML = ''; // Clear existing items
            items.forEach(item => {
                cartItemsList.innerHTML += `
                    <li>${item.name} - Quantity: ${item.quantity}
                        <button onclick="removeFromCart('${item.productID}')">Remove</button>
                    </li>`;
            });
        })
        .catch(error => console.error('Error fetching cart items:', error));
}

function clearCart() {
    const cartID = localStorage.getItem('cartID'); // Replace with actual cart ID retrieval method

    fetch(`/api/cart/${cartID}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to clear cart');
            }
            return response.json();
        })
        .then(() => {
            alert('Cart cleared successfully');
            fetchCartItems(); // Refresh cart items display
        })
        .catch(error => console.error('Error clearing cart:', error));
}


function removeFromCart(productID) {
    const cartID = localStorage.getItem('cartID'); // Replace with actual cart ID retrieval method

    fetch(`/api/cart/${cartID}/${productID}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to remove item from cart');
            }
            return response.json();
        })
        .then(() => {
            alert('Item removed from cart');
            fetchCartItems(); // Refresh cart items display
        })
        .catch(error => console.error('Error removing item from cart:', error));
}

