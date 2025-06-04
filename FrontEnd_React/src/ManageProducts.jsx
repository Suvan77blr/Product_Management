import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./components/PageFooterComponent.js"
import "./components/ListItemComponent.js"

const ManageProducts = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const footerElement = document.querySelector("page-footer-component");

        const handleLogout = () => {
        navigate("/login"); // React Router handles redirect
        };

        footerElement?.addEventListener("logout", handleLogout);

        return () => {
            footerElement?.removeEventListener("logout", handleLogout);
        };
    }, [navigate]);
    // State to hold product list
    const API_ROUTE = "/products";
    const IS_DEVELOPMENT = import.meta.env.MODE === 'development';
    const rqstURL = IS_DEVELOPMENT ? API_ROUTE : (import.meta.env.VITE_API_BASE_URL + API_ROUTE);
    console.log('Requesting API URL:', rqstURL); 

    const [productList, setProductList] = useState(null);

    // To control visibility of popup components
    const [showViewProducts, setShowViewProducts] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showDeleteProduct, setShowDeleteProduct] = useState(false);

    // Handling clicks outside the popups to close them.
    useEffect( () => {
        const handleBodyClick = () => {
            setShowViewProducts(false);
            setShowAddProduct(false);
            setShowDeleteProduct(false);
        };

        if (showViewProducts || showAddProduct || showDeleteProduct) {
            document.body.addEventListener("click", handleBodyClick);
        }

        return () => {
            document.body.removeEventListener("click", handleBodyClick);
        };
    }, [showViewProducts, showAddProduct, showDeleteProduct]);

    // Fetching products from API.
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${rqstURL}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );

            if(response.ok) {
                const result = await response.json();
                setProductList(result.data);
            } else {
                setProductList([]);
                alert("No Products found");
            }
        } catch(error) {
            alert("Error fetching Products");
            console.error(error);
            setProductList([]);
        }
    };

    // Map headers to keys for list-item-component.
    const productsListMenuBar = ["ID", "Name", "Quantity", "Unit Price", "OptionsBtn", "DeleteBtn"];
    const headerToKeyMap = {
        "ID": "productId",
        "Name": "name",
        "Quantity": "quantity",
        "Unit Price": "price",
    };
    const productsListTitle = "Product List";

    // Style object for popups (similar to your inline styles)
    const popupStyle = {
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        height: "90%",
        width: "90%",
        overflow: "auto",
        zIndex: 1000,
        backgroundColor: "white",
        boxShadow: "0 0 15px rgba(0,0,0,0.3)",
    };

    const listItemRef = useRef(null);
    useEffect(() => {
        if (showViewProducts && listItemRef.current && Array.isArray(productList)) {
            listItemRef.current.initialize(
            productList,
            productsListMenuBar,
            productsListTitle,
            headerToKeyMap,
            rqstURL  // using the computed request URL here!
        );
        // Force render of the component's internal DOM after initialize
        listItemRef.current.connectedCallback();
        }
    }, [showViewProducts, productList, rqstURL]); // run this effect when any dependency changes

    
    return (
    <div className="products-container container">
        <h2>Product Inventory</h2>
            <div className="buttonsContainer">
                <button
                    className="viewProductsButton"
                    onClick={(e) => {
                        e.stopPropagation();
                        fetchProducts();
                        setShowViewProducts(true);
                        setShowAddProduct(false);
                        setShowDeleteProduct(false);
                    }}
                >
                View Products
                </button>

                <button
                    className="addProductButton"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowAddProduct(true);
                        setShowViewProducts(false);
                        setShowDeleteProduct(false);
                    }}
                >
                Add Product
                </button>
                <button
                    className="deleteProductButton"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteProduct(true);
                        setShowViewProducts(false);
                        setShowAddProduct(false);
                    }}
                >
                Delete Product
                </button>
            </div>

            <div className="displayContainer"></div>

            {/* Render custom web components conditionally */}
            
            {showViewProducts && Array.isArray(productList) && productList.length > 0 && (
                <list-item-component
                    style={popupStyle}
                    ref={listItemRef}
                    // Prevent clicks inside popup from bubbling to body (which closes popup)
                    onClick={(e) => e.stopPropagation()}
                />
            )}

            {showAddProduct && (
            <add-product-component
                style={{
                    ...popupStyle,
                    height: "auto",
                    width: "auto",
                    transform: "translate(-50%, 50%)",
                }}
                onClick={(e) => e.stopPropagation()}
            />
            )}

            {showDeleteProduct && (
            <delete-product-component
                style={{
                    ...popupStyle,
                    height: "auto",
                    width: "auto",
                    transform: "translate(-50%, 50%)",
                }}
                onClick={(e) => e.stopPropagation()}
            />
            )}

            {/* Page footer component */}
            <page-footer-component buttons={JSON.stringify(["dashboard", "back", "logout"])} />
        </div>
    );
};

export default ManageProducts;