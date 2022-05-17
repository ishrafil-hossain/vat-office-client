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
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const url = `https://shrouded-spire-42050.herokuapp.com/users`;

        fetch(url)
            .then(res => res.json())
            .then(data => setDepartments(data))
    }, [user])


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
        newFileData[field] = value;
        setFileInfo(newFileData);

    }

    const handleFileAdd = e => {
        // collect data 
        const files = {
            ...fileInfo,
            date: new Date().toLocaleString()
        }
        

        // send to the server 
        fetch('https://shrouded-spire-42050.herokuapp.com/files', {
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

    useEffect(() => {
        const url = `https://shrouded-spire-42050.herokuapp.com/users`;
        fetch(url)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    const userOptions = new Map([
        ...users.map(user => [user.department, user.department])
    ]);

    const filteredFiles = () => {
        return users.filter(user => String(user.department) === selectedDepartment);
    };

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
                                        onChange={({ target }) => setSelectedDepartment(target.value)}
                                        label="department"
                                    >

                                        {[...userOptions].map(([department, displayName]) => (
                                            <MenuItem value={department}> {displayName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl variant="standard" sx={{ width: 1, m: 1 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Name</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        name="personName"
                                        onBlur={handleOnBlur}
                                        label="department">
                                       
                                        {filteredFiles().map(file => (
                                            <MenuItem
                                                value={file.displayName}>
                                                {file.displayName}
                                            </MenuItem>
                                        ))}

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