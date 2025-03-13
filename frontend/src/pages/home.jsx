import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    // Hook for navigation
    let navigate = useNavigate();

    const [meetingCode, setMeetingCode] = useState("");

    // Get function to add meeting to user history from AuthContext
    const { addToUserHistory } = useContext(AuthContext);

    // Function to handle joining a video call
    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode);  // Save meeting to history
        navigate(`/${meetingCode}`);  
    };

    return (
        <>
            {/* Navigation bar */}
            <div className="navBar">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h2>Apna Video Call</h2>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                    {/* Button to navigate to meeting history */}
                    <IconButton onClick={() => { navigate("/history") }}>
                        <RestoreIcon />
                    </IconButton>
                    <p>History</p>

                    {/* Logout button */}
                    <Button onClick={() => {
                        localStorage.removeItem("token");  // Remove authentication token
                        navigate("/auth");  // Redirect to login page
                    }}>
                        Logout
                    </Button>
                </div>
            </div>

            {/* Meeting joining section */}
            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <h2>Providing Quality Video Call Just Like Quality Education</h2>

                        <div style={{ display: 'flex', gap: "10px" }}>

                            {/* Input for meeting code */}
                            <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />

                            {/* Button to join the meeting */}
                            <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>
                        </div>
                    </div>
                </div>
                
                <div className='rightPanel'>
                    <img srcSet='/logo3.png' alt="" />
                </div>
            </div>
        </>
    );
}

export default withAuth(HomeComponent);
