import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

const AllFile = () => {
    const [allFiles, setAllFiles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/files/user')
            .then(res => res.json())
            .then(data => setAllFiles(data))
    }, [])

    return (
        <div>
            <h3 style={{ textAlign: "center" }}>Total file : {allFiles.length}</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="files table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">File Name</TableCell>
                            <TableCell align="center">Person Email</TableCell>
                            <TableCell align="center">Person Name</TableCell>
                            <TableCell align="center">Action</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allFiles.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{row.fileName}</TableCell>
                                <TableCell align="center">{row.personEmail}</TableCell>
                                <TableCell align="center">{row.personName}</TableCell>
                                <TableCell align="center">
                                    <Button>Delete</Button>
                                </TableCell>


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AllFile;