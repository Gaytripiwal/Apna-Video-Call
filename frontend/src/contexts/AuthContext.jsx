// import axios from "axios";
// import httpStatus from "http-status";
// import { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import server from "../environment";


// export const AuthContext = createContext({});

// const client = axios.create({
//     baseURL: `${server}/api/v1/users`
//    //baseURL: "http://localhost:8000/api/v1/users"
// })


// export const AuthProvider = ({ children }) => {

//     const authContext = useContext(AuthContext);

//     const [userData, setUserData] = useState(authContext);

//     const router = useNavigate();

//     const handleRegister = async (name, username, password) => {
//         try {
//             let request = await client.post("/register", {
//                 name: name,
//                 username: username,
//                 password: password
//             })


//             if (request.status === httpStatus.CREATED) {
//                 return request.data.message;
//             }
//         } catch (err) {
//             throw err;
//         }
//     }

//     const handleLogin = async (username, password) => {
//         try {
//             let request = await client.post("/login", {
//                 username: username,
//                 password: password
//             });

//             console.log(username, password)
//             console.log(request.data)

//             if (request.status === httpStatus.OK) {
//                 localStorage.setItem("token", request.data.token);
//                 router("/home")
//             }
//         } catch (err) {
//             throw err;
//         }
//     }

//     const getHistoryOfUser = async () => {
//         try {
//             let request = await client.get("/get_all_activity", {
//                 params: {
//                     token: localStorage.getItem("token")
//                 }
//             });
//             return request.data
//         } catch
//          (err) {
//             throw err;
//         }
//     }

//     const addToUserHistory = async (meetingCode) => {
//         try {
//             let request = await client.post("/add_to_activity", {
//                 token: localStorage.getItem("token"),
//                 meeting_code: meetingCode
//             });
//             return request
//         } catch (e) {
//             throw e;
//         }
//     }


//     const data = {
//          userData, setUserData, addToUserHistory, getHistoryOfUser, handleRegister, handleLogin
//     }

//     return (
//         <AuthContext.Provider value={data}>
//             {children}
//         </AuthContext.Provider>
//     )

// }


import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../environment";

// Creating authentication context
export const AuthContext = createContext({});

// Setting up Axios client with base URL for API requests
const client = axios.create({
    baseURL: `${server}/api/v1/users`
   //baseURL: "http://localhost:8000/api/v1/users"
});

// Authentication provider component
export const AuthProvider = ({ children }) => {

    const authContext = useContext(AuthContext);

    // State to store user data
    const [userData, setUserData] = useState(authContext);

    // React Router hook for navigation
    const router = useNavigate();

    // Function to handle user registration
    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            });

            // Checking if user registration was successful
            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }
        } catch (err) {
            throw err;
        }
    };

    // Function to handle user login
    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password
            });

            console.log(username, password);
            console.log(request.data);

            // If login is successful, store token and navigate to home page
            if (request.status === httpStatus.OK) {
                localStorage.setItem("token", request.data.token);
                router("/home");
            }
        } catch (err) {
            throw err;
        }
    };

    // Function to fetch user's meeting history
    const getHistoryOfUser = async () => {
        try {
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data;
        } catch (err) {
            throw err;
        }
    };

    // Function to add a meeting to user history
    const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request;
        } catch (e) {
            throw e;
        }
    };

    // Providing authentication-related data and functions to child components
    const data = {
         userData, setUserData, addToUserHistory, getHistoryOfUser, handleRegister, handleLogin
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};
