import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAuth from '../../../hooks/useAuth';
import { Button } from '@mui/material';

const MyFile = () => {
    const { user } = useAuth();
    const [myFiles, setMyFiles] = useState([]);

    console.log(user)


    useEffect(() => {
        const url = `http://localhost:5000/files?name=${user.displayName}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setMyFiles(data))
    }, [])
    return (
        <div>
            <h3 style={{ textAlign: "center" }}>Total file : {myFiles.length}</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="files table" >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">File Name</TableCell>
                            <TableCell align="center">Department</TableCell>
                            <TableCell align="center">Company Name</TableCell>
                            <TableCell align="center">Person Name</TableCell>
                            <TableCell align="center">Date and Time</TableCell>
                            <TableCell align="center">Action</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myFiles.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{row.fileName}</TableCell>
                                <TableCell align="center">{row.department}</TableCell>
                                <TableCell align="center">{row.company}</TableCell>
                                <TableCell align="center">{row.personName}</TableCell>
                                <TableCell align="center">{row.date}</TableCell>
                                <TableCell align="center">
                                    <Button sx={{ color: 'green', fontWeight: 700 }}>Update</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MyFile;