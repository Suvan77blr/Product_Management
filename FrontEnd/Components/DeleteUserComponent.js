
class DeleteUserComponent extends HTMLElement
{
    connectedCallback()
    {
        this.innerHTML=`
            <div class="delete-user-popup-container">
                <h2>Delete User</h2>
                <form class="delete-user-form">
                    <input type="text" id="username" placeholder="Name" name="username" required/>
                    <input type="email" id="email" placeholder="Email" name="email" required/>
                    <button type="submit">Delete</button?
                </form>
            </div>
        `;
        this.querySelector(".delete-user-popup-container").addEventListener("click",(event)=>{
            event.stopPropagation();
        })
        const form = this.querySelector(".delete-user-form");
        form.addEventListener("submit",async(event)=>{
            event.preventDefault();

            const username = this.querySelector("#username").value.trim();
            const email = this.querySelector("#email").value.trim();
            try
            {
                const response = await fetch("http://localhost:3000/users/byDetails",
                    {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({username,email})
                    }
                );
                const result = await response.json();
                alert(result.message);
                this.remove()
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