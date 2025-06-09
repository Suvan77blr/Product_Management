class DeleteProductComponent extends HTMLElement
{
    constructor()
    {
        super();
    }
    connectedCallback()
    {
        console.log("Delete-Product-Component mounted");
        this.innerHTML = `
            <div class="popup-container">
                    <h2>Delete Product
                        <button class="close-popup">x</button>
                    </h2>
                    <form id="deleteProductForm">
                        <label for="productId">Product ID:</label>
                        <input type="text" id="productId" placeholder="Enter Product ID" required>

                        <button type="submit" id="deleteProduct">Delete Product</button>
                        <button type="button" class="close-popup">Close</button>
                    </form>
            </div>
        `;

        const closeButton = this.querySelector(".close-popup");
        closeButton.addEventListener("click", () => {
            // this.remove();
            this.dispatchEvent(new CustomEvent("close-delete", { 
                bubbles: true, composed: true 
            }));
        });


        // Prevent event bubbling inside the popup.
        this.querySelector(".popup-container").addEventListener("click", (event) => {
            event.stopPropagation();
        });

        // Form Submission Logic.
        const productForm = this.querySelector("#deleteProductForm");
        
        productForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const productId = this.querySelector("#productId").value.trim();

            if(productId)
            {
                const API_ROUTE = "/products/byDetails";
                const IS_DEVELOPMENT = import.meta.env.MODE === 'development';
                const rqstURL = IS_DEVELOPMENT ? API_ROUTE : (import.meta.env.VITE_API_BASE_URL + API_ROUTE);
                try {
                    const response = await fetch(`${rqstURL}`, {
                            method: "DELETE",
                            headers:{"Content-Type":"application/json"},
                            body: JSON.stringify({productId})
                    });

                    const result = await response.json();
                    alert(result.message || "Product deleted!");
                    this.remove();
                }
                catch(error) {
                    console.error("Error while deleting the product:",error.message);
                }
            } else {
                alert("Please fill in all fields");
            }
        });        
    }
}

customElements.define("delete-product-component", DeleteProductComponent);
export default DeleteProductComponent;