import React from 'react';

import './Login.css';

function Login() {
    return (
        <div className="login">
            <h1>Login</h1>
            <img src="https://www.logo.wine/a/logo/LinkedIn/LinkedIn-Logo.wine.svg" alt="linkedin" />

            <form>
                <input placeholder="Full name" type="text" />
            </form>
        </div>
    )
}

export default Login;
