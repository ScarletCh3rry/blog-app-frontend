import React, {ChangeEvent} from 'react';
import classes from './MyInput.module.css'

type Props = {
    value: string,
    onChange: (e:ChangeEvent<HTMLInputElement>) => void
}

export const MyInput = (props: Props) => {
    return (
        <input className={classes.myInput} {...props}/>
    );
};
