import React, {useEffect} from 'react';
import './styles/App.scss';
import {Header} from "./components/Header/Header";
import {AppContent} from "./components/AppContent";
import {authStore} from "./store/AuthStore";
import {toJS} from "mobx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
    useEffect(() => {
        authStore.checkAuth()
        console.log(toJS(authStore.checkAuth))
    },[])
    return (
        <div className="app">
            <Header/>
            <AppContent/>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default App;