import React from 'react';
import { Link } from 'react-router-dom';

function About() {
    return (
        <div>
            <h2>Simple React task tracker</h2>
            <h4>Version 1.0.0</h4>
            <Link to="/">Go Back</Link>
        </div>
    )
}

export default About;
