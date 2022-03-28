import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const time_And_Date = new Date().toLocaleString();

const Update = () => {
    const [file, setFile] = useState([]);
    const [users, setUsers] = useState(['']);
    const { id } = useParams();
    useEffect(() => {
        const url = ` https://shrouded-spire-42050.herokuapp.com/files/update/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setFile(data))
    }, [])

    useEffect(() => {
        const url = `https://shrouded-spire-42050.herokuapp.com/users`;
        fetch(url)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    const [fileInfo, setFileInfo] = useState({});

    const handleChangeFileName = e => {
        const updateFileName = e.target.value;
        const updatedUser = { ...fileInfo };
        updatedUser.fileName = updateFileName;
        setFileInfo(updatedUser);
    }

    const handleChangeCompany = e => {
        const updateCompany = e.target.value;
        const updatedUser = { ...fileInfo };
        updatedUser.company = updateCompany;
        setFileInfo(updatedUser);
    }

    const handleChangeDateAndTime = e => {
        const updateDateAndTime = e.target.value;
        const updatedUser = { ...fileInfo };
        updatedUser.date_time = updateDateAndTime;
        setFileInfo(updatedUser);
    }


    const handleChangeDept = e => {
        const updateDept = e.target.value;
        const updatedUser = { ...fileInfo };
        updatedUser.department = updateDept;
        setFileInfo(updatedUser);
    }
    const handleChangePersonName = e => {
        const updatePersonName = e.target.value;
        const updatedUser = { ...fileInfo };
        updatedUser.personName = updatePersonName;
        setFileInfo(updatedUser);

    }


    const handleUpdate = e => {
        console.log('working')
        const url = `https://shrouded-spire-42050.herokuapp.com/users/update/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(fileInfo)
        })

            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Successfully Update This File');
                    setFileInfo({})
                }
            })
        e.preventDefault();
    }


    const handleOnBlur = e => {
        var selected = e.target.value;
        // console.log(selected)

        users.filter(checkAdult)

        function checkAdult(user) {
            if (user.department == selected) {
                const result = user.displayName;
                // console.log(result);
            }
        }
    }
    // console.log('users', users)

    return (
        <div>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Typography
                                sx={{ width: 1, m: 1, color: 'blue' }}
                                variant="subtitle1"
                                gutterBottom component="div">
                                Update The File
                            </Typography>
                            <div>
                                {file.map((row) => (
                                    <form onSubmit={handleUpdate}>
                                        <TextField
                                            sx={{ width: 1, m: 1 }}
                                            name="fileName"
                                            onChange={handleChangeFileName}
                                            defaultValue={row.fileName}
                                            id="standard-basic-file-name"
                                            label="File Name"
                                            variant="standard" />

                                        <TextField
                                            sx={{ width: 1, m: 1 }}
                                            name="company"
                                            defaultValue={row.company}
                                            onChange={handleChangeCompany}
                                            id="standard-basic"
                                            label="Company Name"
                                            variant="standard" />


                                        <TextField
                                            sx={{ width: 1, m: 1 }}
                                            defaultValue={time_And_Date}
                                            name="date_time"
                                            onChange={handleChangeDateAndTime}
                                            id="standard-basic-person-name"
                                            label="Time and Date"
                                            variant="standard" />


                                        <FormControl variant="standard" sx={{ width: 1, m: 1 }}>
                                            <InputLabel id="demo-simple-select-standard-label">Department</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="demo-simple-select-standard"
                                                onChange={handleChangeDept}
                                                name="department"
                                                onBlur={handleOnBlur}
                                                // value={department}
                                                label="department">
                                                {
                                                    users.map(user => <MenuItem value={user.department}>{user.department}</MenuItem>)

                                                }

                                            </Select>
                                        </FormControl>

                                        <FormControl variant="standard" sx={{ width: 1, m: 1 }}>
                                            <InputLabel id="demo-simple-select-standard-label">Name</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="demo-simple-select-standard"
                                                name="personName"
                                                onChange={handleChangePersonName}
                                                // onBlur={handleOnBlur}
                                                // value={department}
                                                label="department">
                                                {
                                                    users.map(user => <MenuItem value={user.displayName}>{user.displayName}</MenuItem>)
                                                }

                                            </Select>
                                        </FormControl>


                                        <Button
                                            sx={{ width: 1, m: 1 }}
                                            type="submit"
                                            color="secondary"
                                            variant="contained">
                                            Update
                                        </Button>
                                    </form>

                                ))}
                            </div>

                        </Box>
                    </Grid>
                </Grid>
            </Container>

        </div >
    );
};

export default Update;