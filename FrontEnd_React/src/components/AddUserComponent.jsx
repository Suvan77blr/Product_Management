import React, { useState, useRef, useEffect, forwardRef } from "react";

const AddUserComponent = forwardRef(({ onClose, onUserAdded }, ref) => {
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const localRef = useRef();

    // Hook forwarded ref to local DOM node
    useEffect(() => {
        if (ref) {
            if (typeof ref === "function") {
                ref(localRef.current);
            } else {
                ref.current = localRef.current;
            }
        }
    }, [ref]);

    // Outside click to close
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (localRef.current && !localRef.current.contains(event.target)) {
                onClose?.();
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId || !username || !password || !email || !role) {
            alert("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        const payload = {
            userId: userId.trim(),
            username: username.trim(),
            password,
            email: email.trim(),
            role
        };

        // const formData = new FormData();
        // formData.append("userId", userId.trim());
        // formData.append("username", username.trim());
        // formData.append("password", password);
        // formData.append("email", email.trim());
        // formData.append("role", role);

        const API_ROUTE = "/users";
        const IS_DEVELOPMENT = import.meta.env.MODE === "development";
        const rqstURL = IS_DEVELOPMENT ? API_ROUTE : `${import.meta.env.VITE_API_BASE_URL}${API_ROUTE}`;

        try {
            const response = await fetch(rqstURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
                // body: formData
            });

            if (!response.ok) {
                const text = await response.text(); // fallback for invalid JSON
                throw new Error(text || "Unknown error");
            }

            const result = await response.json();
            console.log("Server response:", result);

            if (response.ok && result.success) {
                alert(result.message || "User added!");
                onUserAdded?.();

                // Reset form
                setUserId("");
                setUsername("");
                setPassword("");
                setEmail("");
                setRole("user");

                onClose?.();
            } else {
                alert(result.message || "Failed to add user.");
                console.error("Server error:", result);
            }
        } catch (err) {
            console.error("Error adding user:", err);
            alert("An error occurred while adding the user.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="popup-container" onClick={(e) => e.stopPropagation()} style={styles.popup} ref={localRef}>
            <h2>Add New User</h2>

            <form onSubmit={handleSubmit} style={styles.form}>
                <label htmlFor="userId">User ID:</label>
                <input type="text" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Enter user ID" required />

                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />

                <label htmlFor="role">Role:</label>
                <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="user">User</option>
                    <option value="superuser">Superuser</option>
                </select>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add User"}
                </button>
                <button type="button" className="close-popup" onClick={onClose}>
                    Close
                </button>
            </form>
        </div>
    );
});

const styles = {
    popup: {
        padding: "1.5rem",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        maxWidth: "500px",
        margin: "auto",
        boxShadow: "0 0 15px rgba(0,0,0,0.2)",
        zIndex: "1000",
        border: "1px solid red",
        position: "absolute",
        height: "80%",
        overflow: "auto"
    },
    form: {
        border: "1px solid blue",
        gap: "1rem"
    }
};

export default AddUserComponent;
