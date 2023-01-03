import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'


const NotFound = () => {
    return (
        <div className='not-found'>
            <div>
                <h2>NotFound Error 404</h2>
                <h3>Please try again</h3>
                <Link to="/home"> Go Home</Link>
            </div>
        </div>
    );
};
export default NotFound;