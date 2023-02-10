import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import tableCellClasses from '@mui/material/TableCell';
import { CircularProgress } from '@mui/material';


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

const Home = () => {
    const [users, setUsers] = useState(['']);

    useEffect(() => {
        const url = `https://vat-office-server.vercel.app/users`;
        fetch(url)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])
    console.log(users[0])
    return (
        <div>
            <h1 style={{ textAlign: "center", color: "green" }}>At a Glance : {(users?.length === 1) ? <CircularProgress /> : users?.length}</h1>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell sx={{ fontSize: "18px" }}>Name</StyledTableCell>
                            <StyledTableCell sx={{ fontSize: "18px" }}>E-mail</StyledTableCell>
                            <StyledTableCell sx={{ fontSize: "18px" }}>Department</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((user) => (
                            <StyledTableRow
                                key={user._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <StyledTableCell>{user.displayName}</StyledTableCell>
                                <StyledTableCell>{user.email}</StyledTableCell>
                                <StyledTableCell>{user.department}</StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Home;