import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./components/PageFooterComponent.js";
import "./components/ListItemComponent.js";
import "./components/ViewUsersComponent.js"

import useOutsideClick from "./hooks/useOutsideClick.jsx";
import { set } from "mongoose";

// Yet to define...
import DeleteUserComponent from "./components/DeleteUserComponent.jsx";
import AddUserComponent from "./components/AddUserComponent.jsx";
import UpdateUserComponent from "./components/UpdateUserComponent.jsx";

const ManageUsers = () => {
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
    
    // State to hold user list
    const API_ROUTE = "/users";
    const IS_DEVELOPMENT = import.meta.env.MODE === 'development';
    const rqstURL = IS_DEVELOPMENT ? API_ROUTE : (import.meta.env.VITE_API_BASE_URL + API_ROUTE);
    console.log('Requesting API URL:', rqstURL); 

    const [userList, setUserList] = useState(null);

    // To control visibility of popup components
    const [showViewUsers, setShowViewUsers] = useState(false);
    const [showAddUser, setShowAddUser] = useState(false);
    const [showDeleteUser, setShowDeleteUser] = useState(false);
/* Updation */
    const [showUpdateUser, setShowUpdateUser] = useState(false);
    // Handling clicks outside the popups to close them.

    const listItemRef = useRef(null);
    const addUserRef = useRef(null);
    const deleteUserRef = useRef(null);
/* Updation */
    const updateUserRef = useRef(null);    

    useEffect( () => {
        const listEl = listItemRef.current;
        const addEl = addUserRef.current;
        const delEl = deleteUserRef.current;
/* Updation */
        const updateEl = updateUserRef.current;

/* Updation */        
        if (!listEl && !addEl && !delEl && !updateEl) return;

        const handleListClose = (e) => {
            e.stopPropagation();
            setShowViewUsers(false);
        };
        // const handleListClose = (e) => {
        //     e.stopPropagation();
        //     setShowViewUsers(false);
        // };
        const handleAddClose = (e) => {
            e.stopPropagation();
            setShowAddUser(false);
        };
        const handleDeleteClose = (e) => {
            e.stopPropagation();
            setShowDeleteUser(false);
        };
/* Updation */
        const handleUpdateClose = (e) => {
            e.stopPropagation();
            setShowUpdateUser(false);
        }

        // listEl?.addEventListener("close-list", handleListClose);
        // addEl?.addEventListener("close-add", handleAddClose);
        // delEl?.addEventListener("close-delete", handleDeleteClose);
        if (listEl) listEl.addEventListener("close-list", handleListClose);
        if (addEl) addEl.addEventListener("close-add", handleAddClose);
        if (delEl) delEl.addEventListener("close-delete", handleDeleteClose);
/* Updation */
        if (updateEl) updateEl.addEventListener("close-update", handleUpdateClose);

        return () => {
            // listEl.removeEventListener("close-list", handleListClose);
            // addEl.removeEventListener("close-add", handleAddClose);
            // delEl.removeEventListener("close-delete", handleDeleteClose);
            if (listEl?.removeEventListener) listEl.removeEventListener("close-list", handleListClose);
            if (addEl?.removeEventListener) addEl.removeEventListener("close-add", handleAddClose);
            if (delEl?.removeEventListener) delEl.removeEventListener("close-delete", handleDeleteClose);
/* Updation */
            if (updateEl?.removeEventListener) updateEl.removeEventListener("close-update", handleUpdateClose);
        };
    }, [showViewUsers, showAddUser, showDeleteUser, showUpdateUser]);
/* Updation */

    useOutsideClick(listItemRef, () => setShowViewUsers(false));
    useOutsideClick(addUserRef, () => setShowAddUser(false));
    useOutsideClick(deleteUserRef, () => setShowDeleteUser(false));
/* Updation */
    useOutsideClick(updateUserRef, () => setShowUpdateUser(false));

    // Fetching Users from API.
    const fetchUsers = async () => {
        try {
            const response = await fetch(`${rqstURL}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            console.log(response);
            if(response.ok) {
                const result = await response.json();
                setUserList(result.data);
            } else {
                setUserList([]);
                alert("No Users found");
            }
        } catch(error) {
            alert("Error fetching Users");
            console.error(error);
            setUserList([]);
        }
    };

    // Map headers to keys for list-item-component.
    const usersListMenuBar = Array("ID", "Name", "Email", "Role");
    // const usersListMenuBar = ["ID", "Name", "Email", "Role"];
    const headerToKeyMap = {
        "ID": "userId",
        "Name": "username",
        "Email": "email",
        "Role": "role",
    };
    const usersListTitle = "Users List";

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

    useEffect(() => {
        if (showViewUsers && listItemRef.current && Array.isArray(userList)) {
            setTimeout(() => {
                listItemRef.current.initialize(userList);
            }, 0); // ensures next event loop tick
        }
    }, [showViewUsers, userList]);

    // Earlier version which was causing no-data.
    // useEffect(() => {
    //     if (showViewUsers && listItemRef.current && Array.isArray(userList)) {
    //         listItemRef.current.initialize(
    //         userList,
    //         // usersListMenuBar,
    //         // usersListTitle,
    //         // headerToKeyMap,
    //         // rqstURL  // using the computed request URL here!
    //     );
    //     // Force render of the component's internal DOM after initialize
    //     // listItemRef.current.connectedCallback();
    //     }
    // }, [showViewUsers, userList, rqstURL]); // run this effect when any dependency changes

    useEffect(() => {
        const handleUserAdded = () => {
            console.log("User added! Refreshing list...");
            fetchUsers(); // Or update the UI however you want
        };
        const observer = document.body;
        observer.addEventListener("user-added", handleUserAdded);

        return () => {
            observer.removeEventListener("user-added", handleUserAdded);
        };
    }, []);
    
    return (
    <div className="users-container container">
        <h2>User Inventory</h2>
            <div className="buttonsContainer">
                <button
                    className="viewUsersButton"
                    onClick={(e) => {
                        e.stopPropagation();
                        fetchUsers();
                        setShowViewUsers(true);
                        setShowAddUser(false);
                        setShowDeleteUser(false);
{/* Updation */}        setShowUpdateUser(false);
                    }}
                >
                View Users
                </button>

                <button
                    className="addUserButton"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowAddUser(true);
                        setShowViewUsers(false);
                        setShowDeleteUser(false);
{/* Updation */}        setShowUpdateUser(false);                        
                    }}
                >
                Add User
                </button>
                <button
                    className="deleteUserButton"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteUser(true);
                        setShowViewUsers(false);
                        setShowAddUser(false);
{/* Updation */}        setShowUpdateUser(false);
                    }}
                >
                Delete User
                </button>
{/* Updation */}
                <button
                    className="updateUserButton"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowUpdateUser(true);
                        setShowViewUsers(false);
                        setShowAddUser(false);
                        setShowDeleteUser(false);
                    }}
                >
                Update User
                </button>
            </div>

            <div className="displayContainer"></div>

            {/* Render custom web components conditionally */}
            
            {/* {showViewUsers && Array.isArray(userList) && userList.length > 0 && ( */}
            { showViewUsers &&  (
                <view-users-component
                    style={popupStyle}
                    ref={listItemRef}
                    // Prevent clicks inside popup from bubbling to body (which closes popup)
                    onClick={(e) => e.stopPropagation()}
                />
            ) }

            {/* Need to UNCOMMENT: listItemRef.current.initialize */}
            {/* {showViewUsers &&  (
                <list-item-component
                    style={popupStyle}
                    ref={listItemRef}
                    // Prevent clicks inside popup from bubbling to body (which closes popup)
                    onClick={(e) => e.stopPropagation()}
                />
            )} */}

            {/* {showAddUser && (
            <add-user-component
                style={
                    // ...popupStyle,
                    // key: "add",
                    // height: "auto",
                    // width: "auto",
                    // transform: "translate(-50%, 50%)",
                    centeredPopupStyle
                }
                ref={addUserRef}
                onClick={(e) => e.stopPropagation()}
            />
            )} */}

            {showAddUser && (
                <AddUserComponent 
                    onClose={() => setShowAddUser(false)}
                    ref={addUserRef}
                    // onUserAdded={() => fetchUsers()}
                />
            ) }

            {showDeleteUser && (
                <DeleteUserComponent 
                    onClose={() => setShowDeleteUser(false)}
                    ref={deleteUserRef}
                />
            // <delete-User-component
            //     style={
            //         // ...popupStyle,
            //         // key: "delete",
            //         // height: "auto",
            //         // width: "auto",
            //         // transform: "translate(-50%, 50%)",
            //         popupStyle
            //     }
            //     ref={deleteUserRef}
            //     onClick={(e) => e.stopPropagation()}
            // />
            )}

{/* Updation */}        
            {showUpdateUser && (
                <UpdateUserComponent 
                    ref={updateUserRef}
                    onClick={ (e) => e.stopPropagation() }
                    popupStyle={centeredPopupStyle} // updated}
                    onClose={() => setShowUpdateUser(false)}
                />
            )}

            {/* Page footer component */}
            <page-footer-component buttons={JSON.stringify(["dashboard", "back", "logout"])} />
        </div>
    );
};

export default ManageUsers;