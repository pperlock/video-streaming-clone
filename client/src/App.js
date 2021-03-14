import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

//import styles specific to component
import "./App.scss";

//import any child components to be rendered
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import UploadPage from './pages/UploadPage/UploadPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={LoginPage}/>
                <Route path="/home" component={HomePage}/>
                <Route path="/upload" component={UploadPage}/>
                <Route path="/video/:id" render={(props)=>(<HomePage {...props} />)}/>
                <Route path="/notfound"  render={(props)=>(<NotFoundPage {...props} />)}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
