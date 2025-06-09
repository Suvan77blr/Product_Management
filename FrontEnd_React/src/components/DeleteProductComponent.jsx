import React, { useState } from "react";

const DeleteProductComponent = () => {
  const [productId, setProductId] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDeleting(true);
    setMessage(null);
    setError(null);

    try {
      const API_ROUTE = "/products/byDetails";
      const IS_DEVELOPMENT = import.meta.env.MODE === "development";
      const rqstURL = IS_DEVELOPMENT
        ? API_ROUTE
        : `${import.meta.env.VITE_API_BASE_URL}${API_ROUTE}`;

      const response = await fetch(rqstURL, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      const responseText = await response.text();

      try {
        const result = JSON.parse(responseText);

        if (response.ok && result.status === "success") {
          setMessage("Product deleted successfully.");
          setProductId("");
        } else {
          setError(result.message || "Failed to delete product.");
        }
      } catch (jsonErr) {
        console.error("Not JSON:", responseText);
        setError("Server returned invalid response. See console.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred during deletion.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Delete a Product</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="productId">Enter Product ID:</label>
        <input
          type="text"
          id="productId"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete Product"}
        </button>
      </form>

      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "400px",
    margin: "0 auto",
    backgroundColor: "#f8f8f8",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.6rem",
    fontSize: "1rem",
    backgroundColor: "#d9534f",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  success: {
    color: "green",
    marginTop: "1rem",
  },
  error: {
    color: "red",
    marginTop: "1rem",
  },
};

export default DeleteProductComponent;
