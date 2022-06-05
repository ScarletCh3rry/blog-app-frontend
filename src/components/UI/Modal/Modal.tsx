import React, { FC } from "react"
import {SetState} from "../../../types/setState";
import styles from "../Modal/Modal.module.scss";

type Props = {
    active: boolean,
    setActive: SetState<boolean>
}

export const Modal: FC<Props> = ({active, setActive, children}) => {
    return (
        <div className={active ? `${styles.modal} ${styles.active}` : `${styles.modal}`}
             onClick={() => setActive(false)}>
            <div className={active ? `${styles.content} ${styles.active}`: `${styles.content}`}
                 onClick={e => e.stopPropagation()}>
                {/*<button className={styles.close} onClick={() => setActive(false)}>X</button>*/}
                {children}
            </div>
        </div>
    )
}