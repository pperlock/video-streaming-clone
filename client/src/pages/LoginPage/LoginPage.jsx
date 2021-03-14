import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import {connect, useSelector, useDispatch} from 'react-redux';

//import styles specific to component
import "./LoginPage.scss";

import {getUser} from '../../actions/user';

function LoginPage() {
    
    const dispatch = useDispatch();

    const [loggedIn, setLoggedIn] = useState(false);

    const login = (event)=>{
        event.preventDefault();
        console.log(event.target.username.value)
        dispatch(getUser(event.target.username.value));
        setLoggedIn(true);
        event.target.username.value="";
    }
    

    return (
        <>
        {loggedIn && <Redirect to="/home"></Redirect>}
        <div className="login-body">
            <div className="nav-bar__logo-link" >
                <img className="nav-bar__logo" src="/assets/icons/video.svg" alt="brainflix logo"/>
                <p className="nav-bar__logo-name">video<span className="nav-bar__logo-name--accent">Streamer</span></p>
            </div>
            <form id="login" className="login" onSubmit={login}>
                <input name="username" className="login__username" type="text" placeholder="Enter Username"/>
                <button form="login" className="login__submit" type="submit">LogIn</button>
            </form>
        </div>
        </>
    )
}

export default connect(null,null)(LoginPage);