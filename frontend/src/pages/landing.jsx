import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
import { Button, Box, Typography, Container } from '@mui/material'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import GroupIcon from '@mui/icons-material/Group'
import SecurityIcon from '@mui/icons-material/Security'
import SpeedIcon from '@mui/icons-material/Speed'

export default function LandingPage() {
    const router = useNavigate();

    return (
        <div className='landingPageContainer'>
            <nav>
                <div className='navHeader'>
                    <h2>Smart Meet</h2>
                </div>
                <div className='navlist'>
                    <p onClick={() => {
                        router("/aljk23")
                    }}>Join as Guest</p>
                    <p onClick={() => {
                        router("/auth")
                    }}>Register</p>
                    <div onClick={() => {
                        router("/auth")
                    }} role='button'>
                        <p>Login</p>
                    </div>
                </div>
            </nav>

            <div className="landingMainContainer">
                <div>
                    <Typography 
                        variant="h1" 
                        component="h1"
                        sx={{
                            fontSize: { xs: '2.5rem', md: '3.75rem' },
                            fontWeight: 800,
                            lineHeight: 1.1,
                            marginBottom: 3,
                            letterSpacing: '-0.025em'
                        }}
                    >
                        <span style={{ 
                            background: 'linear-gradient(135deg, #facc15, #f59e0b)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Connect
                        </span> with your loved Ones
                    </Typography>

                    <Typography 
                        variant="h5" 
                        component="p"
                        sx={{
                            fontSize: { xs: '1.125rem', md: '1.25rem' },
                            color: 'rgba(255, 255, 255, 0.8)',
                            marginBottom: 4,
                            fontWeight: 400,
                            maxWidth: '500px'
                        }}
                    >
                        Experience seamless video conferencing with Smart Meet. 
                        High-quality, secure, and easy-to-use platform for all your meetings.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 6 }}>
                        <div role='button'>
                            <Link to={"/auth"}>Get Started</Link>
                        </div>
                        <Button
                            variant="outlined"
                            onClick={() => router("/aljk23")}
                            sx={{
                                color: 'white',
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                                padding: '12px 24px',
                                borderRadius: '50px',
                                textTransform: 'none',
                                fontSize: '1.125rem',
                                fontWeight: 600,
                                '&:hover': {
                                    borderColor: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    transform: 'translateY(-2px)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Join as Guest
                        </Button>
                    </Box>

                    {/* Feature highlights */}
                    <Box sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                        gap: 3,
                        maxWidth: '600px'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <VideoCallIcon sx={{ color: '#facc15', fontSize: '2rem' }} />
                            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
                                HD Video Quality
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <GroupIcon sx={{ color: '#facc15', fontSize: '2rem' }} />
                            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
                                Multiple Participants
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <SecurityIcon sx={{ color: '#facc15', fontSize: '2rem' }} />
                            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
                                Secure & Private
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <SpeedIcon sx={{ color: '#facc15', fontSize: '2rem' }} />
                            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
                                Lightning Fast
                            </Typography>
                        </Box>
                    </Box>
                </div>
                <div>
                    <img 
                        src="/mobile.png" 
                        alt="Smart Meet App Preview" 
                        style={{
                            filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))',
                            transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                </div>
            </div>
        </div>
    )
}
