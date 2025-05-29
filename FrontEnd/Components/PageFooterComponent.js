
class PageFooterComponent extends HTMLElement 
{
    constructor() 
    {
        super();
    }
    
    goToDashboard() {
        // window.location.href = "../Pages/SuperUserPage.html";
        alert("Server-side logic to be implemented ... ");
    }
    
    goBack() {
        window.history.back();
    }

    userLogout() {
        window.location.href = "../Pages/LoginPage.html";
    }

    // ... other methods, if any.

    initialize(buttonsList)
    {   
        this.buttonsList = buttonsList;
    }

    connectedCallback()
    {
        this.innerHTML = `
            <footer class="page-footer"></footer>
        `;

        if(this.buttonsList === undefined) {
            const buttonsAttribute = this.getAttribute("buttons");
            try {
                this.buttonsList = JSON.parse(buttonsAttribute);
            } catch(e) {
                console.warn("Invalid 'buttons' attribute passed in <page-footer-component>");                
            }
        }

        // if(this.buttonsList.length === 0)
        //     return;
        console.log(this.buttonsList);
        const pageFooter = this.querySelector(".page-footer");

        const pageFooterButtonsContainer = document.createElement("div");
        pageFooterButtonsContainer.className = "page-footer-button-container";
        
        this.buttonsList.forEach((buttonType) => {
            let footerBtn = document.createElement("button");
            footerBtn.className = "page-footer-btn";

            switch(buttonType) 
            {
                case "dashboard":
                    footerBtn.textContent = "Dashboard";
                    footerBtn.onclick = this.goToDashboard;
                    break;

                case "back":
                    footerBtn.textContent = "Back";
                    footerBtn.onclick = this.goBack;
                    break;

                case "logout":
                    footerBtn.textContent = "Logout";
                    footerBtn.onclick = this.userLogout;
                    break;

                default:
                    console.warn(`Unknown button type: ${btnType}`);
                    return;
            }
            pageFooter.appendChild(footerBtn);
            // pageFooterButtonsContainer.appendChild(footerBtn);
        });
        // pageFooter.appendChild(pageFooterButtonsContainer);
    }
}

customElements.define("page-footer-component", PageFooterComponent);
export default PageFooterComponent;