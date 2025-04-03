class AddUserComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="popup-container">
                    <h2>Add New User</h2>
                    <label for="username">Username:</label>
                    <input type="text" id="username" placeholder="Enter username" required>

                    <label for="email">Email:</label>
                    <input type="email" id="email" placeholder="Enter email" required>

                    <label for="role">Role:</label>
                    <select id="role">
                        <option value="user">Normal User</option>
                        <option value="superuser">Super User</option>
                    </select>

                    <button id="submitUser">Add User</button>
                    <button class="close-popup">Close</button>
            </div>
        `;

        // Close popup when "Close" is clicked
        this.querySelector(".close-popup").addEventListener("click", () => {
            this.remove();
        });

        // Prevent event bubbling inside the popup
        this.querySelector(".popup-container").addEventListener("click", (event) => {
            event.stopPropagation();
        });

        // Handle form submission
        this.querySelector("#submitUser").addEventListener("click", () => {
            const username = this.querySelector("#username").value.trim();
            const email = this.querySelector("#email").value.trim();
            const role = this.querySelector("#role").value;

            if (username && email) {
                this.addEventListener("submit", async (event) => {
                    event.preventDefault(); // Prevent form from reloading the page
            
                    const userData = { username, email, role };
            
                    try {
                        const response = await fetch("http://localhost:3000/addUser", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(userData),
                        });
            
                        const result = await response.json();
                        alert(result.message); // Show success or error message
            
                        if (response.ok) {
                            // Reset form after successful submission
                            addUserForm.reset();
                        }
                    } catch (error) {
                        alert("Error adding user");
                    }
                });
                this.remove(); // Close popup after adding user
            } else {
                alert("Please fill in all fields.");
            }
        });
    }
}

customElements.define("add-user-component", AddUserComponent);
export default AddUserComponent;
