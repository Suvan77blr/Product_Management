
class PageFooterComponent extends HTMLElement 
{
    constructor() {
        super();
        this.buttonsList = []; // Initialize empty by default
        // this._boundDashboard = this.goToDashboard.bind(this);
        // this._boundBack = this.goBack.bind(this);
        // this._boundLogout = this.userLogout.bind(this);
    }
    
    goToDashboard() {
        // window.location.href = "../Pages/SuperUserPage.html";
        alert("Server-side logic to be implemented ... ");
    }
    
    goBack() {
        window.history.back();
    }

    userLogout() {
        localStorage.removeItem("token");
        // window.location.href = "../Pages/LoginPage.html";
        this.dispatchEvent(new CustomEvent("logout", { bubbles: true }));
    }

    static get observedAttributes() {
        return ["buttons"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "buttons") {
            try {
                this.buttonsList = JSON.parse(newValue);
                this.render(); // Re-render on attribute change
            } catch (e) {
                console.warn("Invalid 'buttons' JSON:", newValue);
            }
        }
    }

    // ... other methods, if any.

    initialize(buttonsList)
    {   
        this.buttonsList = buttonsList;
    }

    connectedCallback()
    {
        if (!this.buttonsList || this.buttonsList.length === 0) {
            const attr = this.getAttribute("buttons");
            if (attr) {
                try {
                    this.buttonsList = JSON.parse(attr);
                } catch (e) {
                    console.warn("Invalid 'buttons' attribute");
                    this.buttonsList = [];
                }
            }
        }
        this.render();
    }
    render() {
        this.innerHTML = `
            <footer class="page-footer"></footer>
        `;
        
        const pageFooter = this.querySelector(".page-footer");
        if (!this.buttonsList || this.buttonsList.length === 0) return;
        console.log(this.buttonsList);

        // const pageFooterButtonsContainer = document.createElement("div");
        // pageFooterButtonsContainer.className = "page-footer-button-container";
        
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