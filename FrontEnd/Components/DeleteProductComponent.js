class DeleteProductComponent extends HTMLElement
{
    constructor()
    {
        super();
    }
    connectedCallback()
    {
        this.innerHTML = `
            <div class="popup-container">
                    <h2>Delete the  Product</h2>
                    <form id="deleteProductForm">
                        <label for="productName">Product Name:</label>
                        <input type="text" id="productName" placeholder="Enter product name" required>

                        <button type="submit" id="deleteProduct">Delete Product</button>
                        <button class="close-popup">Close</button>
                    </form>
            </div>
        `;

        const closeButton = this.querySelector(".close-popup");
        closeButton.addEventListener("click", () => {
            this.remove();
        });

        // Prevent event bubbling inside the popup.
        this.querySelector(".popup-container").addEventListener("click", (event) => {
            event.stopPropagation();
        });

        // Form Submission Logic.
        const productForm = this.querySelector("#deleteProductForm");
        
        productForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const productName = this.querySelector("#productName").value.trim();


            if(productName)
            {
                
                try {
                    const response = await fetch("http://localhost:3000/products/byDetails", {
                            method: "DELETE",
                            headers:{"Content-Type":"application/json"},
                            body: JSON.stringify({productName})
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