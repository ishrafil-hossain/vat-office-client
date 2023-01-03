import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAuth from '../../../hooks/useAuth';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import emailjs from '@emailjs/browser';

import { styled } from '@mui/material/styles';
import tableCellClasses from '@mui/material/TableCell';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const time_And_Date = new Date().toLocaleString();

const sendEmail = (e, formData) => {
    e.preventDefault();

    emailjs.sendForm('EMAIL_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_USER_ID')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
};

const MyFile = () => {
    const { user } = useAuth();
    const [myFiles, setMyFiles] = useState([]);

    // console.log(user)
    const initialInfo = {
        fileName: ''
    }
    const [fileInfo, setFileInfo] = useState(initialInfo);

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        console.log(value)
        const newFileData = { ...fileInfo };
        console.log(newFileData)
        newFileData[field] = value;
        setFileInfo(newFileData);
        console.log(newFileData)

    }

    const handleFileAdd = e => {
        // collect data 
        const files = {
            ...fileInfo,
            date: new Date().toLocaleString(),
            from: user.displayName,
            To: "Receiptionist"
        }
        console.log(files)

        // send to the server 
        fetch('https://vat-office-server.vercel.app/files/receiption', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(files)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    const sendInfo = {
                        from_name: user.displayName,
                        from_email: user.email,
                        message: `${user.displayName} has sent you a file.`,
                    }
                    sendEmail(e, sendInfo).then(() => {

                        e.target.reset();
                    })
                }
            })


        e.preventDefault();
    }


    useEffect(() => {
        const url = `https://vat-office-server.vercel.app/files?name=${user.displayName}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setMyFiles(data))
    }, [])


    return (
        <div>
            {/* file list section  */}
            <section>
                <h3 style={{ textAlign: "center" }}>Total file : {myFiles.length}</h3>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center" sx={{ fontSize: "18px" }}>File Name</StyledTableCell>
                                <StyledTableCell align="center" sx={{ fontSize: "18px" }}>Department</StyledTableCell>
                                <StyledTableCell align="center" sx={{ fontSize: "18px" }}>Company Name</StyledTableCell>
                                <StyledTableCell align="center" sx={{ fontSize: "18px" }}>Person Name</StyledTableCell>
                                <StyledTableCell align="center" sx={{ fontSize: "18px" }}>Date and Time</StyledTableCell>
                                <StyledTableCell align="center" sx={{ fontSize: "18px" }}>Action</StyledTableCell>


                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {myFiles.map((row) => (
                                <StyledTableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell align="center">{row.fileName}</StyledTableCell>
                                    <StyledTableCell align="center">{row.department}</StyledTableCell>
                                    <StyledTableCell align="center">{row.company}</StyledTableCell>
                                    <StyledTableCell align="center">{row.personName}</StyledTableCell>
                                    <StyledTableCell align="center">{row.date}</StyledTableCell>

                                    <StyledTableCell align="center">
                                        <NavLink style={{ textDecoration: 'none', color: 'white', }} to={`/dashboard/update-user/${row._id}`}>
                                            <Button variant="contained" style={{ backgroundColor: 'green' }}>Send</Button>
                                        </NavLink>
                                    </StyledTableCell>

                                    {/* <TableCell align="center">
                                        <NavLink style={{ textDecoration: 'none', color: 'white', }} to="/dashboard/sendReceiption">
                                            <Button variant="contained" style={{ backgroundColor: '#5CE7ED' }}>Send</Button>
                                        </NavLink>
                                    </TableCell> */}


                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>

            {/* file transfer section  */}
            {/* <section>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} >
                            <Box>
                                <Typography
                                    sx={{ width: 1, m: 1, mt: 5, color: 'blue', fontWeight: 700, fontSize: '1.5rem' }}
                                    variant="subtitle1"
                                    gutterBottom component="div">
                                    File transfer
                                </Typography>

                                <form onSubmit={handleFileAdd}>
                                    <Box>
                                        <FormControl variant="standard" sx={{ width: 1, m: 1 }}>
                                            <InputLabel id="demo-simple-select-standard-label">File Name</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="demo-simple-select-standard"
                                                name="fileName"
                                                onBlur={handleOnBlur}
                                                label="fileName">
                                                {
                                                    myFiles.map(file => <MenuItem
                                                        value={file.fileName}>
                                                        {file.fileName}
                                                    </MenuItem>)
                                                }

                                            </Select>
                                        </FormControl>


                                        <TextField
                                            disabled
                                            sx={{ width: 1, m: 1 }}
                                            defaultValue={time_And_Date}
                                            name="date_time"
                                            onBlur={handleOnBlur}
                                            id="standard-basic-date-time"
                                            label="Time and Date"
                                            variant="standard" />

                                        <TextField
                                            disabled
                                            sx={{ width: 1, m: 1 }}
                                            defaultValue={user.displayName}
                                            name="from"
                                            onBlur={handleOnBlur}
                                            id="standard-basic-from"
                                            label="From"
                                            variant="standard" />

                                        <TextField
                                            disabled
                                            sx={{ width: 1, m: 1 }}
                                            defaultValue="Receiptionist"
                                            name="to"
                                            onBlur={handleOnBlur}
                                            id="standard-basic-to"
                                            label="To"
                                            variant="standard" />


                                        <Button
                                            sx={{ width: 1, m: 1 }}
                                            type="submit"
                                            variant="contained">
                                            Send Receiption
                                        </Button>
                                    </Box>
                                </form>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </section> */}
        </div>
    );
};

export default MyFile;