import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Box } from '@mui/system';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';


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
            <Container >
                <Grid >
                    <Box style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}>
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
                                variant="contained"
                                color="success">
                                Login
                            </Button>

                            <NavLink
                                to='/register'
                                style={{ textDecoration: 'none' }}>
                                <Button variant="text" color="error">New User? Please Register</Button>
                            </NavLink>
                        </form>

                        {isLoading && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>}
                        {user?.email && <Alert onClose={() => { }}>You have logged in successfully!</Alert>}
                        {authError && <Alert severity="error">{authError}</Alert>}

                    </Box>
                </Grid>
            </Container>

        </div >
    );
};

export default Login;