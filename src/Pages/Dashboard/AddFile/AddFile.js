import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const varticatCenter = {
    display: 'flex',
    alignItems: 'center',
    height: 500
}

const time_And_Date = new Date().toLocaleString();

const AddFile = () => {
    const { user } = useAuth();
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/users`;

        fetch(url)
            .then(res => res.json())
            .then(data => setDepartments(data))
    }, [user])

    // console.log(departments[0].department)

    const initialInfo = {
        fileName: '',
        department: '',
        company: '',
        // date_time: '',
        personName: ''
    }
    const [fileInfo, setFileInfo] = useState(initialInfo);

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newFileData = { ...fileInfo };
        // console.log(newFileData)
        newFileData[field] = value;
        setFileInfo(newFileData);

    }

    const handleFileAdd = e => {
        // collect data 
        const files = {
            ...fileInfo,
            date: new Date().toLocaleString()
        }
        // console.log(files)

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
                                    name="company"
                                    onBlur={handleOnBlur}
                                    id="standard-basic"
                                    label="Company Name"
                                    variant="standard" />


                                <TextField
                                    disabled
                                    sx={{ width: 1, m: 1 }}
                                    defaultValue={time_And_Date}
                                    name="date_time"
                                    onBlur={handleOnBlur}
                                    id="standard-basic-person-name"
                                    label="Time and Date"
                                    variant="standard" />

                                <FormControl variant="standard" sx={{ width: 1, m: 1 }}>
                                    <InputLabel id="demo-simple-select-standard-label">department</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        name="department"
                                        onBlur={handleOnBlur}
                                        // value={department}
                                        label="department"
                                    >
                                        <MenuItem value="Department-A">Department-A</MenuItem>
                                        <MenuItem value="Department-B">Department-B</MenuItem>
                                        <MenuItem value="Department-C">Department-C</MenuItem>
                                        <MenuItem value="Department-D">Department-D</MenuItem>
                                        <MenuItem value="Department-E">Department-E</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl variant="standard" sx={{ width: 1, m: 1 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Name</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        name="personName"
                                        onBlur={handleOnBlur}
                                        // value={department}
                                        label="department">
                                        {
                                            departments.map(department => <MenuItem value={department.displayName}>{department.displayName}</MenuItem>)
                                        }

                                    </Select>
                                </FormControl>


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