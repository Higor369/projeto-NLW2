import React, {SelectHTMLAttributes} from 'react'

import 'styles.css';

interface ImputProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    options: Array<{
        value:string;
        label:string;
    }>

}

const Select: React.FC<ImputProps> = ({label, name,options, ...rest}) => {
    return(
        <>
        <div className="Select-block">
            <label htmlFor={name}>{label}</label>
            <select id={name} {...rest} >
                <option value='' disabled selected hidden>Selecione </option>

                {options.map(op =>{
                    return <option key={op.label} value={op.value}>{op.value}</option>
                })}
            </select>
        </div>
    
        </>
        )
}

export default Select;