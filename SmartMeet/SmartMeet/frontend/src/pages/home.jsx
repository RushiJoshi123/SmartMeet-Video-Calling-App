import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';
import image2 from './image2.png'

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");

    const { addToUserHistory } = useContext(AuthContext);
    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    return (
        <>
            <div className="navBar" style={{
                backgroundColor: "#1976d2",
                padding: "10px 30px",
               
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
            }}>
                <h2 style={{ margin: 0, fontWeight: "600" }}>Smart Meet</h2>

                <div style={{ display: "flex", alignItems: "center", gap: "20px" ,}}>
                    <div onClick={() => navigate("/history")} style={{ display: "flex", alignItems: "center", cursor: "pointer", color: "white" }}>
                        <IconButton style={{ color: "white" }}>
                            <RestoreIcon />
                        </IconButton>
                        <span style={{ fontSize: "16px", fontWeight: 500 }}>History</span>
                    </div>

                    <Button
                        onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/auth")
                        }}
                        variant="outlined"
                        style={{ color: "white", borderColor: "white" }}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            <div className="meetContainer" style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "50px",
                backgroundColor: "#f4f6f8",
                minHeight: "90vh",
                
            }}>
                <div className="leftPanel" style={{
                    flex: 1,
                    padding: "30px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    marginRight: "30px",
                     backgroundImage: `url(${image2})`
                 
                }}>
                    <h2 style={{ marginBottom: "20px", fontWeight: "500" }}>Enter code to join the meeting  :</h2>
                    <div style={{ display: 'flex', gap: "10px", alignItems: "center" }}>
                        <TextField
                            onChange={e => setMeetingCode(e.target.value)}
                            label="Meeting Code"
                            variant="outlined"
                            fullWidth
                        />
                        <Button
                            onClick={handleJoinVideoCall}
                            variant='contained'
                            style={{ padding: "12px 24px", fontWeight: "bold" }}
                        >
                            Join
                        </Button>
                    </div>
                </div>

                <div className='rightPanel' style={{ flex: 1, textAlign: "center" }}>
                    <img src="/logo3.png" alt="Smart Meet Logo" style={{
                        width: "100%",
                        maxWidth: "400px",
                        borderRadius: "20px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
                    }} />
                </div>
            </div>
        </>
    )
}

export default withAuth(HomeComponent)
