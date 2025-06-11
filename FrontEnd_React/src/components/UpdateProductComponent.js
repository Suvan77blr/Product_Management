

class UpdateProductComponent extends HTMLElement {
    constructor() {
        super();
    }

    initialize(productData) {
        this.productData = productData;
    }

    connectedCallback() {
        // Implement the logic to update the product here
        console.log("Update-Product-Component mounted");
        this.innerHTML = `
        <div class="popup-overlay">
            <div class="popup-container">
                <div class="popup-header">
                    <h2>Update Product
                        <button class="close-popup">x</button>
                    </h2>
                    
                </div>

                <div id="status-message" style="color: red; margin-top:5px;"></div>

                <div id="update-product-form-container">
                    <form id="update-product-form">
                    </form>
                </div>
            </div>
        </div>
        `
        const popupOverlay = this.querySelector(".popup-overlay");
        popupOverlay.addEventListener("click", (event) => {
            event.stopPropagation();
        });
        
        
        const updateProductForm = this.querySelector("#update-product-form");
        const statusDiv = this.querySelector("#status-message");
        const closePopupButton = this.querySelector(".close-popup");

        updateProductForm.innerHTML = "";
        statusDiv.textContent = "";

        // Looping through the product keys and generate the form fields.
        for(const key in this.productData) {
            if(key === "_id" || key === "createdAt" || key === "updatedAt" || key === "__v") {
                continue;
            }

            const value = this.productData[key];
            const label = document.createElement("label");
            label.setAttribute("for", key);
            label.textContent = `${key[0].toUpperCase()}${key.slice(1)}`;

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
        closeButton.className = "close-popup";
        updateProductForm.appendChild(closeButton);

        // Adding event listeners.
        updateButton.addEventListener("click", async (e) => {
            e.preventDefault();
            // Implement the logic to update the product here.
            const formData = new FormData(updateProductForm);
            const updatedProduct = Object.fromEntries(formData.entries());
            updatedProduct.quantity = Number(updatedProduct.quantity);
            updatedProduct.price = Number(updatedProduct.price);

            if (formData.get("image") instanceof File && formData.get("image").name) {
                const file = formData.get("image");
                // Assuming your API doesn't accept raw File objects
                // Either:
                // - Convert to base64 (not efficient)
                // - Or, skip and handle upload separately
                updatedProduct.image = file.name; // Placeholder logic — adapt to your backend
            } else {
                delete updatedProduct.image; // Avoid sending undefined or [object File]
            }
            console.log("Sending Payload:", updatedProduct);
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

                this.dispatchEvent(new CustomEvent("product-updated", {
                    bubbles: true,
                    composed: true
                }));
// Trying to DOM-remove it.
                // productForm.reset();
                this.remove();
                
            } catch(err) {
                alert("Error updating product: " + err.message);
                updateProductForm.innerHTML = "";
                statusDiv.textContent = err.message || "Error fetching product.";
            }
        });

        this.querySelector(".close-popup").addEventListener("click", () => {
            updateProductForm.reset();
            // this.dispatchEvent(new CustomEvent("close-update", { 
            //     bubbles: true, composed: true 
            // }));
            this.remove();
        })
    }
}

customElements.define("update-product-component", UpdateProductComponent);
export default UpdateProductComponent;