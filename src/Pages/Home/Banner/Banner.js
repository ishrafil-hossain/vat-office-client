import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import banner2 from '../../../images/banner2.jpg';
import { Button, Container, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';


const varticatCenter = {
    display: 'flex',
    alignItems: 'center',
    height: 500
}

const Banner = () => {
    return (
        <Container >
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} style={varticatCenter}>
                        <Box>
                            <Typography variant="h3">
                                This is the home pages
                            </Typography>
                            <Typography variant="h6" sx={{ my: 4, fontSize: 14, fontWeight: 300, color: 'gray' }}>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur error sed minus provident, tempora incidunt. Quo, ea molestias maiores qui pariatur voluptate quis et rem, impedit amet totam, ab voluptates.
                            </Typography>

                            <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/dashboard">
                                <Button variant="contained" style={{ backgroundColor: '#5CE7ED' }}>Dashboard</Button>
                            </NavLink>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} style={varticatCenter}>
                        <img style={{ width: '100%', borderRadius: 50 }} src={banner2} alt="" />
                    </Grid>

                </Grid>
            </Box>
        </Container>
    );
};

export default Banner;