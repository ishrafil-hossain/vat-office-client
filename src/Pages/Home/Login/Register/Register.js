import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import login from '../../../../images/banner.jpg';
import { Box } from '@mui/system';
import { NavLink, useHistory } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';

const varticatCenter = {
    display: 'flex',
    alignItems: 'center',
    height: 500
}

const Register = () => {
    const [registerData, setRegisterData] = useState();
    const { user, registerUser, isLoading, authError } = useAuth();

    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newRegisterData = { ...registerData };
        newRegisterData[field] = value;
        setRegisterData(newRegisterData);
    }

    const handleRegisterSubmit = e => {
        e.preventDefault();
        if (registerData.password !== registerData.password2) {
            alert('your password did not match');
        }

        registerUser(registerData.email, registerData.password, registerData.name, history);
    }
    return (
        <div>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} style={varticatCenter}>
                        <img style={{ width: '100%' }} src={login} alt="" />
                    </Grid>
                    <Grid item xs={12} md={6} style={varticatCenter}>
                        <Box>
                            <Typography
                                sx={{ width: 1, m: 1 }}
                                variant="subtitle1"
                                gutterBottom component="div">
                                Please Register
                            </Typography>
                            {!isLoading && <form onSubmit={handleRegisterSubmit}>
                                <TextField
                                    required
                                    sx={{ width: 1, m: 1 }}
                                    name="name"
                                    onBlur={handleOnBlur}
                                    id="standard-basic-name"
                                    label="Your Name"
                                    variant="standard" />
                                <TextField
                                    required
                                    sx={{ width: 1, m: 1 }}
                                    name="email"
                                    type="email"
                                    onBlur={handleOnBlur}
                                    id="standard-basic-email"
                                    label="Your E-mail"
                                    variant="standard" />


                                <TextField
                                    required
                                    sx={{ width: 1, m: 1 }}
                                    name="password"
                                    onBlur={handleOnBlur}
                                    id="filled-password-input"
                                    label="Password"
                                    type="password"
                                    variant="standard"
                                />

                                <TextField
                                    required
                                    sx={{ width: 1, m: 1 }}
                                    name="password2"
                                    onBlur={handleOnBlur}
                                    id="filled-password2-input2"
                                    label="Re-Type Password"
                                    type="password"
                                    variant="standard"
                                />

                                <Button
                                    sx={{ width: 1, m: 1 }}
                                    type="submit"
                                    variant="contained">
                                    Register
                                </Button>

                                <NavLink
                                    to='/login'
                                    style={{ textDecoration: 'none' }}>
                                    <Button variant="text">Already Register? Please Login</Button>
                                </NavLink>
                            </form>}

                            {isLoading && <CircularProgress />}
                            {user?.email && <Alert onClose={() => { }}>You have successfully create an account!</Alert>}
                            {authError && <Alert severity="error">{authError}</Alert>}

                        </Box>
                    </Grid>
                </Grid>
            </Container>

        </div >
    );
};

export default Register;