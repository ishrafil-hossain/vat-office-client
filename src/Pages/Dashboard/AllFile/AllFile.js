import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';



const AllFile = () => {
    const [allFiles, setAllFiles] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/files/user')
            .then(res => res.json())
            .then(data => setAllFiles(data))
    }, [])

    return (
        <div>
            <h3 style={{ textAlign: "center" }}>Total File : {allFiles.length}</h3>

            {/* search input  */}
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 5 }}>
                <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
                <TextField
                    id="filled-search"
                    label="Search..."
                    type="search"
                    onChange={(e) => { setSearch(e.target.value) }}
                    variant="standard" />
            </Box>


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
                        {allFiles.filter(val => {
                            if (search === '') {
                                return val;
                            }
                            else if (val.fileName.toLowerCase().includes(search.toLowerCase())
                            ) {
                                return val
                            }
                        }).map((row) => (
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