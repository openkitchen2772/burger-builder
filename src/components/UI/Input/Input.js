import React from "react";

import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];
    let inputErrorMessage = null;

    if (props.shouldValidate && props.touched && props.invalid) {
        inputClasses.push(classes.Invalid);
        inputErrorMessage = <p className={classes.ErrorMessage}>{props.errorMessage}</p> ;
    }

    switch(props.elementType) {
        case ("input"):
            inputElement = <input 
                className={inputClasses.join(" ")} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />;
            break;
        case ("textarea"):
            inputElement = <textarea 
                className={inputClasses.join(" ")} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}  />;
            break;
        case ("select"):
            inputElement = (
                <select
                    className={inputClasses.join(" ")}
                    value={props.value}
                    onChange={props.changed}>
                        {props.elementConfig.options.map(option => 
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>)}
                </select>
            );
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(" ")} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />;
    }
    
    return (
        <div>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {inputErrorMessage}
        </div>
    );
};

export default input;