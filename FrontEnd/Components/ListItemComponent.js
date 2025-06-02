import DeleteButtonComponent from "./DeleteButtonComponent.js";
import AddProductComponent from "./AddProductComponent.js";

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

    applyStyles(element, stylesObj) {
        for(let key in stylesObj) {
            element.style[key] = stylesObj[key]
        }
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
                <table class="product-list-container"></table>
            </div>
        `;

        // Handling the Outer-Container.
        const productListOuterContainer = this.querySelector(".product-list-outer-container");
        if(productListOuterContainer){
            const productListOuterContainer_styles = {
                display: "flex",
                flexDirection: "column",
                border: "solid 2px #f5951e"
            };
            this.applyStyles(productListOuterContainer, productListOuterContainer_styles);
        }

        // Handling the Elements of the List-Header.
        this.renderListHeader();
        const listHeader = this.querySelector(".list-header");
        if(listHeader) {
            const listHeader_styles = {
                "display": "flex",
                "flexDirection": "column",
                "position": "sticky",
                "top": "0",
                "zIndex": "10",
                "background": "lightyellow"
            };
            this.applyStyles(listHeader, listHeader_styles);
        }
        
        // Logic-Handling Starts from here.
        // Fallback condition for no-items ... yet to be tested.
        if (!Array.isArray(this.objectItemsArray) || this.objectItemsArray.length === 0) {
            console.log("Empty Products-List");
            const productListContainer = this.querySelector(".product-list-container");
            productListContainer.innerHTML = `<tr>
                <td colspan="${this.listHeaderBar.length}"> No items accounted.</td>
            </tr>`;
            return;
        }
        
        // Main-content handling.
        const productListContainer = this.querySelector(".product-list-container");
        if(productListContainer) {
            const productListContainer_styles = {
                "height": "100%",
                "overflowY": "auto",
                "flex": "1"
            };
            this.applyStyles(productListContainer, productListContainer_styles);
        }        

        console.log(this.objectItemsArray);
        const productRow_styles = {
            "border": "solid 2px black",
            "margin": "10px 0",
            "display": "flex",
            "justifyContent": "space-between",
            "alignItems": "center"
        }
        for(var product of this.objectItemsArray) 
        {
            var productRow = document.createElement("tr");
            productRow.className = "productRow";
            this.applyStyles(productRow, productRow_styles);

            // Iterating over header-strings for the keys of each row.
            for (let headerName of this.listHeaderBar) 
            {
                const rowData = document.createElement("td");
                rowData.className = "rowData";
                rowData.style.flex = "1";

                if (this.headerToKeyMap[headerName]) 
                {
                    // Rendering the value from product object.
                    const key = this.headerToKeyMap[headerName];
                    rowData.textContent = product[key] !== undefined ? product[key] : "";
                } 
                else if (headerName === "DeleteBtn") 
                {
                    // Rendering the delete-button-component.
                    const deleteBtn = document.createElement("delete-button-component");
                    deleteBtn.initialize(product.productId, this.associatedServerRoute);
                    rowData.appendChild(deleteBtn);
                }
                else {
                    // Temporary setting.
                    rowData.textContent = `${headerName}?`;
                }
                productRow.appendChild(rowData);  // Horizontal List Item is created.
            }
            productListContainer.appendChild(productRow);            
        }

        // Rendering the Button in Last Row.
        this.renderAddProductButton();

        // EVENT-LISTENERS:

        // Event Listener for Add-Product-Button.
        const addNewProductBtn = this.querySelector(".add-new-product-button");
        addNewProductBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            
            const addProductPopup = document.createElement("add-product-component");
            addProductPopup.style.position = "fixed";
            addProductPopup.style.left = "50%";
            addProductPopup.style.top = "50%";
            addProductPopup.style.transform = "translate(-50%, 50%)";

            addProductPopup.addEventListener("product-added", async () => {
                let updatedListItems = await this.fetchProductsFromServer();
                this.objectItemsArray = updatedListItems;
                this.innerHTML = "";
                this.connectedCallback();
            });
            document.body.appendChild(addProductPopup);
        });

        // Delete-Button Event Listener.
        this.addEventListener("item-deleted", (e) => 
        {
            const productIdDeleted = e.detail.productId;

            // ✅ Remove from local array
            const index = this.objectItemsArray.findIndex(p => p.name === productIdDeleted);
            if (index !== -1) {
                this.objectItemsArray.splice(index, 1);
            }

            // ✅ Remove from DOM
            const productRows = this.querySelectorAll(".productRow");
            productRows.forEach(rowItem => {
                if (rowItem.textContent.includes(productIdDeleted)) {
                    rowItem.remove();
                }
            });
        });

        // Prevent event bubbling inside the popup
        productListOuterContainer.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    }

    // Component's method to render the header-bar of the list.
    renderListHeader() {
        const listHeader = this.querySelector(".list-header");
        const listCloseButton = this.querySelector(".list-close-button");
        listCloseButton.onclick = () => {
            this.remove();
        };
        if(listHeader) {
            const listHeaderStyles = {
                "display": "flex",
                "flexDirection": "column",
                "position": "sticky",
                "top": "0",
                "zIndex": "10",
                "background": "lightyellow"
            }
            this.applyStyles(listHeader, listHeaderStyles);
        }


        const listHeaderBarDiv = document.createElement("div");
        // Giving same class name for the styling purpose.
        listHeaderBarDiv.className = "listHeaderDiv";
        listHeaderBarDiv.style.margin = "5px";
        listHeaderBarDiv.style.display = "flex";
        listHeaderBarDiv.style.justifyContent = "space-around";
        listHeaderBarDiv.style.alignItems = "center";
        listHeaderBarDiv.style.border = "solid 2px black";
        
        const headerSpan_styles = {
            "margin": "2px 4px",
            "fontWeight": "700",
            "fontSize": "1.15rem",
            "fontFamily": "monospace",
            "flex": "1"
        };

        for(var headerString of this.listHeaderBar) {
            var headerSpan = document.createElement("span");
            headerSpan.className = "headerSpan";
            headerSpan.innerHTML = headerString;
            this.applyStyles(headerSpan, headerSpan_styles);
            listHeaderBarDiv.appendChild(headerSpan);
        }

        // productListContainer.append(listHeaderBarDiv);
        listHeader.appendChild(listHeaderBarDiv);
    }

    renderAddProductButton() {
        const addNewProductBtn = document.createElement("button");
        addNewProductBtn.className = "add-new-product-button";
        addNewProductBtn.innerHTML = '<span style="font-weight: bold";>+</span>';
        
        const addNewProductBtn_styles = {
            "margin-left": "auto",
            "margin-right": "auto",
            "width": "50%"
        };

        this.applyStyles(addNewProductBtn, addNewProductBtn_styles);

        const addNewProductBtnTD = document.createElement("td");
        addNewProductBtnTD.colspan = this.listHeaderBar.length;
        addNewProductBtnTD.appendChild(addNewProductBtn);
        
        const listLastRow = document.createElement("tr");
        listLastRow.appendChild(addNewProductBtnTD);

        const productListContainer = this.querySelector(".product-list-container");
        productListContainer.appendChild(listLastRow);
    }

    async fetchProductsFromServer() {
        try {
            const response = await fetch("http://localhost:3000/products", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                const result = await response.json();
                return result.data;  // ✅ Returns array of products
            } else {
                console.warn("No products found.");
                return [];
            }

        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    }
}

customElements.define("list-item-component", ListItemComponent);
export default ListItemComponent;