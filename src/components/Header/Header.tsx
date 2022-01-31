import React, {useState} from 'react';
import {Logo} from './Logo';
import {NavBar} from "./NavBar";
import {AccBar} from "./AccBar";
import {Modal} from "../UI/Modal/Modal";
import {CreateBlogForm} from "../CreateBlogForm";
import {MyInput} from "../UI/myInput/MyInput";
import {useSearchParams} from "react-router-dom";
import { toObj } from '../../utils/toObj';


export const Header = () => {
    const [modalActive, setModalActive] = useState(false)
    const closeModal = () => setModalActive(false)
    const [query, setQuery] = useSearchParams()

    return (
        <div className='header'>
            <Logo/>
            <NavBar/>

            <MyInput onChange={(e) => setQuery({...toObj(query), search: e.target.value})} value={query.get('search') || ''}/>

            <button onClick={() => setModalActive(true)} className="create__blog-btn ">
                <span>
                    Create blog
                </span>
            </button>
            <AccBar/>
            <Modal active={modalActive} setActive={setModalActive}>
                <CreateBlogForm closeModal={closeModal}/>
            </Modal>
        </div>
    );
};
