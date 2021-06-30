import React from 'react';
import {Link} from 'react-router-dom';

function UrlError() {
    return (
        <div>
            <h2>Error 404: Page not found</h2>
            <p>The requested URL could not be found</p>
            <p><Link to="/">Please go back to the home page</Link></p>
        </div>        
    )
}

export default UrlError;