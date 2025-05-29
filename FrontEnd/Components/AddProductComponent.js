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
        this.querySelector(".popup-container").addEventListener("click", (event) => {
            event.stopPropagation();
        });

        // Form Submission Logic.        
        productForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const productName = this.querySelector("#productName").value.trim();
            const quantity = this.querySelector("#quantity").value;
            const price = this.querySelector("#price").value;
            const imageInput = this.querySelector("#image");
            const imageFile = imageInput.files[0];
            // Here imageFile => undefined, if no image is given.


            if(productName && quantity && price)
            {
                // Normal JSON.stringify will not work as we have "file" input.
                const formData = new FormData();
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
                    const response = await fetch("http://localhost:3000/products", {
                            method: "POST",
                            body: formData
                            // No headers, browsers will set the boundary it seems...!
                    });

                    // const result = await response.json();
                    // alert(result.message || "Product added!");
                    const result = await response.json();

                    // Can be commented after testing.
                    console.log("Raw Response from server:", response);
                    console.log("Result from server:", result);

                    // success of both HTTP & Application logic.
                    if(response.ok && result.success) {
                        let displayMsg = `Successfully added ${quantity} units of ${productName} (each: ${price}/-) `
                        alert(displayMsg);

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