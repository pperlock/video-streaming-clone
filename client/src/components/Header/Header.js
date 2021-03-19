import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {connect, useSelector, useDispatch} from 'react-redux';

//import styles specific to component
import "./Header.scss";

import {userLogout} from '../../actions/user';

/**
HEADER COMPONENT
Includes navigation, search bar and upload capability for the site
 */


function Header({match}){
    
    const dispatch = useDispatch();
    const avatar = useSelector(state=>state.userStore.user.avatar);
        
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () =>{
        setShowMenu(!showMenu);
    }

    const logout =() =>{
        dispatch(userLogout);
        window.location.href = "/";
    }

    return(
        <>
        <header className = "header">
            <nav className = "nav-bar">
                {/* separated into left and right for flex ability */}
                <div className = "nav-bar--left">
                    {/* send the user to the home page when logo is clicked */}
                    {/* <Link className="nav-bar__logo-link" to="/"><img className="nav-bar__logo" src="/assets/images/Logo-brainflix.svg" alt="brainflix logo"/></Link> */}
                    <Link className="nav-bar__logo-link" to="/">
                        <img className="nav-bar__logo" src="/assets/icons/video.svg" alt="brainflix logo"/>
                        <p className="nav-bar__logo-name">video<span className="nav-bar__logo-name--accent">Streamer</span></p>
                    </Link>
                </div>
                {/* right side split into two divs for detailed flexing */}
                <div className = "nav-bar--right">
                <div className = "nav-bar__search">
                    <input className = "nav-bar__search-input" type = "text" placeholder="Search"></input>
                    <img className="nav-bar__search-icon" src="/assets/icons/Icon-search.svg" alt="search icon"/>
                </div>
                    <div className = "nav-bar__upload">
                        {/* send the user to the upload page when button is clicked */}
                        <Link className="nav-bar__upload-btn-link" to={`/upload/${match.params.username}`}>
                            <button className = "nav-bar__upload-btn"> <img className="nav-bar__upload-btn-icon" src="/assets/icons/upload-icon.svg" alt="upload button"/> UPLOAD</button>
                        </Link>
                        <div onClick={toggleMenu}className = "nav-bar__upload-avatar" style={{ backgroundImage: `url(${avatar})`}}> </div>
                    </div>

                </div>
            </nav>
        </header>
        <div onClick={logout} className={showMenu ? "signout--on" : "signout"}>
            <p className="signout__text">Sign Out</p>
        </div>
        </>
    );
};

export default connect(null)(Header);