import React, { useState, useRef, useEffect, forwardRef } from "react";

// const AddProductComponent = ({ onClose, onProductAdded }) => {
const AddProductComponent = forwardRef(({ onClose, onProductAdded }, ref) => {
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const imageInputRef = useRef();
    
    const localRef = useRef();  // Local ref to the container.

    // Hooking the forwarded ref to the local DOM node.
    useEffect(() => {
        if(ref) {
            if(typeof ref === "function") {
                ref(localRef.current);
            } else {
                ref.current = localRef.current;
            }
        }
    }, [ref]);

    // Outside click detection.
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

        if (!productId || !productName || !quantity || !price) {
            alert("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("productId", productId.trim());
        formData.append("name", productName.trim());
        formData.append("quantity", quantity);
        formData.append("price", price);

        const imageFile = imageInputRef.current?.files[0];
        if (imageFile) {
            formData.append("image", imageFile);
        }

        const API_ROUTE = "/products";
        const IS_DEVELOPMENT = import.meta.env.MODE === "development";
        const rqstURL = IS_DEVELOPMENT ? API_ROUTE : `${import.meta.env.VITE_API_BASE_URL}${API_ROUTE}`;

        try {
            const response = await fetch(rqstURL, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log("Server response:", result);

            if (response.ok && result.success) {
                alert(result.message || "Product added successfully!");

            // Optional callback to parent
                onProductAdded?.();

                // Reset form and close
                setProductId("");
                setProductName("");
                setQuantity("");
                setPrice("");
                if (imageInputRef.current) imageInputRef.current.value = "";

                onClose?.();
            } else {
                alert(result.message || "Failed to add product.");
                console.error("Server error:", result);
            }
        } catch (err) {
            console.error("Error adding product:", err);
            alert("An error occurred while adding the product.");
        } finally {
        setIsSubmitting(false);
        }
    };

    return (
    <div className="popup-container" onClick={(e) => e.stopPropagation()} style={styles.popup}>
        <h2>Add New Product</h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>
            <label htmlFor="productId">Product ID:</label>
            <input type="text" id="productId" value={productId} onChange={(e) => setProductId(e.target.value)} placeholder="Enter product ID" required />

            <label htmlFor="productName">Product Name:</label>
            <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Enter product name" required />

            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Enter quantity" min="0" required />

            <label htmlFor="price">Product Unit Price:</label>
            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter unit price" min="0" required />

            <label htmlFor="image">Product Image:</label>
            <input type="file" id="image" accept="image/*" ref={imageInputRef} />

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Product"}
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
    overflow: "auto",
},
form: {
    border: "1px solid blue",
    gap: "1rem",
  },
};

export default AddProductComponent;
