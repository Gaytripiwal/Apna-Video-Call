// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom"

// const withAuth = (WrappedComponent ) => {
//     const AuthComponent = (props) => {
//         const router = useNavigate();

//         const isAuthenticated = () => {
//             if(localStorage.getItem("token")) {
//                 return true;
//             } 
//             return false;
//         }

//         useEffect(() => {
//             if(!isAuthenticated()) {
//                 router("/auth")
//             }
//         }, [])

//         return <WrappedComponent {...props} />
//     }

//     return AuthComponent;
// }
// export default withAuth;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Higher-Order Component (HOC) for authentication
 * Wraps a component and ensures only authenticated users can access it
 */
const withAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {
        const router = useNavigate();

        // Function to check if user is authenticated
        const isAuthenticated = () => {
            if (localStorage.getItem("token")) {
                return true; // User is authenticated
            }
            return false; // User is not authenticated
        };

        // Effect to check authentication status on component mount
        useEffect(() => {
            if (!isAuthenticated()) {
                router("/auth"); // Redirect to login page if not authenticated
            }
        }, []);

        // Render the wrapped component if authenticated
        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

// Export the authentication HOC
export default withAuth;
