import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';
import image from './image.jpg'



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#0ea5e9',
            light: '#38bdf8',
            dark: '#0284c7',
        },
        secondary: {
            main: '#f59e0b',
            light: '#facc15',
            dark: '#d97706',
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        h4: {
            fontWeight: 700,
            letterSpacing: '-0.025em',
        },
        h5: {
            fontWeight: 600,
            letterSpacing: '-0.025em',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: '12px 24px',
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                    },
                    transition: 'all 0.3s ease',
                },
                contained: {
                    background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#0ea5e9',
                        },
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                },
            },
        },
    },
});

export default function Authentication() {

    

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [name, setName] = React.useState();
    const [error, setError] = React.useState();
    const [message, setMessage] = React.useState();


    const [formState, setFormState] = React.useState(0);

    const [open, setOpen] = React.useState(false)


    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {

                let result = await handleLogin(username, password)


            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(0)
                setPassword("")
            }
        } catch (err) {

            console.log(err);
            let message = (err.response.data.message);
            setError(message);
        }
    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${image})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>


                        <Box sx={{ 
                            display: 'flex', 
                            gap: 1, 
                            marginBottom: 3,
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                            borderRadius: 2,
                            padding: 0.5
                        }}>
                            <Button 
                                variant={formState === 0 ? "contained" : "text"} 
                                onClick={() => { setFormState(0) }}
                                sx={{
                                    flex: 1,
                                    borderRadius: 1.5,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    ...(formState === 0 ? {
                                        background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
                                        color: 'white',
                                        boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)'
                                    } : {
                                        color: 'text.secondary',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.05)'
                                        }
                                    })
                                }}
                            >
                                Sign In
                            </Button>
                            <Button 
                                variant={formState === 1 ? "contained" : "text"} 
                                onClick={() => { setFormState(1) }}
                                sx={{
                                    flex: 1,
                                    borderRadius: 1.5,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    ...(formState === 1 ? {
                                        background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
                                        color: 'white',
                                        boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)'
                                    } : {
                                        color: 'text.secondary',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.05)'
                                        }
                                    })
                                }}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            {formState === 1 ? <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Full Name"
                                name="username"
                                value={name}
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                            /> : <></>}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}
                                autoFocus
                                onChange={(e) => setUsername(e.target.value)}   

                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}

                                id="password"
                            />

                            {error && (
                                <Box sx={{ 
                                    marginTop: 2,
                                    padding: 2,
                                    backgroundColor: 'error.50',
                                    border: '1px solid',
                                    borderColor: 'error.200',
                                    borderRadius: 2,
                                    color: 'error.700',
                                    fontSize: '0.875rem',
                                    fontWeight: 500
                                }}>
                                    {error}
                                </Box>
                            )}

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? "Login " : "Register"}
                            </Button>

                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar

                open={open}
                autoHideDuration={4000}
                message={message}
            />

        </ThemeProvider>
    );
}