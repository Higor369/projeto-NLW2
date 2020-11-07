import React, {InputHTMLAttributes} from 'react'

import 'styles.css';

interface ImputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;

}

const Input: React.FC<ImputProps> = ({label, name, ...rest}) => {
    return(
        <>
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input id={name} type="text" {...rest} ></input>
        </div>
    
        </>
        )
}

export default Input;