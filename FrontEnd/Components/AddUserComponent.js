class AddUserComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="popup-container">
                    <h2>Add New User</h2>
                    <form id="addUserForm">
                        <label for="username">Username:</label>
                        <input type="text" id="username" placeholder="Enter username" required>

                        <label for="password">Password:</label>
                        <input type="password" id="password" placeholder="Enter password" required>

                        <label for="email">Email:</label>
                        <input type="email" id="email" placeholder="Enter email" required>

                        <label for="role">Role:</label>
                        <select id="role">
                            <option value="user">Normal User</option>
                            <option value="superuser">Super User</option>
                        </select>

                        <button type="submit" id="submitUser">Add User</button>
                        <button class="close-popup">Close</button>
                    </form>
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
        const form = this.querySelector("#addUserForm");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const username = this.querySelector("#username").value.trim();
            const password = this.querySelector("#password").value;
            const email = this.querySelector("#email").value.trim();
            const role = this.querySelector("#role").value;

            if (username && password && email) {
                const userData = { username, password, email, role };

                try {
                    const response = await fetch("http://localhost:3000/users", { // ✅ Use correct route
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(userData),
                    });

                    const result = await response.json();
                    alert(result.message || "User added!");

                    if (response.ok) {
                        form.reset();       // ✅ Clear form
                        this.remove();      // ✅ Close popup
                    }
                } catch (error) {
                    alert("Error adding user");
                    console.error(error);
                }
            } else {
                alert("Please fill in all fields.");
            }
        });
    }
}

customElements.define("add-user-component", AddUserComponent);
export default AddUserComponent;
