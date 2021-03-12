import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

//import styles specific to component
import "./App.scss";

//import any child components to be rendered
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import UploadPage from './pages/UploadPage/UploadPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App () {
        return (
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/upload" component={UploadPage}/>
                    <Route path="/video/:id" render={(props)=>(<HomePage {...props} />)}/>
                    <Route path="/notfound"  render={(props)=>(<NotFoundPage {...props} />)}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </BrowserRouter>
    );
}

export default App;
