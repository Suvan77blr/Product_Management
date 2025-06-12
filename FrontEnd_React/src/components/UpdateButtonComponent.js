// import UpdateProductWrapper from "./UpdateProductWrapper.js";
import UpdateProductComponent from "./UpdateProductComponent.js";

class UpdateButtonComponent extends HTMLElement {
    constructor() {
        super();
    }

    initialize(listItemId, serverRoute) {
        this.listItemId = listItemId;
        this.serverRoute = serverRoute;
    }

    connectedCallback() {
        this.innerHTML = `
            <button class="list-component-update-button">
                <img src="/assets/updateButtonIcon.jpeg" height=30 width=25></img>
            </button>
        `;

        // const updateButton = this.querySelector(".list-component-update-button");
        this.addEventListener("click", async (event) => {
            event.preventDefault();

            alert(`${this.listItemId} is about to be updated!`);

            const API_ROUTE = "/products/byId";
            const IS_DEVELOPMENT = import.meta.env.MODE === "development";
            const rqstURL = IS_DEVELOPMENT ? API_ROUTE : `${import.meta.env.VITE_API_BASE_URL}${API_ROUTE}`;
            try {
                const response = await fetch(`${rqstURL}/${this.listItemId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(result.message || "Updation failed");
                }
                const result = await response.json();
                const productData = result.data;

                const updateProductPopup = document.createElement("update-product-component");
                updateProductPopup.setAttribute("popup-mode", "true");
                updateProductPopup.style.position = "fixed";
                updateProductPopup.style.left = "50%";
                updateProductPopup.style.top = "50%";
                updateProductPopup.style.transform = "translate(-50%, 50%)";
                updateProductPopup.style.zIndex = "2000";

                updateProductPopup.initialize(productData);  // Assuming you add this method inside update-product-component

                updateProductPopup.addEventListener("product-updated", () => {
                    this.dispatchEvent(new CustomEvent("item-updated", {
                        bubbles: true,
                        composed: true,
                        detail: { productId: this.productId }
                    }));
                });

                document.body.appendChild(updateProductPopup);
                // Create wrapper div
                // const updateProductWrapper = document.createElement("div");
                // updateProductWrapper.style.position = "fixed";
                // updateProductWrapper.style.top = "0";
                // updateProductWrapper.style.left = "0";
                // updateProductWrapper.style.width = "100vw";
                // updateProductWrapper.style.height = "100vh";
                // updateProductWrapper.style.backgroundColor = "rgba(0,0,0,0.5)";
                // updateProductWrapper.style.display = "flex";
                // updateProductWrapper.style.justifyContent = "center";
                // updateProductWrapper.style.alignItems = "center";
                // updateProductWrapper.style.zIndex = "2000";

                // // Optional: close on click outside the popup
                // updateProductWrapper.addEventListener("click", (e) => {
                //     if (e.target === updateProductWrapper) {
                //         document.body.removeChild(updateProductWrapper);
                //     }
                // });

                // // Create the popup
                // const updateProductPopup = document.createElement("update-product-component");
                // updateProductPopup.setAttribute("popup-mode", "true");

                // // Initialize popup with product data
                // updateProductPopup.initialize(productData);

                // // Listen for product updated event, remove wrapper, and dispatch event upward
                // updateProductPopup.addEventListener("product-updated", () => {
                //     this.dispatchEvent(new CustomEvent("item-updated", {
                //         bubbles: true,
                //         composed: true,
                //         detail: { productId: this.listItemId }
                //     }));
                //     document.body.removeChild(updateProductWrapper);
                // });

                // // Append popup inside wrapper
                // updateProductWrapper.appendChild(updateProductPopup);

                // // Append wrapper to body
                // document.body.appendChild(updateProductWrapper);

    

            } catch (error) {
                console.error("Error fetching product details:", error);
                alert("Unable to load product for update.");
            }
        });
    }
}

customElements.define("update-button-component", UpdateButtonComponent);
export default UpdateButtonComponent;