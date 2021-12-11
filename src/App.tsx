import React, {useEffect} from 'react';
import './styles/App.css';
import {Header} from "./components/Header/Header";
import {AppContent} from "./components/AppContent";
import {authStore} from "./store/AuthStore";
import {toJS} from "mobx";

const App = () => {
    useEffect(() => {
        authStore.checkAuth()
        console.log(toJS(authStore.checkAuth))
    },[])
    return (
        <div className="app">
            <Header/>,
            <AppContent/>
        </div>
    );
};

export default App;