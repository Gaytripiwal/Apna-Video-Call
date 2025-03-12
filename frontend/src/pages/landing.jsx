// import React from 'react'
// import "../App.css"
// import { Link, useNavigate } from 'react-router-dom'
// export default function LandingPage() {


//     const router = useNavigate();

//     return (
//         <div className='landingPageContainer'>
//             <nav>
//                 <div className='navHeader'>
//                     <h2>Apna Video Call</h2>
//                 </div>
//                 <div className='navlist'>
//                     <p onClick={() => {
//                         router("/aljk23")
//                     }}>Join as Guest</p>
//                     <p onClick={() => {
//                         router("/auth")

//                     }}>Register</p>
//                     <div onClick={() => {
//                         router("/auth")

//                     }} role='button'>
//                         <p>Login</p>
//                     </div>
//                 </div>
//             </nav>


//             <div className="landingMainContainer">
//                 <div>
//                     <h1><span style={{ color: "#FF9839" }}>Connect</span> with your loved Ones</h1>

//                     <p>Cover a distance by Apna Video Call</p>
//                     <div role='button'>
//                         <Link to={"/auth"}>Get Started</Link>
//                     </div>
//                 </div>
//                 <div>

//                     <img src="/mobile.png" alt="" />

//                 </div>
//             </div>



//         </div>
//     )
// }


import React from 'react';
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
    // Hook for navigation
    const router = useNavigate();

    return (
        <div className='landingPageContainer'>
            {/* Navigation bar */}
            <nav>
                <div className='navHeader'>
                    <h2>Apna Video Call</h2>
                </div>
                <div className='navlist'>
                    {/* Join as Guest button - Redirects to a default meeting */}
                    <p onClick={() => { router("/aljk23") }}>Join as Guest</p>
                    
                    {/* Register button - Redirects to authentication page */}
                    <p onClick={() => { router("/auth") }}>Register</p>
                    
                    {/* Login button - Redirects to authentication page */}
                    <div onClick={() => { router("/auth") }} role='button'>
                        <p>Login</p>
                    </div>
                </div>
            </nav>

            {/* Main landing content */}
            <div className="landingMainContainer">
                <div>
                    {/* Heading and tagline */}
                    <h1><span style={{ color: "#FF9839" }}>Connect</span> with your loved Ones</h1>
                    <p>Cover a distance by Apna Video Call</p>

                    {/* Get Started button - Redirects to authentication page */}
                    <div role='button'>
                        <Link to={"/auth"}>Get Started</Link>
                    </div>
                </div>

                {/* Image section */}
                <div>
                    <img src="/mobile.png" alt="" />
                </div>
            </div>
        </div>
    );
}
