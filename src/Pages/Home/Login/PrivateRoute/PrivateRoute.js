import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import { useLocation, Navigate } from "react-router-dom";
import useAuth from '../../../../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();
    let location = useLocation();

    if (isLoading) {
        return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    }

    if (user.email) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;

};

export default PrivateRoute;