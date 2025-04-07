class ViewUsersComponent extends HTMLElement {
    constructor() {
        super();
    }
    initialize(usersList)
    {   
        this.usersList=usersList;
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
                <table>
                    <tr><th>Name</th><th>Email</th><th>Role</th></tr>
                    ${this.usersList.map(user => `
                        <tr>
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

    }
}

customElements.define("view-users-component", ViewUsersComponent);
export default ViewUsersComponent;
