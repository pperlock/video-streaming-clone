import React from 'react';
import {Link} from 'react-router-dom';
//import styles specific to component
import "./Header.scss";

/**
HEADER COMPONENT
Includes navigation, search bar and upload capability for the site
 */
function Header(){
    return(
        <header className = "header">
            <nav className = "nav-bar">
                {/* separated into left and right for flex ability */}
                <div className = "nav-bar--left">
                    {/* send the user to the home page when logo is clicked */}
                    <Link className="nav-bar__logo-link" to="/"><img className="nav-bar__logo" src="/assets/images/Logo-brainflix.svg" alt="brainflix logo"/></Link>
                </div>
                <div className = "nav-bar--right">
                    {/* right side split into two divs for detailed flexing */}
                    <div className = "nav-bar__search">
                        <input className = "nav-bar__search-input" type = "text" placeholder="Search"></input>
                        <img className="nav-bar__search-icon" src="/assets/icons/Icon-search.svg" alt="search icon"/>
                    </div>
                    <div className = "nav-bar__upload">
                        {/* send the user to the upload page when button is clicked */}
                        <Link className="nav-bar__upload-btn-link" to="/upload">
                            <button className = "nav-bar__upload-btn"> <img src="/assets/icons/Icon-upload.svg" alt="upload button"/> UPLOAD</button>
                        </Link>
                        <div className = "nav-bar__upload-avatar" style={{ backgroundImage: `url(/assets/images/Mohan-muruge.jpg)`}}> </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;