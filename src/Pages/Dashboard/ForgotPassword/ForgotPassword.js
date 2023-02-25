import { Box, Button, TextField } from '@mui/material';
import React, { useRef } from 'react';
import useAuth from '../../../hooks/useAuth';

const ForgotPassword = () => {
    const { forgotPassword } = useAuth();
    const emailRef = useRef();


    const forgotPasswordHandler = () => {
        const email = emailRef.current.value;
        if (email) {
            forgotPassword(email).then(() => emailRef.current.value = "");
            alert('A mail has been sent to you for resetting your password');
        }
    }


    const onSubmit = e => {
        e.preventDefault();
    }


    return (
        <div>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh">
                <form onSubmit={onSubmit}>
                    <h2>Forgot Password</h2>
                    <TextField
                        sx={{ width: '100%' }}
                        placeholder="E-mail"
                        inputRef={emailRef}
                        type="email"
                        variant="standard" />
                    <br /> <br />
                    <Button
                        autoFocus
                        onClick={forgotPasswordHandler}
                        variant="contained"
                        color="secondary">
                        Submit
                    </Button>
                </form>
            </Box>

            {/* <div>
                <h2>Login</h2>
                <form onSubmit={onSubmit}>
                    <input placeholder='email' type='email' ref={emailRef} />
                    <button onClick={forgotPasswordHandler}>Submit</button>
                </form>
            </div> */}
        </div>
    );
};

export default ForgotPassword;