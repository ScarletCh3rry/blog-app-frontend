import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {LoginPage} from "./Pages/LoginPage";
import {FilteredPostList} from "./Pages/FilteredPostList";
import {UserListPage} from "./Pages/UserListPage";
import {RegisterPage} from "./Pages/RegisterPage";
import {ProfilePage} from "./Pages/ProfilePage";
import {BlogPage} from "./Pages/BlogPage";
import {UserBlogs} from "./Pages/UserBlogs";
import {CreatePostPage} from "./Pages/CreatePostPage";
import {SubscriptionsPage} from "./Pages/SubscriptionsPage";
import { FullPostView } from './Pages/FullPostView';
import {QuizPage} from "./Pages/QuizPage";

export const AppContent = () => {
    return (
        <div className="app__content">
            <Routes>
                <Route index element={<FilteredPostList/>}/>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="users" element={<UserListPage/>}/>
                <Route path="register" element={<RegisterPage/>}/>
                <Route path="profile/:login" element={<ProfilePage/>}/>
                <Route path="blogs/:blogSlug/create-post" element={<CreatePostPage/>}/>
                <Route path="blogs/:login" element={<UserBlogs/>}/>
                <Route path="blogs/:login/:blogSlug" element={<BlogPage/>}/>
                <Route path="blogs/:login/:blogSlug/:postSlug" element={<FullPostView/>}/>
                <Route path="blogs/:login/:blogSlug/:postSlug/:quizSlug" element={<QuizPage/>}/>
                <Route path=":login/subscriptions" element={<SubscriptionsPage/>}/>
                {/*<Route path="posts/:postId" element={<FullPostView/>}/>*/}
            </Routes>
        </div>
    );
};

