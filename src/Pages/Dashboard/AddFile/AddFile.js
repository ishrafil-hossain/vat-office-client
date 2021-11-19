import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const varticatCenter = {
    display: 'flex',
    alignItems: 'center',
    height: 500
}

const AddFile = () => {
    const initialInfo = {
        fileName: '',
        personEmail: '',
        personName: ''
    }
    const [fileInfo, setFileInfo] = useState(initialInfo);

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newFileData = { ...fileInfo };
        newFileData[field] = value;
        setFileInfo(newFileData);

    }

    const handleFileAdd = e => {
        // collect data 
        const files = {
            ...fileInfo
        }

        // send to the server 
        fetch('http://localhost:5000/files', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(files)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('You have successfully added a file');
                    e.target.reset();
                }
            })


        e.preventDefault();
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
                                Add a file
                            </Typography>
                            <form onSubmit={handleFileAdd}>

                                <TextField
                                    required
                                    sx={{ width: 1, m: 1 }}
                                    name="fileName"
                                    onBlur={handleOnBlur}
                                    id="standard-basic-file-name"
                                    label="File Name"
                                    variant="standard" />

                                <TextField
                                    sx={{ width: 1, m: 1 }}
                                    required
                                    name="personEmail"
                                    onBlur={handleOnBlur}
                                    id="standard-basic"
                                    label="Person E-mail"
                                    variant="standard" />

                                <TextField
                                    required
                                    sx={{ width: 1, m: 1 }}
                                    name="personName"
                                    onBlur={handleOnBlur}
                                    id="standard-basic-person-name"
                                    label="Person Name"
                                    variant="standard" />

                                <Button
                                    sx={{ width: 1, m: 1 }}
                                    type="submit"
                                    variant="contained">
                                    Add
                                </Button>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

        </div >
    );
};

export default AddFile;