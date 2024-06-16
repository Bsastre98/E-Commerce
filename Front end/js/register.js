document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registrationForm");
    const messageDiv = document.getElementById("message");

    registrationForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default form submission

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const address = document.getElementById("address").value;

        // Send the data to the server
        fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password, address })
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    messageDiv.innerText = data.message;
                    if (data.message.includes("successfully")) {
                        // Reset form fields after successful submission
                        registrationForm.reset();
                    }
                } else if (data.error) {
                    messageDiv.innerText = data.error;
                }
            })
            .catch(error => {
                console.error("Error:", error);
                messageDiv.innerText = "An error occurred while registering.";
            });
    });
});