class ViewUsersComponent extends HTMLElement {
    constructor() {
        super();
    }
    initialize(usersList)
    {   
        this.usersList = usersList;
    }
    connectedCallback() {
        this.innerHTML = `
            <div class="view-popup-container">

            </div>
        `;

        const popupContainer =this.querySelector(".view-popup-container");
        // popupContainer.innerHTML= this.usersList;
        if (Array.isArray(this.usersList)) {
            popupContainer.innerHTML = `
                <div class="list-header">
                    <div class="first-line">
                        <h2>Users List
                            <button class="list-close-button">x</button>
                        </h2>
                    </div>
                </div>
                <table>
                    <tr><th>User ID</th><th>Name</th><th>Email</th><th>Role</th></tr>
                    ${this.usersList.map(user => `
                        <tr>
                            <td>${user.userId}</td>
                            <td>${user.username}</td>
                            <td>${user.email}</td>
                            <td>${user.role}</td>
                        </tr>
                    `).join("")}
                </table>
            `;
        } else {
            popupContainer.innerText = this.usersList; // for error message string
        }
        console.log(this.usersList);
        
        // Prevent event bubbling inside the popup
        popupContainer.addEventListener("click", (event) => {
            event.stopPropagation();
        });

        const listCloseButton = this.querySelector(".list-close-button");
        listCloseButton.onclick = () => {
            this.remove();
        };

    }
}

customElements.define("view-users-component", ViewUsersComponent);
export default ViewUsersComponent;
