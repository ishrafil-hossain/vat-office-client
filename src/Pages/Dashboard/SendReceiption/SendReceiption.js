import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import useAuth from '../../../hooks/useAuth';

const time_And_Date = new Date().toLocaleString();

const SendReceiption = () => {
    const { user } = useAuth();
    return (
        <div>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} >
                        <Box>

                            <Typography
                                sx={{ width: 1, m: 1 }}
                                variant="subtitle1"
                                gutterBottom component="div">
                                Add a file
                            </Typography>
                            <form >

                                <TextField
                                    required
                                    sx={{ width: 1, m: 1 }}
                                    name="fileName"
                                    // onBlur={handleOnBlur}
                                    id="standard-basic-file-name"
                                    label="File Name"
                                    variant="standard" />

                                <TextField
                                    sx={{ width: 1, m: 1 }}
                                    required
                                    name="company"
                                    // onBlur={handleOnBlur}
                                    id="standard-basic"
                                    label="Company Name"
                                    variant="standard" />


                                <TextField
                                    disabled
                                    sx={{ width: 1, m: 1 }}
                                    defaultValue={time_And_Date}
                                    name="date_time"
                                    // onBlur={handleOnBlur}
                                    id="standard-basic-person-name"
                                    label="Time and Date"
                                    variant="standard" />

                                <TextField
                                    disabled
                                    sx={{ width: 1, m: 1 }}
                                    defaultValue={user.displayName}
                                    name="from"
                                    // onBlur={handleOnBlur}
                                    id="standard-basic-from"
                                    label="From"
                                    variant="standard" />

                                <TextField
                                    disabled
                                    sx={{ width: 1, m: 1 }}
                                    defaultValue="Receiptionist"
                                    name="to"
                                    // onBlur={handleOnBlur}
                                    id="standard-basic-to"
                                    label="To"
                                    variant="standard" />


                                <Button
                                    sx={{ width: 1, m: 1 }}
                                    type="submit"
                                    variant="contained">
                                    Send Receiption
                                </Button>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

        </div >
    );
};

export default SendReceiption;