import DeleteButtonComponent from "./DeleteButtonComponent.js";

class ListItemComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    initialize(objectItemsArray, listHeaderBar, listTitle, headerToKeyMap, associatedServerRoute)
    {
        this.objectItemsArray = objectItemsArray;
        this.listHeaderBar = listHeaderBar;
        this.listTitle = listTitle;
        this.headerToKeyMap = headerToKeyMap;
        this.associatedServerRoute = associatedServerRoute;
    }

    connectedCallback()
    {
        this.innerHTML = `
            
            <div class="product-list-outer-container container">
                <div class="list-header">
                    <div class="first-line">
                        <h2>${this.listTitle}
                            <button class="list-close-button">x</button>
                        </h2>
                    </div>
                </div>
                <div class="product-list-container">

                </div>
            </div>
        `;

        // Fallback condition for no-items ... yet to be tested.
        if (!Array.isArray(this.objectItemsArray) || this.objectItemsArray.length === 0) {
            const productListContainer = this.querySelector(".product-list-container");
            productListContainer.innerHTML = "<p>No products available.</p>";
            return;
        }

        const productListOuterContainer = this.querySelector(".product-list-outer-container");
        productListOuterContainer.style.display = "flex";
        productListOuterContainer.style.flexDirection = "column";
        productListOuterContainer.style.maxHeight = "90%";

        // Handling the Elements of the List-Header.
        const listHeader = this.querySelector(".list-header");
        listHeader.style.display = "flex";
        listHeader.style.flexDirection = "column";
        listHeader.style.position = "sticky";
        listHeader.style.top = "0";
        listHeader.style.zIndex = "10";
        listHeader.style.background = "lightyellow";


        const listHeaderBarDiv = document.createElement("div");
        // Giving same class name for the styling purpose.
        listHeaderBarDiv.className = "productDiv";

        for(var headerString of this.listHeaderBar) {
            var headerSpan = document.createElement("span");
            headerSpan.className = "valueSpan";
            headerSpan.innerHTML = headerString;
            listHeaderBarDiv.appendChild(headerSpan);
        }

        // productListContainer.append(listHeaderBarDiv);
        listHeader.appendChild(listHeaderBarDiv);


        // Main-content handling.
        const productListContainer = this.querySelector(".product-list-container");
        productListContainer.style.height = "100%";
        productListContainer.style.display = "flex";
        productListContainer.style.flexDirection = "column";
        
        productListContainer.style.overflowY = "auto";
        productListContainer.style.flex = "1";

        console.log(this.objectItemsArray);
        
        for(var product of this.objectItemsArray) 
        {
            var productDiv = document.createElement("div");
            productDiv.className = "productDiv";
            productDiv.style.margin = "10px";

            // Iterating over header-strings for the keys of each row.
            for (let headerName of this.listHeaderBar) 
            {
                const valueSpan = document.createElement("span");
                valueSpan.className = "valueSpan";
                if (this.headerToKeyMap[headerName]) 
                {
                    // Rendering the value from product object.
                    const key = this.headerToKeyMap[headerName];
                    valueSpan.textContent = product[key] !== undefined ? product[key] : "";
                } 
                else if (headerName === "DeleteBtn") 
                {
                    // Rendering the delete-button-component.
                    const deleteBtn = document.createElement("delete-button-component");
                    deleteBtn.initialize(product.name, this.associatedServerRoute);
                    valueSpan.appendChild(deleteBtn);
                }
                else {
                    // Temporary setting.
                    valueSpan.textContent = `${headerName}?`;
                }
                productDiv.appendChild(valueSpan);  // Horizontal List Item is created.
            }
            productListContainer.appendChild(productDiv);
            
        }

        // Event Listener to handle the removal of deleted item from the local objectItemsArray.
        this.addEventListener("item-deleted", (e) => 
        {
            const nameToDelete = e.detail.name;

            // ✅ Remove from local array
            const index = this.objectItemsArray.findIndex(p => p.name === nameToDelete);
            if (index !== -1) {
                this.objectItemsArray.splice(index, 1);
            }

            // ✅ Remove from DOM
            const productDivs = this.querySelectorAll(".productDiv");
            productDivs.forEach(div => {
                if (div.textContent.includes(nameToDelete)) {
                    div.remove();
                }
            });
        });

        this.querySelectorAll(".productDiv").forEach( (productDiv) => {
            productDiv.style.border = "solid 2px black";
            productDiv.style.margin = "10px 0";
            productDiv.style.display = "flex";
            productDiv.style.justifyContent = "space-between";
        })

        this.querySelectorAll(".valueSpan").forEach((spanElement) => {
            spanElement.style.margin = "0px 4px";
            spanElement.style.border = "solid 2px pink";
        });

         // Prevent event bubbling inside the popup
        productListOuterContainer.addEventListener("click", (event) => {
            event.stopPropagation();
        });

        const listCloseButton = this.querySelector(".list-close-button");
        listCloseButton.onclick = () => {
            this.remove();
        };
    }
}

customElements.define("list-item-component", ListItemComponent);
export default ListItemComponent;