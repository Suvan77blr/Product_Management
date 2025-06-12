import React, {useState, forwardRef, useRef, useEffect} from "react";

const UpdateUserComponent = forwardRef(({ onClose, popupStyle }, ref) => {
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("");

    const localRef = useRef();  // Local ref to the container.

    // Attach forwarded ref
    useEffect(() => {
        if (ref) {
            if( typeof ref == "function") {
                ref(localRef.current);
            } else {
                ref.current = localRef.current;
            }
        }
    }, [ref]);

    // Outside click detection
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!localRef.current || localRef.current.contains(event.target)) {
                return;
            }
            onClose?.();
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [onClose]);

    // Fetching the user by Id.
    const fetchUserDetails = async () => {
        const API_ROUTE = "/users/byId";
        const IS_DEVELOPMENT = import.meta.env.MODE === "development";
        const rqstURL = IS_DEVELOPMENT ? API_ROUTE : `${import.meta.env.VITE_API_BASE_URL}${API_ROUTE}`;
        try {
            const res = await fetch(`${rqstURL}/${userId}`);
            console.log(`Request is sent to: ${rqstURL}/${userId}`);

            if (!res.ok) {
                throw new Error("Failed to fetch user details.");
            }
            const data = await res.json();
            setUser(data.data); // access the actual user from `data`
            setStatus(null);
        } catch (error) {
            console.error("Error fetching user details:", error);
            setStatus("User not fetched.");
            setUser(null);
        }
    };

    // Updating the user.
    const updateUser = async () => {
        const API_ROUTE = "/users/byId";
        const IS_DEVELOPMENT = import.meta.env.MODE === "development";
        const rqstURL = IS_DEVELOPMENT ? API_ROUTE : `${import.meta.env.VITE_API_BASE_URL}${API_ROUTE}`;

        try{
            const response = await fetch(`${rqstURL}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ userId, ...user })
            });

            const result = await response.json();
            if(!response.ok) {
                throw new Error(result.message || "Updation failed");
            }

            setStatus("User updated successfully.");
            alert("User updated successfully.");
            // Closing the Update-Popup on successful update!.
            onClose?.();
        } catch(err) {
            setStatus("Updation failed: " + err.message);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="update-user-component" ref={localRef} style={styles.popup}>
            <button onClick={onClose} style={styles.closeX}>✖</button>
            <h2>Update User using User ID</h2>

            <input type="text" placeholder="Enter User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <button onClick={fetchUserDetails}>Fetch User</button>

            {user && (
                <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="userId">User ID:</label>
                    <input type="text" name="userId" value={user.userId} disabled />

                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" value={user.email || ""} onChange={handleChange} />

                    <label htmlFor="name">Name:</label>
                    <input type="text" name="username" value={user.username || ""} onChange={handleChange} />

                    <label htmlFor="role">Role:</label>
                    <input type="text" name="role" value={user.role || ""} onChange={handleChange} />
{/* 
                    <label htmlFor="phone">Phone:</label>
                    <input type="text" name="phone" value={user.phone || ""} onChange={handleChange} /> */}

                    <button onClick={updateUser}>Update User</button>
                    <button type="button" onClick={onClose}>Close</button>
                </form>
            )}

            {status && <p>{status}</p>}
        </div>
    );
});

const styles = {
    popup: {
        padding: "1.5rem",
        backgroundColor: "#fff",
        borderRadius: "8px",
        maxWidth: "500px",
        margin: "auto",
        boxShadow: "0 0 15px rgba(0,0,0,0.2)",
        zIndex: 1000,
        position: "absolute",
        top: "10%",
        left: "0",
        right: "0",
        height: "80%",
        overflowY: "auto",
        border: "1px solid green",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        // gap: "1rem",
        border: "1px solid gray",
        padding: "1rem",
    },
    
    closeX: {
        position: "absolute",
        top: "8px",
        right: "10px",
        border: "none",
        background: "transparent",
        fontSize: "1.2rem",
        cursor: "pointer",
        color: "#333",
    },
};

export default UpdateUserComponent;