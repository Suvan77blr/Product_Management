import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./components/PageFooterComponent.js";
import "./components/ListItemComponent.js";
// import "./components/AddProductComponent.js";
// import "./components/DeleteProductComponent.js";
import DeleteProductComponent from "./components/DeleteProductComponent.jsx" ;
import AddProductComponent from "./components/AddProductComponent.jsx";
import UpdateProductComponent from "./components/UpdateProductsComponent.jsx";

// import useOutsideClick from "./hooks/useOutsideClick.jsx";
import useFooterLogout from "./hooks/useFooterLogout.js";

const ManageProducts = () => {
    const navigate = useNavigate();
    
    // OLD way of non-DRY logout logic.
    // useEffect(() => {
    //     const footerElement = document.querySelector("page-footer-component");

    //     const handleLogout = () => {
    //         navigate("/login"); // React Router handles redirect
    //     };

    //     footerElement?.addEventListener("logout", handleLogout);

    //     return () => {
    //         footerElement?.removeEventListener("logout", handleLogout);
    //     };
    // }, [navigate]);

    // const logout = useFooterLogout();
    
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

    const [showUpdateProduct, setShowUpdateProduct] = useState(false);
    // Handling clicks outside the popups to close them.

    const listItemRef = useRef(null);
    const addProductRef = useRef(null);
    const deleteProductRef = useRef(null);

    const updateProductRef = useRef(null);
    
/* New Updation */
    const pageFooterRef = useRef(null);
    const logout = useFooterLogout();    

    useEffect( () => {
        const listEl = listItemRef.current;
        const addEl = addProductRef.current;
        const delEl = deleteProductRef.current;

        const updateEl = updateProductRef.current;

        
        if (!listEl && !addEl && !delEl && !updateEl) return;

        const handleListClose = (e) => {
            e.stopPropagation();
            setShowViewProducts(false);
        };
        const handleAddClose = (e) => {
            e.stopPropagation();
            setShowAddProduct(false);
        };
        const handleDeleteClose = (e) => {
            e.stopPropagation();
            setShowDeleteProduct(false);
        };
        const handleUpdateClose = (e) => {
            e.stopPropagation();
            setShowUpdateProduct(false);
        }

        // listEl?.addEventListener("close-list", handleListClose);
        // addEl?.addEventListener("close-add", handleAddClose);
        // delEl?.addEventListener("close-delete", handleDeleteClose);
        if (listEl) listEl.addEventListener("close-list", handleListClose);
        if (addEl) addEl.addEventListener("close-add", handleAddClose);
        if (delEl) delEl.addEventListener("close-delete", handleDeleteClose);
        if (updateEl) updateEl.addEventListener("close-update", handleUpdateClose);

        return () => {
            // listEl.removeEventListener("close-list", handleListClose);
            // addEl.removeEventListener("close-add", handleAddClose);
            // delEl.removeEventListener("close-delete", handleDeleteClose);
            if (listEl?.removeEventListener) listEl.removeEventListener("close-list", handleListClose);
            if (addEl?.removeEventListener) addEl.removeEventListener("close-add", handleAddClose);
            if (delEl?.removeEventListener) delEl.removeEventListener("close-delete", handleDeleteClose);
            if (updateEl?.removeEventListener) updateEl.removeEventListener("close-update", handleUpdateClose);
        };
    }, [showViewProducts, showAddProduct, showDeleteProduct, showUpdateProduct]);


//     useOutsideClick(listItemRef, () => setShowViewProducts(false));
//     useOutsideClick(addProductRef, () => setShowAddProduct(false));
//     useOutsideClick(deleteProductRef, () => setShowDeleteProduct(false));
// 
//     useOutsideClick(updateProductRef, () => setShowUpdateProduct(false));


/* New Updation */
    useEffect(() => {
        const footerEl = pageFooterRef.current;

        const handleLogout = () => {
            logout();
        };

        if(footerEl) {
            footerEl.addEventListener("logout", handleLogout);
        }

        return () => {
            if(footerEl) {
                footerEl.removeEventListener("logout", handleLogout);
            }
        };
    }, [logout]);

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
    const productsListMenuBar = ["ID", "Name", "Quantity", "Unit Price", "UpdateBtn", "DeleteBtn"];
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
    const centeredPopupStyle = {
        ...popupStyle,
        transform: "translate(-50%, -50%)",
        height: "auto",
        width: "auto",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 15px rgba(0,0,0,0.3)",
        zIndex: 1001,
    };

    // const listItemRef = useRef(null);
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

    useEffect(() => {
        const handleProductAdded = () => {
            console.log("Product added! Refreshing list...");
            fetchProducts(); // Or update the UI however you want
        };
        const observer = document.body;
        observer.addEventListener("product-added", handleProductAdded);

        return () => {
            observer.removeEventListener("product-added", handleProductAdded);
        };
    }, []);
    
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
                        setShowUpdateProduct(false);
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
{}        setShowUpdateProduct(false);                        
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
{}        setShowUpdateProduct(false);
                    }}
                >
                Delete Product
                </button>
{}
                <button
                    className="updateProductButton"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowUpdateProduct(true);
                        setShowViewProducts(false);
                        setShowAddProduct(false);
                        setShowDeleteProduct(false);
                    }}
                >
                Update Product
                </button>
            </div>

            <div className="displayContainer"></div>

            {/* Render custom web components conditionally */}
            
            {/* {showViewProducts && Array.isArray(productList) && productList.length > 0 && ( */}
            {showViewProducts &&  (
                <list-item-component
                    style={popupStyle}
                    ref={listItemRef}
                    // Prevent clicks inside popup from bubbling to body (which closes popup)
                    onClick={(e) => e.stopPropagation()}
                />
            )}

            {/* {showAddProduct && (
            <add-product-component
                style={
                    // ...popupStyle,
                    // key: "add",
                    // height: "auto",
                    // width: "auto",
                    // transform: "translate(-50%, 50%)",
                    centeredPopupStyle
                }
                ref={addProductRef}
                onClick={(e) => e.stopPropagation()}
            />
            )} */}

            {showAddProduct && (
                <AddProductComponent 
                    onClose={() => setShowAddProduct(false)}
                    ref={addProductRef}
                    // onProductAdded={() => fetchProducts()}
                />
            ) }

            {showDeleteProduct && (
                <DeleteProductComponent
                    ref={deleteProductRef} 
                    onClick={(e) => e.stopPropagation()}
                    onClose={() => setShowDeleteProduct(false)} 
                />
            // <delete-product-component
            //     style={
            //         // ...popupStyle,
            //         // key: "delete",
            //         // height: "auto",
            //         // width: "auto",
            //         // transform: "translate(-50%, 50%)",
            //         popupStyle
            //     }
            //     ref={deleteProductRef}
            //     onClick={(e) => e.stopPropagation()}
            // />
            )}

{}        
            {showUpdateProduct && (
                <UpdateProductComponent 
                    ref={updateProductRef}
                    onClick={ (e) => e.stopPropagation() }
                    popupStyle={centeredPopupStyle} // updated}
                    onClose={() => setShowUpdateProduct(false)}
                />
            )}

            {/* Page footer component */}
            <page-footer-component 
                ref={pageFooterRef}
                buttons={JSON.stringify(["back", "logout"])} 
            />
            {/* <page-footer-component buttons={JSON.stringify(["dashboard", "back", "logout"])} /> */}
        </div>
    );
};

export default ManageProducts;