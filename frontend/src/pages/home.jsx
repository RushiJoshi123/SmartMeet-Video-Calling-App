import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { 
    Button, 
    IconButton, 
    TextField, 
    Box, 
    Typography, 
    Card, 
    CardContent,
    Paper,
    Fade,
    Zoom
} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { AuthContext } from '../contexts/AuthContext';
import image2 from './image2.png'

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const [isJoining, setIsJoining] = useState(false);

    const { addToUserHistory } = useContext(AuthContext);
    
    let handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) return;
        
        setIsJoining(true);
        try {
            await addToUserHistory(meetingCode);
            navigate(`/${meetingCode}`);
        } catch (error) {
            console.error('Error joining meeting:', error);
        } finally {
            setIsJoining(false);
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleJoinVideoCall();
        }
    }

    return (
        <>
            <div className="navBar">
                <Typography variant="h4" component="h2" sx={{ 
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #e0f2fe, white)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Smart Meet
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Box 
                        onClick={() => navigate("/history")} 
                        sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            cursor: "pointer", 
                            color: "white",
                            padding: 1,
                            borderRadius: 2,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        <IconButton sx={{ color: "white" }}>
                            <RestoreIcon />
                        </IconButton>
                        <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
                            History
                        </Typography>
                    </Box>

                    <Button
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/auth");
                        }}
                        variant="outlined"
                        sx={{ 
                            color: "white", 
                            borderColor: "rgba(255, 255, 255, 0.5)",
                            textTransform: 'none',
                            fontWeight: 600,
                            padding: '8px 16px',
                            '&:hover': {
                                borderColor: 'white',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                transform: 'translateY(-2px)'
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </div>

            <div className="meetContainer">
                <Fade in={true} timeout={800}>
                    <Card 
                        className="leftPanel"
                        sx={{
                            flex: 1,
                            maxWidth: 600,
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.95) 100%)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: 4,
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <CardContent sx={{ p: 6 }}>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 2, 
                                marginBottom: 4 
                            }}>
                                <MeetingRoomIcon sx={{ 
                                    fontSize: '2.5rem', 
                                    color: 'primary.main' 
                                }} />
                                <Typography 
                                    variant="h4" 
                                    component="h2" 
                                    sx={{ 
                                        fontWeight: 700,
                                        color: 'text.primary',
                                        background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}
                                >
                                    Join Meeting
                                </Typography>
                            </Box>

                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    marginBottom: 4, 
                                    color: 'text.secondary',
                                    fontSize: '1.125rem',
                                    lineHeight: 1.6
                                }}
                            >
                                Enter the meeting code provided by the host to join the video conference.
                            </Typography>

                            <Box sx={{ 
                                display: 'flex', 
                                gap: 2, 
                                alignItems: 'flex-start',
                                flexDirection: { xs: 'column', sm: 'row' }
                            }}>
                                <TextField
                                    onChange={e => setMeetingCode(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    label="Meeting Code"
                                    variant="outlined"
                                    fullWidth
                                    value={meetingCode}
                                    placeholder="Enter meeting code..."
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 3,
                                            fontSize: '1.125rem',
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'primary.main',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            fontSize: '1rem',
                                            fontWeight: 500
                                        }
                                    }}
                                />
                                <Button
                                    onClick={handleJoinVideoCall}
                                    disabled={!meetingCode.trim() || isJoining}
                                    variant='contained'
                                    size="large"
                                    startIcon={<VideoCallIcon />}
                                    sx={{ 
                                        padding: '14px 28px',
                                        fontWeight: 700,
                                        fontSize: '1.125rem',
                                        borderRadius: 3,
                                        textTransform: 'none',
                                        minWidth: { xs: '100%', sm: 'auto' },
                                        background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
                                        boxShadow: '0 8px 20px rgba(14, 165, 233, 0.3)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 12px 24px rgba(14, 165, 233, 0.4)'
                                        },
                                        '&:disabled': {
                                            background: 'rgba(0, 0, 0, 0.12)',
                                            color: 'rgba(0, 0, 0, 0.26)'
                                        },
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {isJoining ? 'Joining...' : 'Join Meeting'}
                                </Button>
                            </Box>

                            {/* Quick actions */}
                            <Box sx={{ 
                                marginTop: 4, 
                                padding: 3, 
                                backgroundColor: 'rgba(14, 165, 233, 0.05)',
                                borderRadius: 3,
                                border: '1px solid rgba(14, 165, 233, 0.1)'
                            }}>
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        marginBottom: 2, 
                                        fontWeight: 600,
                                        color: 'primary.main'
                                    }}
                                >
                                    Quick Actions
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<PersonAddIcon />}
                                        onClick={() => navigate("/auth")}
                                        sx={{
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontWeight: 500
                                        }}
                                    >
                                        Invite Others
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<VideoCallIcon />}
                                        onClick={() => {
                                            const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
                                            setMeetingCode(randomCode);
                                        }}
                                        sx={{
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontWeight: 500
                                        }}
                                    >
                                        Generate Code
                                    </Button>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Fade>

                <Zoom in={true} timeout={800} style={{ transitionDelay: '200ms' }}>
                    <Box className='rightPanel' sx={{ 
                        flex: 1, 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        maxWidth: 500
                    }}>
                        <img 
                            src="/logo3.png" 
                            alt="Smart Meet Logo" 
                            style={{
                                width: "100%",
                                maxWidth: "400px",
                                borderRadius: "24px",
                                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                                transition: "transform 0.3s ease"
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        />
                    </Box>
                </Zoom>
            </div>
        </>
    )
}

export default withAuth(HomeComponent)
