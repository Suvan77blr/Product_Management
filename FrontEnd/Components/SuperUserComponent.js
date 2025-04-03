class SuperUserComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    manageProducts() {
        alert("Managing Products...");
    }
    viewReports() {
        alert("Viewing Reports...");
    }

    connectedCallback()
    {
        this.innerHTML = `
            <div class="container">
            <h2>Super User Dashboard</h2>
            <div class="actions">
                <a href="./ManageUsers.html"> <button>Manage Users</button></a>
                <button class="manage-products-button">Manage Products</button>
                <button class="view-reports-button">View Reports</button>
            </div>
        </div>
        `;

        const manageProductsButton = this.querySelector(".manage-products-button");
        manageProduc-user-popuptsButton.addEventListener("click", (event)=>
        {
            this.manageProducts();
        });
    }
}

customElements.define("super-user-component", SuperUserComponent);
export default SuperUserComponent;