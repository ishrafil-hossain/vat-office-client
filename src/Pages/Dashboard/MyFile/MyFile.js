import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAuth from '../../../hooks/useAuth';
import { Button, CircularProgress, } from '@mui/material';
import { NavLink } from 'react-router-dom';
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


const MyFile = () => {
    const { user } = useAuth();
    const [myFiles, setMyFiles] = useState([]);

    useEffect(() => {
        const url = `https://vat-office-server.onrender.com/files?name=${user.displayName}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setMyFiles(data))
    }, [user.displayName])


    return (
        <div>
            {/* file list section  */}
            <section>
                <h3 style={{ textAlign: "center" }}>Total file : {(myFiles.length === 0) ? <CircularProgress /> : myFiles.length}</h3>
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
                                        <NavLink
                                            style={{ textDecoration: 'none', color: 'white', }}
                                            to={`/dashboard/update-user/${row._id}`}>
                                            <Button variant="contained" style={{ backgroundColor: 'green' }}>Send</Button>
                                        </NavLink>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
        </div>
    );
};

export default MyFile;