import React, { useState, forwardRef, useRef, useEffect } from "react";

const UpdateProductComponent = forwardRef(({onClose, popupStyle}, ref) => {
    const [productId, setProductId] = useState("");
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("");

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
    
    // Fetching the product details ... 
    const fetchProductDetails = async () => {
        const API_ROUTE = "/products/byId";
        const IS_DEVELOPMENT = import.meta.env.MODE === "development";
        const rqstURL = IS_DEVELOPMENT ? API_ROUTE : `${import.meta.env.VITE_API_BASE_URL}${API_ROUTE}`;
        try {
            const res = await fetch(`${rqstURL}/${productId}`);
            console.log(`Request is sent to: ${rqstURL}/${productId}`);

            if (!res.ok) {
                throw new Error("Failed to fetch product details.");
            }
            const data = await res.json();
            setProduct(data.data); // access the actual product from `data`
            setStatus(null);
        } catch (error) {
            // console.error("Error fetching product details:", error);
            setStatus("Product not fetched.");
            setProduct(null);
        }
    };

    // Updating the product ... 
    const updateProduct = async () => {
        const API_ROUTE = "/products/byDetails";
        const IS_DEVELOPMENT = import.meta.env.MODE === "development";
        const rqstURL = IS_DEVELOPMENT ? API_ROUTE : `${import.meta.env.VITE_API_BASE_URL}${API_ROUTE}`;
        try{
            const response = await fetch(`${rqstURL}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ productId, ...product })
            });

            const result = await response.json();
            if(!response.ok) {
                throw new Error(result.message || "Updation failed");
            }

            setStatus("Product updated successfully.");
            alert("Product updated successfully.");
            // Closing the Update-Popup on successful update!.
            onClose?.();
        } catch(err) {
            setStatus("Updation failed: " + err.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ 
            ...prev, 
            [name]: name==="price" || name==="quantity" ? Number(value) : value 
        }));
    };

    return (
        <div className="update-product-component" ref={localRef} style={styles.popup}>
            <button onClick={onClose} style={styles.closeX} aria-label="Close Popup">✖</button>
            <h2>Update Product using Product ID</h2>

            <input type="text" placeholder="Enter product ID:" value={productId} onChange = {(e)=> setProductId(e.target.value)} />
            <button onClick={fetchProductDetails}> Fetch Product</button>

            {product && (
                // <form style={styles.form} onSubmit={(e) => e.preventDefault()}> Styling...
                <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="productId">Product ID:</label>
                    <input type="text" name="productId" placeholder="Product ID:" value={product.productId} onChange={handleChange} disabled/>

                    <label htmlFor="name">Product Name:</label>
                    <input type="text" name="name" placeholder="Product Name:" value={product.name} onChange={handleChange} />

                    <label htmlFor="quantity">Quantity:</label>
                    <input type="number" name="quantity" placeholder="Quantity:" value={product.quantity} onChange={handleChange} />

                    <label htmlFor="price">Price:</label>
                    <input type="number" name="price" placeholder="Price:" value={product.price} onChange={handleChange} />

                    <label htmlFor="image">Image:</label>
                    <input type="file" name="image" placeholder="Image:" onChange={handleChange} />

                    <button onClick={updateProduct}>Update Product</button>
                    <button type="button" className="close-popup" onClick={onClose}>Close</button>
                </form>
            )}

            {status && <p>{status}</p>}
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
    top: "10%",
    left: "0",
    right: "0",
    height: "80%",
    overflow: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    // gap: "1rem",
    border: "1px solid blue",
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

export default UpdateProductComponent;

//  Post Rqst...
//  const res = await fetch(`${rqstURL}/${productId}`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json", },
//                 body: JSON.stringify({ productId }),
//             });