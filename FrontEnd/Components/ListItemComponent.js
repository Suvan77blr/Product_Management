
class ListItemComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    initialize(objectItemsArray, listHeaderBar, listHeading)
    {
        this.objectItemsArray = objectItemsArray;
        this.listHeaderBar = listHeaderBar;
        this.listHeading = listHeading;
    }

    connectedCallback()
    {
        this.innerHTML = `
            
            <div class="product-list-outer-container container">
                <div class="list-header">
                    <div class="first-line">
                        <h2>${this.listHeading}
                            <button class="list-close-button">x</button>
                        </h2>
                    </div>
                </div>
                <div class="product-list-container">

                </div>
            </div>
        `;

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
        
        for(var idx in this.objectItemsArray) 
        {
            var productDiv = document.createElement("div");
            productDiv.className = "productDiv";
            productDiv.style.margin = "10px";

            var currObj = this.objectItemsArray[idx];

            for(var key in currObj) 
            {
                const valueSpan = document.createElement("span");
                valueSpan.className = "valueSpan";
                valueSpan.innerHTML = currObj[key];
                productDiv.appendChild(valueSpan);
            }

            productListContainer.appendChild(productDiv);
            
        }

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