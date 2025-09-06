import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { 
    Card, 
    Box, 
    CardContent, 
    Button, 
    Typography, 
    IconButton,
    Container,
    Grid,
    Chip,
    Fade,
    Zoom,
    Paper,
    Divider
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import HistoryIcon from '@mui/icons-material/History';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch (error) {
                console.error('Error fetching history:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchHistory();
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    }

    const getTimeAgo = (dateString) => {
        const now = new Date();
        const meetingDate = new Date(dateString);
        const diffInHours = Math.floor((now - meetingDate) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d ago`;
        return formatDate(dateString);
    }

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
            position: 'relative'
        }}>
            {/* Header */}
            <Box sx={{ 
                background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
                padding: 3,
                boxShadow: '0 4px 20px rgba(14, 165, 233, 0.3)'
            }}>
                <Container maxWidth="lg">
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 2
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <IconButton 
                                onClick={() => routeTo("/home")}
                                sx={{ 
                                    color: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        transform: 'translateY(-2px)'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <HomeIcon />
                            </IconButton>
                            <Box>
                                <Typography 
                                    variant="h4" 
                                    component="h1" 
                                    sx={{ 
                                        color: 'white', 
                                        fontWeight: 700,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >
                                    <HistoryIcon />
                                    Meeting History
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        marginTop: 0.5
                                    }}
                                >
                                    View your past video conferences
                                </Typography>
                            </Box>
                        </Box>
                        
                        <Chip 
                            label={`${meetings.length} meetings`}
                            sx={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.875rem'
                            }}
                        />
                    </Box>
                </Container>
            </Box>

            {/* Content */}
            <Container maxWidth="lg" sx={{ padding: 4 }}>
                {loading ? (
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        minHeight: '400px' 
                    }}>
                        <Typography variant="h6" color="text.secondary">
                            Loading your meeting history...
                        </Typography>
                    </Box>
                ) : meetings.length === 0 ? (
                    <Fade in={true} timeout={800}>
                        <Paper sx={{ 
                            padding: 6, 
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 249, 255, 0.9) 100%)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: 4,
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                            <MeetingRoomIcon sx={{ 
                                fontSize: '4rem', 
                                color: 'primary.main', 
                                marginBottom: 2 
                            }} />
                            <Typography variant="h5" sx={{ 
                                marginBottom: 2, 
                                fontWeight: 600,
                                color: 'text.primary'
                            }}>
                                No meetings yet
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                marginBottom: 3, 
                                color: 'text.secondary',
                                maxWidth: '400px',
                                margin: '0 auto 24px auto'
                            }}>
                                Your meeting history will appear here once you start joining video conferences.
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<VideoCallIcon />}
                                onClick={() => routeTo("/home")}
                                sx={{
                                    background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
                                    borderRadius: 3,
                                    padding: '12px 24px',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                                        transform: 'translateY(-2px)'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Start a Meeting
                            </Button>
                        </Paper>
                    </Fade>
                ) : (
                    <Grid container spacing={3}>
                        {meetings.map((meeting, index) => (
                            <Grid item xs={12} sm={6} md={4} key={meeting.meetingCode || index}>
                                <Zoom in={true} timeout={600} style={{ transitionDelay: `${index * 100}ms` }}>
                                    <Card sx={{ 
                                        height: '100%',
                                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.95) 100%)',
                                        backdropFilter: 'blur(20px)',
                                        borderRadius: 3,
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
                                        }
                                    }}>
                                        <CardContent sx={{ padding: 3 }}>
                                            <Box sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: 2, 
                                                marginBottom: 2 
                                            }}>
                                                <Box sx={{ 
                                                    padding: 1.5, 
                                                    backgroundColor: 'primary.main',
                                                    borderRadius: 2,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <VideoCallIcon sx={{ color: 'white', fontSize: '1.5rem' }} />
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography 
                                                        variant="h6" 
                                                        sx={{ 
                                                            fontWeight: 700,
                                                            color: 'text.primary',
                                                            marginBottom: 0.5
                                                        }}
                                                    >
                                                        {meeting.meetingCode}
                                                    </Typography>
                                                    <Chip 
                                                        label="Meeting Code"
                                                        size="small"
                                                        sx={{ 
                                                            backgroundColor: 'primary.50',
                                                            color: 'primary.700',
                                                            fontWeight: 500,
                                                            fontSize: '0.75rem'
                                                        }}
                                                    />
                                                </Box>
                                            </Box>

                                            <Divider sx={{ marginY: 2 }} />

                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                    <AccessTimeIcon sx={{ 
                                                        fontSize: '1.25rem', 
                                                        color: 'text.secondary' 
                                                    }} />
                                                    <Box>
                                                        <Typography 
                                                            variant="body2" 
                                                            sx={{ 
                                                                color: 'text.secondary',
                                                                fontWeight: 500
                                                            }}
                                                        >
                                                            {formatDate(meeting.date)}
                                                        </Typography>
                                                        <Typography 
                                                            variant="caption" 
                                                            sx={{ 
                                                                color: 'text.secondary',
                                                                fontSize: '0.75rem'
                                                            }}
                                                        >
                                                            {formatTime(meeting.date)}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Box sx={{ 
                                                    display: 'flex', 
                                                    justifyContent: 'space-between', 
                                                    alignItems: 'center',
                                                    marginTop: 1
                                                }}>
                                                    <Typography 
                                                        variant="caption" 
                                                        sx={{ 
                                                            color: 'text.secondary',
                                                            fontStyle: 'italic'
                                                        }}
                                                    >
                                                        {getTimeAgo(meeting.date)}
                                                    </Typography>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        startIcon={<VideoCallIcon />}
                                                        onClick={() => routeTo(`/${meeting.meetingCode}`)}
                                                        sx={{
                                                            borderRadius: 2,
                                                            textTransform: 'none',
                                                            fontWeight: 500,
                                                            fontSize: '0.75rem',
                                                            padding: '4px 12px'
                                                        }}
                                                    >
                                                        Rejoin
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Zoom>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    )
}