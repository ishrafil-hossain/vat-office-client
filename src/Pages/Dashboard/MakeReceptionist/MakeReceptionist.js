import { TextField } from '@mui/material';
import React, { useState } from 'react';
import Button from '@mui/material/Button';

const MakeReceptionist = () => {
    const [email, setEmail] = useState('');

    const handleOnBlur = e => {
        setEmail(e.target.value);
    }

    const handleAdminSubmit = e => {
        alert('You have successfully added an receiptionist')
        const user = { email };
        fetch('https://shrouded-spire-42050.herokuapp.com/users/receptionist', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setEmail('');
                }
                console.log(data);
            })
        e.preventDefault();
    }
    return (
        <div>
            <h2 className="text-center m-5">Make Receptionist</h2>
            <div>
                <form onSubmit={handleAdminSubmit}>
                    <TextField
                        sx={{ width: '50%' }}
                        required
                        label="Email"
                        type="email"
                        onBlur={handleOnBlur}
                        variant="standard" />
                    <br /> <br />
                    <Button type="submit" variant="contained" color="success">
                        Make Receptionist
                    </Button>
                </form>
            </div>

        </div>
    );
};

export default MakeReceptionist;