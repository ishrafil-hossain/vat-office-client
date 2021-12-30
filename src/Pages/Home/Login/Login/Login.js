import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import login from '../../../../images/banner.jpg'
import { Box } from '@mui/system';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';

const varticatCenter = {
    display: 'flex',
    alignItems: 'center',
    height: 500
}

const Login = () => {

    const { loginUser, user, isLoading, authError } = useAuth();
    const [loginData, setLoginData] = useState();

    const location = useLocation();
    const navigate = useNavigate();

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
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} style={varticatCenter}>
                        <Box>
                            <Typography
                                sx={{ width: 1, m: 1 }}
                                variant="subtitle1"
                                gutterBottom component="div">
                                Please Login
                            </Typography>
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
                                    variant="contained">
                                    Login
                                </Button>

                                <NavLink
                                    to='/register'
                                    style={{ textDecoration: 'none' }}>
                                    <Button variant="text">New User? Please Register</Button>
                                </NavLink>
                            </form>

                            {isLoading && <CircularProgress />}
                            {user?.email && <Alert onClose={() => { }}>You have logged in successfully!</Alert>}
                            {authError && <Alert severity="error">{authError}</Alert>}

                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} style={varticatCenter}>
                        <img style={{ width: '100%' }} src={login} alt="" />
                    </Grid>
                </Grid>
            </Container>

        </div >
    );
};

export default Login;