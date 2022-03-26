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
import DeleteIcon from '@mui/icons-material/Delete';



const AllFile = () => {
    const [allFiles, setAllFiles] = useState([]);
    const [search, setSearch] = useState('');


    useEffect(() => {
        fetch('https://shrouded-spire-42050.herokuapp.com/files/user')
            .then(res => res.json())
            .then(data => setAllFiles(data))
    }, []);

    // Delete a product 
    const handleDelete = id => {
        const confirm = window.confirm('Are You Sure To Delete This File...?');
        if (confirm) {
            fetch(`https://shrouded-spire-42050.herokuapp.com/files/user/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log('this is data', data);
                    const remaining = allFiles.filter(file => file._id !== id);
                    setAllFiles(remaining);
                })
        }

    }

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
                            <TableCell align="center">Company Name</TableCell>
                            <TableCell align="center">Person Name</TableCell>
                            <TableCell align="center">Department</TableCell>
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
                            else if (val.company.toLowerCase().includes(search.toLowerCase())
                            ) {
                                return val
                            }


                        }).map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{row.fileName}</TableCell>
                                <TableCell align="center">{row.company}</TableCell>
                                <TableCell align="center">{row.personName}</TableCell>
                                <TableCell align="center">{row.department}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        onClick={() => handleDelete(row._id)}
                                        sx={{ color: 'red' }}>
                                        <DeleteIcon />
                                    </Button>
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