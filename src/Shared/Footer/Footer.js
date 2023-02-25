import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';

const Footer = () => {
    return (
        <div >
            <Box sx={{ flexGrow: 1, backgroundColor: '#282A35' }}>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} >
                            <Box>
                                <Typography variant="h5" sx={{ color: 'gray' }}>
                                    Address
                                </Typography>
                                <Typography variant="h6" sx={{ my: 4, fontSize: 14, fontWeight: 300, color: 'gray' }}>
                                    ১৫২/১, এস. ইসলাম পার্ক ভিউ, পার্ক রোড, ছোটরা, কুমিল্লা-৩৫০০ <br />
                                    Telephone : 081-69291 <br />
                                    Fax : 081-65218 <br />
                                    Email : cevccomilla@gmail.com <br />
                                    Facebook Page : Customs, Excise And VAT Commissionerate, Cumilla


                                </Typography>

                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" sx={{ color: 'gray' }}>
                                Useful Link
                            </Typography>
                            <Typography variant="h4" sx={{ my: 4, fontSize: 14, fontWeight: 300, color: 'gray' }}>
                                <a style={{ textDecoration: 'none', color: 'gray' }} href="https://cevccumilla.gov.bd/order.aspx">Order</a> <br /> <br />
                                <a style={{ textDecoration: 'none', color: 'gray' }} href="https://cevccumilla.gov.bd/auction.aspx">Auction</a> <br /> <br />
                                <a style={{ textDecoration: 'none', color: 'gray' }} href="https://cevccumilla.gov.bd/rti.aspx">RTI</a> <br /> <br />
                                <a style={{ textDecoration: 'none', color: 'gray' }} href="https://cevccumilla.gov.bd/contact.aspx">Contact</a>
                            </Typography>
                        </Grid>

                    </Grid>
                </Container>
                <p style={{ color: 'gray', textAlign: 'center' }}> &copy; 2020 Customs, Excise And VAT Commissionerate, Cumilla. All Rights Reserved.
                    Designed And Developed by DTCL.</p>
            </Box>
        </div>
    );
};

export default Footer;