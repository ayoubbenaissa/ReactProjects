import React from 'react';

export const NotFound = () => {
    return (
        <>
           <h1 className="x-large text-primary">
            <i className="fas fa-exclamation-triangle">{' '}Page not found...</i>   
            </h1>
            <p className="large">Sorry, this page does not exist</p>
        </>
    )
};

export default NotFound;
