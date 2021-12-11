import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {PostList} from "./PostList";
import {LoginPage} from "./Pages/LoginPage";

export const AppContent = () => {
    return (
        <div className="app__content">
            <Routes>
                <Route index element={<PostList/>}/>
                <Route path="login" element={<LoginPage/>}/>
            </Routes>
        </div>
    );
};

