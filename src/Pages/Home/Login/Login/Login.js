import { Alert, Avatar, Button, Checkbox, CircularProgress, Container, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useState } from 'react';
import { Box } from '@mui/system';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';


const Login = () => {

    const { loginUser, user, isLoading, authError } = useAuth();
    const [loginData, setLoginData] = useState();

    const location = useLocation();
    const navigate = useNavigate();

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1565C0' }
    const btnstyle = { margin: '8px 0' }

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);

    }

    const handleLoginSubmit = e => {
        e.preventDefault();
        loginUser(loginData.email, loginData.password, location, navigate);

    }
    return (
        <div>
            <Container>
                <Grid>
                    <Paper elevation={10} style={paperStyle}>
                        <Grid align='center'>
                            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                            <h2>Sign In</h2>
                        </Grid>
                        <form onSubmit={handleLoginSubmit}>
                            <TextField
                                sx={{ width: 1, m: 1 }}
                                required
                                name="email"
                                onBlur={handleOnBlur}
                                id="standard-basic"
                                label="Your E-mail"
                                variant="standard" />


                            <TextField
                                sx={{ width: 1, m: 1 }}
                                required
                                name="password"
                                onBlur={handleOnBlur}
                                id="filled-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="standard"
                            />
                            <Button
                                sx={{ width: 1, m: 1 }}
                                type="submit"
                                variant="contained"
                                style={btnstyle}
                                fullWidth>
                                Sign In
                            </Button>

                            <Typography > Do you haven't an account ?
                                <NavLink
                                    to='/register'
                                    style={{ textDecoration: 'none' }}>
                                    <Button variant="text">Sign Up</Button>
                                </NavLink>
                            </Typography>
                        </form>
                        <br />
                        <br />
                        {isLoading && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>}
                        {user?.email && <Alert onClose={() => { }}>You have logged in successfully!</Alert>}
                        {authError && <Alert severity="error">{authError}</Alert>}
                    </Paper>
                </Grid>
            </Container>

        </div >
    );
};

export default Login;