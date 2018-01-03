//SurveyForm shows form to user to add input
import _ from 'lodash';
import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from  '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {
        //using lodash map to iterate FIELDS
        return _.map(formFields, ({label, name}) => {
            return (
                <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
            );
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}


//values will contain object contains of all the field (survey title, subject line, etc)
function validate(values){
    const errors = {};

    //return undefined if no error
    errors.recipients = validateEmails(values.recipients || '');


    _.each(formFields, ({ label, name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a '+label;
        }
    });

    //if return empty 'errors', reduxForm assume no error
    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);