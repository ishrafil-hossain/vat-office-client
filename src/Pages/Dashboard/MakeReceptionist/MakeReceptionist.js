import { TextField } from '@mui/material';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

const MakeReceptionist = () => {
    const [receptionist, setReceptionist] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReceptionist({ ...receptionist, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5000/receptionist", receptionist)
            .then((res) => {
                setReceptionist(res);
            });

        alert('You have successfully added an receptionist');
    };

    return (
        <>
            <div>
                <h2 className="text-center m-5">Make Receptionist</h2>
                <div>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            sx={{ width: '50%' }}
                            required
                            label="Email"
                            name="receptionist"
                            type="email"
                            onChange={handleChange}
                            variant="standard" />
                        <br /> <br />
                        <Button type="submit" variant="contained" color="success">
                            Make Receptionist
                        </Button>
                    </form>
                </div>

            </div>
        </>

    );
};

export default MakeReceptionist;