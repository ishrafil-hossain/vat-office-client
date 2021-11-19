import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MyFile from '../MyFile/MyFile';
import AllFile from '../AllFile/AllFile';
import AddFile from '../AddFile/AddFile';
import useAuth from '../../../hooks/useAuth';
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";
import { Button } from '@mui/material';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DescriptionIcon from '@mui/icons-material/Description';
import HomeIcon from '@mui/icons-material/Home';


const drawerWidth = 200;

function Dashboard(props) {
    const { user } = useAuth();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    let { path, url } = useRouteMatch();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar>
                <h2><AccountCircleIcon /> {user.displayName}</h2>
            </Toolbar>
            <Divider />

            {/* nested route in dashboard  */}

            <Box sx={{ textAlign: 'center', marginTop: '15PX' }}>
                <Link style={{ textDecoration: 'none', color: 'black' }} to={`${url}/dashboard`}> <Button color='inherit'><HomeIcon />Home</Button> </Link> <br />
                <Link style={{ textDecoration: 'none', color: 'black' }} to={`${url}/myFile`}> <Button color='inherit'><DescriptionIcon />My File</Button> </Link> <br />
                <Link style={{ textDecoration: 'none', color: 'black' }} to={`${url}/allFile`}> <Button color='inherit'><DriveFileMoveIcon />All File</Button> </Link> <br />
                <Link style={{ textDecoration: 'none', color: 'black' }} to={`${url}/addFile`}> <Button color='inherit'><AddBoxIcon /> Add File</Button> </Link> <br />
            </Box>

            {/* <List>
                {['Home', 'Add File', 'All Files', 'My Files', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List> */}

        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                    <Link style={{ textDecoration: 'none', color: 'white', marginLeft: '30PX' }} to="/home">
                        <Typography>Home</Typography>
                    </Link>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >

                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Typography paragraph>
                    <Switch>
                        <Route exact path={path}>

                        </Route>
                        <Route path={`${path}/myFile`}>
                            <MyFile></MyFile>
                        </Route>

                        <Route path={`${path}/allFile`}>
                            <AllFile></AllFile>
                        </Route>

                        <Route path={`${path}/addFile`}>
                            <AddFile></AddFile>
                        </Route>
                    </Switch>

                </Typography>

            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;