import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const MakeAdmin = () => {
    const [admin, setAdmin] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdmin({ ...admin, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(admin)
        axios
            .post("https://vat-office-server.onrender.com/admin", admin)
            .then((res) => {

                setAdmin(res);
            });

        alert('You have successfully added an admin');
    };
    return (
        <>
            <div>
                <h2 className="text-center m-5">Make Admin</h2>
                <div>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            sx={{ width: '50%' }}
                            required
                            placeholder="Make admin"
                            name="admin"
                            type="email"
                            onChange={handleChange}
                            variant="standard" />
                        <br /> <br />
                        <Button type="submit" variant="contained" color="secondary">
                            Make Admin
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default MakeAdmin;