class AddProductComponent extends HTMLElement
{
    constructor()
    {
        super();
    }
    connectedCallback()
    {
        this.innerHTML = `
            <div class="popup-container">
                    <h2>Add New Product</h2>
                    <form id="addProductForm">
                        <label for="productName">Product Name:</label>
                        <input type="text" id="productName" placeholder="Enter product name" required>

                        <label for="quantity">Initial Quantity:</label>
                        <input type="number" id="quantity" placeholder="Enter quantity" min=0 required>

                        <label for="price">Product Price:</label>
                        <input type="number" id="price" placeholder="Enter price" min=0 required>

                        <label for="image">Product Image:</label>
                        <input type="file" accept="image/*">

                        <button type="submit" id="submitUser">Add Product</button>
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
        const productForm = this.querySelector("#addProductForm");
        productForm.addEventListener("submit", (event) => {
            event.preventDefault();
            alert("Form Logic yet to be handled!");
            productForm.reset();
        })
        
    }
}

customElements.define("add-product-component", AddProductComponent);
export default AddProductComponent;