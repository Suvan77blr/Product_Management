
class DeleteUserComponent extends HTMLElement
{
    connectedCallback()
    {
        this.innerHTML=`
            <div class="delete-user-popup-container">
                <h2>Delete User 
                    <button class="close-button">x</button>
                </h2>
                <form class="delete-user-form">
                    <input type="text" id="userId" placeholder="ID" name="userId" required/>
                    <input type="email" id="email" placeholder="Email" name="email" required/>
                    <button type="submit">Delete</button?
                </form>
            </div>
        `;
        this.querySelector(".delete-user-popup-container").addEventListener("click",(event)=>{
            event.stopPropagation();
        });

        this.querySelector(".close-button").addEventListener("click", () => {
            this.remove();
        });

        const form = this.querySelector(".delete-user-form");
        form.addEventListener("submit",async(event)=>{
            event.preventDefault();

            const userId = this.querySelector("#userId").value.trim();
            const email = this.querySelector("#email").value.trim();
            try
            {
                const response = await fetch(`${API_BASE_URL}/users/byDetails`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({userId ,email})
                });

                const result = await response.json();
                alert(result.message || "User deleted!");

                
                if(response.ok && result.success) {
                    this.remove();    // Removing only when success; else User can edit the form.
                }
            }
            catch(error)
            {
                alert("error deleting the user");
                console.log("Error deleting user:",error);
            }
        })

    }
}

customElements.define("delete-user-component",DeleteUserComponent);