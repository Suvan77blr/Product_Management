

class VanillaUpdateProductComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Implement the logic to update the product here
        console.log("Update-Product-Component mounted");
        this.innerHTML = `
            <div class="popup-container">
                <div class="popup-header">
                    <h2>Update Product</h2>
                    <button class="close-popup">x</button>
                </div>
                
                <form id="fetchProductForm">
                    <label for="product-id">Product ID:</label>
                    <input type="text" id="product-id" placeholder="Enter Product ID" required>
                
                    <input type="submit" id="fetch-product-button" value="Fetch Product" />
                </form>

                <div id="status-message" style="color: red; margin-top:5px;"></div>

                <div id="update-product-form-container">
                    <form id="update-product-form">
                    </form>
                </div>
            </div>
        `

        const fetchProductForm = this.querySelection("#fetchProductForm");
        const updateProductForm = this.querySelection("#update-product-form");
        const updateProductContainer = this.querySelection("#update-product-form-container");
        const statusDiv = this.querySelection("#status-message");
        const closePopupButton = this.querySelection(".close-popup");


        fetchProductForm.addEventListener("sumbit", async (e) => {
            e.preventDefault();

            const productId = this.querySelector("#product-id").value.trim();
            if(!productId) {
                statusDiv.textContent = "Product ID required";
                return;
            }

            const API_ROUTE = `/products/byId/${productId}`;
            const IS_DEVELOPMENT = import.meta.env.MODE === "development";
            const rqstURL = IS_DEVELOPMENT ? API_ROUTE : `${import.meta.env.VITE_API_BASE_URL}${API_ROUTE}`;

            try {
                const response = await fetch(`${rqstURL}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });

                const result = await response.json();
                if(!response.ok) {
                    throw new Error(result.message || "Product not found");
                }

                const {data : product} = await result.json();

                // Clear the previous content.
                updateProductForm.innerHTML = "";
                statusDiv.textContent = "";

                // Looping through the product keys and generate the form fields.
                for(const key in product) {
                    if(key === "_id" || key === "createdAt" || key === "updatedAt" || key === "__v") {
                        continue;
                    }

                    const value = product[key];
                    const label = document.createElement("label");
                    label.setAttribute("for", key);
                    label.textContent = `${Key[0].toUpperCase()}${key.slice(1)}`;

                    const input = document.createElement("input");
                    input.name = key;
                    input.id = key;
                    input.value = value || "";
                    input.placeholder = key;
                    input.required = true;

                    // Setting correct input types.
                    if(key === "quantity" || key === "price") {
                        input.type = "number";
                    } else if(key === "image") {
                        input.type = "file";
                    } else {
                        input.type = "text";
                    }

                    // ProductID is made readonly.
                    if (key === "productId") input.setAttribute("readonly", true);

                    updateProductForm.appendChild(label);
                    updateProductForm.appendChild(input);
                }

                // Adding update button.
                const updateButton = document.createElement("button");
                updateButton.type = "submit";
                updateButton.textContent = "Update Product";
                updateProductForm.appendChild(updateButton);

                // Adding close button.
                const closeButton = document.createElement("button");
                closeButton.type = "button";
                closeButton.textContent = "Close";
                updateProductForm.appendChild(closeButton);

                // Adding event listeners.
                updateButton.addEventListener("click", async (e) => {
                    e.preventDefault();
                    // Implement the logic to update the product here.
                    const formData = new FormData(updateProductForm);
                    const updatedProduct = Object.fromEntries(formData.entries());
                    updatedProduct.quantity = Number(updatedProduct.quantity);
                    updatedProduct.price = Number(updatedProduct.price);

                    try {
                        const response = await fetch("/products/byDetails", {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(updatedProduct)
                        });

                        const result = await response.json();
                        if(!response.ok) {
                            throw new Error(result.message || "Updation failed");
                        }

                        statusDiv.textContent = "Product updated successfully.";
                        alert("Product updated successfully.");
                        // Closing the Update-Popup on successful update!.
                        onClose?.();
                    } catch(err) {
                         alert("Error updating product: " + err.message);
                    }
                });
            } catch(err) {
                updateProductForm.innerHTML = "";
                statusDiv.textContent = err.message || "Error fetching product.";
            }                     
        });

        closePopupButton.addEventListener("click", () => {
            if(onClose) {
                onClose();
            }
        })
    }
}

customElements.define("vanilla-update-product-component", VanillaUpdateProductComponent);
export default VanillaUpdateProductComponent;