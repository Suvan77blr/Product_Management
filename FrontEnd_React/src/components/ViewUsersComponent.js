
// Fix2 : Working FIX!!!
class ViewUsersComponent extends HTMLElement {
    constructor() {
        super();
    }

    initialize(usersList) {
        this.usersList = usersList;
        this.render(); // <== render when data is available
    }

    render() {
        this.innerHTML = `
            <div class="view-popup-container"></div>
        `;

        const popupContainer = this.querySelector(".view-popup-container");
        popupContainer.style.height = "87%";
        popupContainer.style.width = "92%";
        popupContainer.style.backgroundColor = "#f9c585";

        if (Array.isArray(this.usersList)) {
            popupContainer.innerHTML = `
                <div class="list-header">
                    <div class="first-line">
                        <h2>Users List
                            <button class="list-close-button">x</button>
                        </h2>
                    </div>
                </div>
                <table>
                    <tr><th>User ID</th><th>Name</th><th>Email</th><th>Role</th></tr>
                    ${this.usersList.map(user => `
                        <tr>
                            <td>${user.userId}</td>
                            <td>${user.username}</td>
                            <td>${user.email}</td>
                            <td>${user.role}</td>
                        </tr>
                    `).join("")}
                </table>
            `;
        } else {
            popupContainer.innerText = this.usersList || "No data available.";
        }

        // Prevent event bubbling inside the popup
        popupContainer.addEventListener("click", (event) => {
            event.stopPropagation();
        });

        const listCloseButton = this.querySelector(".list-close-button");

        if (listCloseButton) {
            listCloseButton.onclick = () => {
                this.dispatchEvent(new CustomEvent("close-list", { bubbles: true }));
            };
        }
    }

    connectedCallback() {
        // Do nothing here unless you want fallback UI
    }
}

customElements.define("view-users-component", ViewUsersComponent);
export default ViewUsersComponent;


// Fix 1:
// class ViewUsersComponent extends HTMLElement {
//     constructor() {
//         super();
//     }

//     initialize(usersList) {
//         this.usersList = usersList;
//     }

//     connectedCallback() {
//         this.innerHTML = `
//             <div class="view-popup-container"></div>
//         `;


//         const popupContainer = this.querySelector(".view-popup-container");

//         if (Array.isArray(this.usersList)) {
//             popupContainer.innerHTML = `
//                 <div class="list-header">
//                     <div class="first-line">
//                         <h2>Users List
//                             <button class="list-close-button">x</button>
//                         </h2>
//                     </div>
//                 </div>
//                 <table>
//                     <tr><th>User ID</th><th>Name</th><th>Email</th><th>Role</th></tr>
//                     ${this.usersList.map(user => `
//                         <tr>
//                             <td>${user.userId}</td>
//                             <td>${user.username}</td>
//                             <td>${user.email}</td>
//                             <td>${user.role}</td>
//                         </tr>
//                     `).join("")}
//                 </table>
//             `;
//         } else {
//             popupContainer.innerText = this.usersList || "No data available.";
//         }

//         console.log("UsersList:", this.usersList);

//         // Prevent event bubbling inside the popup
//         popupContainer.addEventListener("click", (event) => {
//             event.stopPropagation();
//         });

//         const listCloseButton = this.querySelector(".list-close-button");

//         if (listCloseButton) {
//             listCloseButton.onclick = () => {
//                 if (this.parentNode) {
//                     this.parentNode.removeChild(this);
//                 } else {
//                     console.warn("Element already removed or not in DOM.");
//                 }
//             };
//         }
//     }
// }

// customElements.define("view-users-component", ViewUsersComponent);
// export default ViewUsersComponent;

// ~ FIx1.


// Original Code:
// class ViewUsersComponent extends HTMLElement {
//     constructor() {
//         super();
//     }
//     initialize(usersList)
//     {   
//         this.usersList = usersList;
//     }
//     connectedCallback() {
//         this.innerHTML = `
//             <div class="view-popup-container">

//             </div>
//         `;

//         const popupContainer =this.querySelector(".view-popup-container");
//         // popupContainer.innerHTML= this.usersList;
//         if (Array.isArray(this.usersList)) {
//             popupContainer.innerHTML = `
//                 <div class="list-header">
//                     <div class="first-line">
//                         <h2>Users List
//                             <button class="list-close-button">x</button>
//                         </h2>
//                     </div>
//                 </div>
//                 <table>
//                     <tr><th>User ID</th><th>Name</th><th>Email</th><th>Role</th></tr>
//                     ${this.usersList.map(user => `
//                         <tr>
//                             <td>${user.userId}</td>
//                             <td>${user.username}</td>
//                             <td>${user.email}</td>
//                             <td>${user.role}</td>
//                         </tr>
//                     `).join("")}
//                 </table>
//             `;
//         } else {
//             popupContainer.innerText = this.usersList; // for error message string
//         }
//         console.log(this.usersList);
        
//         // Prevent event bubbling inside the popup
//         popupContainer.addEventListener("click", (event) => {
//             event.stopPropagation();
//         });

//         const listCloseButton = this.querySelector(".list-close-button");
//         listCloseButton.onclick = () => {
//             this.remove();
//         };

//     }
// }

// customElements.define("view-users-component", ViewUsersComponent);
// export default ViewUsersComponent;
