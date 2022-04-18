import { Alert, Avatar, Button, CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import React, { useState } from 'react';
import { Box } from '@mui/system';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';

const Register = () => {
    const [registerData, setRegisterData] = useState();
    const { user, registerUser, isLoading, authError } = useAuth();
    const [department, setDepartment] = useState('');

    const paperStyle = { padding: 20, height: '80vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1565C0' }
    const btnstyle = { margin: '8px 0' }

    const handleChange = (event) => {
        setDepartment(event.target.value);
    };

    const navigate = useNavigate();

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
        
        registerUser(registerData.email, registerData.password, registerData.name, registerData.department, navigate);
    }
    return (
        <div>
            <Container>

                <Grid>
                    <Paper elevation={10} style={paperStyle}>
                        <Grid align='center'>
                            <Avatar style={avatarStyle}><AddOutlinedIcon /></Avatar>
                            <h2>Sign Up</h2>
                        </Grid>
                        {
                            !isLoading && <form onSubmit={handleRegisterSubmit}>
                                <TextField
                                    required
                                    sx={{ width: 1, m: 1 }}
                                    name="name"
                                    onBlur={handleOnBlur}
                                    id="standard-basic-name"
                                    label="Your Name"
                                    variant="standard" />
                                <FormControl variant="standard" sx={{ width: 1, m: 1 }}>
                                    <InputLabel id="demo-simple-select-standard-label">department</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        name="department"
                                        onBlur={handleOnBlur}
                                        value={department}
                                        onChange={handleChange}
                                        label="department"
                                    >
                                        <MenuItem value="Department-A">Department-A</MenuItem>
                                        <MenuItem value="Department-B">Department-B</MenuItem>
                                        <MenuItem value="Department-C">Department-C</MenuItem>
                                        <MenuItem value="Department-D">Department-D</MenuItem>
                                        <MenuItem value="Department-E">Department-E</MenuItem>
                                        <MenuItem value="Receptionist">Receptionist</MenuItem>

                                        <MenuItem value="Admin">Admin</MenuItem>
                                    </Select>
                                </FormControl>

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
                                    variant="contained"
                                    style={btnstyle}
                                    fullWidth>
                                    Sign Up
                                </Button>

                                <Typography > Do you haven an account ?
                                    <NavLink
                                        to='/login'
                                        style={{ textDecoration: 'none' }}>
                                        <Button variant="text">Sign In</Button>
                                    </NavLink>
                                </Typography>
                            </form>
                        }

                        {isLoading && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>}
                        {user?.email && <Alert onClose={() => { }}>You have successfully create an account!</Alert>}
                        {authError && <Alert severity="error">{authError}</Alert>}

                    </Paper>
                </Grid >
            </Container >

        </div >
    );
};

export default Register;