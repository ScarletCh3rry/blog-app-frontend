import React, {useState} from 'react';
import { Logo } from './Logo';
import {NavBar} from "./NavBar";
import {AccBar} from "./AccBar";
import {Modal} from "../UI/Modal/Modal";
import {CreateBlogForm} from "../CreateBlogForm";

export const Header = () => {
    const [modalActive, setModalActive] = useState(false)
    const closeModal = () => setModalActive(false)
    return (
        <div className='header'>
            <Logo/>
            <NavBar/>
            <AccBar/>
            <button onClick={() => setModalActive(true)}>
                Create blog
            </button>
            <Modal active={modalActive} setActive={setModalActive}>
                <CreateBlogForm closeModal={closeModal}/>
            </Modal>
        </div>
    );
};
