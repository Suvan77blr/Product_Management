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
                
            </div>
        `;

        const popupContainer =this.querySelector(".view-popup-container");
        // popupContainer.innerHTML= this.usersList;
        if (Array.isArray(this.productsList)) {
            popupContainer.innerHTML = `
                <h2>Products</h2>
                <div class="product-grid">
                    ${this.productsList.map(p => `
                        <div class="product-card">
                            <script>console.log("image",p.image);</script>
                            <img src="http://localhost:3000/${p.image}" alt="${p.name}" style="width: 150px; height: 150px; object-fit: cover; border-radius: 12px" />
                            <h3>${p.name}</h3>
                            <p>Price: ₹${p.price}</p>
                            <p>Stock: ${p.quantity}</p>
                        </div>
                    `).join("")}
                </div>
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
