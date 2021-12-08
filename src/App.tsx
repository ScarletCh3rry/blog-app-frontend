import React from 'react';
import './styles/App.css';
import {Header} from "./components/Header/Header";
import {AppContent} from "./components/AppContent";

const App = () => {
    return (
        <div className="app">
            <Header/>,
            <AppContent/>
        </div>
    );
};

export default App;