//SurveyField contains logic to render a single label and input
import React from 'react';

//...input means that input component will copy all the listener from input parameter
//{touched && error} will return string if left is true, will return false if left is false
export default ({input, label, meta: {error, touched}}) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px'}}/>
            <div className="red-text" style={{ marginBottom: '20px'}}>
                {touched && error}
            </div>
        </div>
    );
}
