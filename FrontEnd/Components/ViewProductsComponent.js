class ViewProductsComponent extends HTMLElement {
    constructor() {
        super();
    }
    initialize(productsList)
    {   
        this.productsList=productsList;
    }
    connectedCallback() {
        this.innerHTML = `
            <div class="view-popup-container">
                <h2>Products</h2>
                <div class="product-grid">
                    ${this.productsList.map(p => `
                        <div class="product-card">
                            <img src="http://localhost:3000/${p.image}" alt="${p.name}" />
                            <h3>${p.name}</h3>
                            <p>Price: ₹${p.price}</p>
                            <p>Stock: ${p.quantity}</p>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;

        const popupContainer =this.querySelector(".viewProducts-popup-container");
        // popupContainer.innerHTML= this.usersList;
        if (Array.isArray(this.productsList)) {
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
            popupContainer.innerText = this.productsList; // for error message string
        }
        console.log(this.productsList);
        
        // Prevent event bubbling inside the popup
        popupContainer.addEventListener("click", (event) => {
            event.stopPropagation();
        });

    }
}

customElements.define("view-products-component", ViewProductsComponent);
export default ViewProductsComponent;
