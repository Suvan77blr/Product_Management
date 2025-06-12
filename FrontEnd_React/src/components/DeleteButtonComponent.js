

class DeleteButtonComponent extends HTMLElement
{
    constructor() 
    {
        super();
    }

    initialize(listItemId, serverRoute)
    {
        this.listItemId = listItemId;
        this.serverRoute = serverRoute;
    }

    connectedCallback()
    {
        this.innerHTML = `
            <button class="list-component-delete-button">
             <img src="/assets/deleteButtonIcon.jpg" height=30 width=25></img></button>
        `;

        // const deleteButton = this.querySelector(".list-component-delete-button");
        this.addEventListener("click", async (event) =>
        {
            event.preventDefault();

            alert(`${this.listItemId} is about to be deleted!`);
        
            const API_ROUTE = "/products/byDetails";
            const IS_DEVELOPMENT = import.meta.env.MODE === "development";
            const rqstURL = IS_DEVELOPMENT ? API_ROUTE : `${import.meta.env.VITE_API_BASE_URL}${API_ROUTE}`;
            try {
                const response = await fetch(`${rqstURL}`, {
                    method: "DELETE",
                    headers:{"Content-Type":"application/json"},
                    // body: JSON.stringify({productName})
                    body: JSON.stringify({productId: this.listItemId})
                });

                const result = await response.json();
                alert(result.message || "Product deleted!");

                this.dispatchEvent(new CustomEvent("item-deleted", {
                    bubbles: true,
                    composed: true,
                    detail: { productId: this.listItemId }
                }));

            }
            catch(error) {
                console.error("Error while deleting the product:",error.message);
            }
        });
    }
}

customElements.define("delete-button-component", DeleteButtonComponent);
export default DeleteButtonComponent;