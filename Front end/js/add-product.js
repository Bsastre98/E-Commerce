document.getElementById("product-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const quantityInStock = document.getElementById("quantityInStock").value;

    const productData = {
        name: name,
        description: description,
        price: price,
        quantityInStock: quantityInStock
    };

    fetch('/api/createProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Product added successfully!');
        })
        .catch(error => {
            console.error('There was an error adding the product:', error);
            alert('There was an error adding the product. Please try again.');
        });
});


