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
                        <label for="productId">Product ID:</label>
                        <input type="text" id="productId" placeholder="Enter product ID" required>

                        <label for="productName">Product Name:</label>
                        <input type="text" id="productName" placeholder="Enter product name" required>

                        <label for="quantity">Quantity:</label>
                        <input type="number" id="quantity" placeholder="Enter quantity" min=0 required>

                        <label for="price">Product Unit Price:</label>
                        <input type="number" id="price" placeholder="Enter unit price" min=0 required>

                        <label for="image">Product Image:</label>
                        <input type="file" id="image" accept="image/*">

                        <button type="submit" id="submitProduct">Add Product</button>
                        <button type="button" class="close-popup">Close</button>
                    </form>
            </div>
        `;
        const productForm = this.querySelector("#addProductForm");

        const closeButton = this.querySelector(".close-popup");
        closeButton.addEventListener("click", () => {
            productForm.reset();
            this.remove();
        });

        // Prevent event bubbling inside the popup.
        const popupContainer = this.querySelector(".popup-container");
        popupContainer.addEventListener("click", (event) => {
            event.stopPropagation();
        });

        // Form Submission Logic.        
        productForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const productId = this.querySelector("#productId").value.trim();
            const productName = this.querySelector("#productName").value.trim();
            const quantity = this.querySelector("#quantity").value;
            const price = this.querySelector("#price").value;
            const imageInput = this.querySelector("#image");
            const imageFile = imageInput.files[0];
            // Here imageFile => undefined, if no image is given.


            if(productId && productName && quantity && price)
            {
                // Normal JSON.stringify will not work as we have "file" input.
                const formData = new FormData();
                formData.append("productId", productId);
                formData.append("name", productName);
                formData.append("quantity", quantity);
                formData.append("price", price);

                if(imageFile) {
                    formData.append("image", imageFile);
                }
                // for (const [key, value] of formData.entries()) {
                //     console.log(`${key}:`, value);
                // }
                try {
                    const response = await fetch(`${API_BASE_URL}/products`, {
                            method: "POST",
                            body: formData
                            // No headers, browsers will set the boundary it seems...!
                    });

                    // const result = await response.json();
                    const result = await response.json();
                    
                    // Can be commented after testing.
                    console.log("Raw Response from server:", response);
                    console.log("Result from server:", result);
                    
                    alert(result.message || "Product added!");
                    
                    // success of both HTTP & Application logic.
                    if(response.ok && result.success) {
                        let displayMsg = `Successfully added ${quantity} units of ${productName} (each: ${price}/-) `;
                        // alert(displayMsg);
                        console.log(displayMsg);
                        
                        // Dispatching event on successful addition of product.
                        this.dispatchEvent(new CustomEvent("product-added", {
                            bubbles: true,
                            composed: true,
                        }));

                        productForm.reset();
                        this.remove();
                    }
                    else {
                        console.error("Error from server:", result);
                    }
                }
                catch(error) {
                    alert("Error adding product");
                    console.error("Error adding the product: ",error.message);
                }
            } else {
                alert("Please fill in all fields");
            }
        });        
    }
}

customElements.define("add-product-component", AddProductComponent);
export default AddProductComponent;