import React, { useState } from 'react';

import { auth } from './firebase.js';
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';

import './Login.css';

function Login() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');

    const dispatch = useDispatch();

    const loginToApp = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
        .then((userAuth) => {
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoURL: profilePic
            }));
        })
        .catch((error) => alert(error));

        console.log(' ** loginToApp ** ');
    }

    const checkField = (field, fieldName) => {
        if (!field) alert(`Please enter a valid ${fieldName}`);
    }

    const registerToApp = () => {

        console.log(' ** registerToApp ** ');

        checkField(name, 'name');
        checkField(email, 'email');
        checkField(password, 'password');

        auth.createUserWithEmailAndPassword(email, password)
        .then((userAuth) => {
            userAuth.user.updateProfile({
                displayName: name,
                photoURL: profilePic
            })
            .then(() => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: name,
                    photoURL: profilePic
                }));
            })
        })
        .catch(err => alert(err));
    }

    return (
        <div className="login">
            <img src="https://www.logo.wine/a/logo/LinkedIn/LinkedIn-Logo.wine.svg" alt="linkedin" />

            <form id="login__form">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name*" type="text" />
                <input value={profilePic} onChange={e => setProfilePic(e.target.value)} placeholder="Profile Pic URL (optional)" type="text" />
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email*" type="email" />
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password*" type="password" />

                <button type="submit" onClick={loginToApp}>Sign In</button>
            </form>

            <p>
                Not a member?
                <span className="login__register" onClick={registerToApp}> {' '}Register Now</span>
            </p>
        </div>
    )
}

export default Login;
