import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const renderInput = ({ input, label, type, meta: { touched, error } })  =>
    <div>
        <input className="form-control" {...input} placeholder={label} type={type}/>
        {touched && error && <span className="error">{error}</span>}
    </div>

class Signup extends Component{
    handleFormSubmit(formProps){
        // call action creator to sign up the user!
        this.props.signupUser(formProps);

    }
    renderAlert(){
        if(this.props.errorMessage){
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }

    render(){
        const { handleSubmit, fields: {email, password, passwordConfirm}} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <Field name="email" type="email" component={renderInput} label="Email"/>
                </fieldset>
                <fieldset className="form-group">
                    <Field name="password" type="password" component={renderInput} label="Password"/>
                </fieldset>
                <fieldset className="form-group">
                    <Field name="passwordConfirm" component={renderInput} type="password" label="Password Confirm" />
                </fieldset>
                { this.renderAlert() }
                <button action="submit" className="btn btn-primary">Sign Up</button>
            </form>
        );
    }
}

function validate(formProps) {
    const errors = {};

    if(!formProps.email){
        errors.email = 'Please provide email';
    }

    if(!formProps.password){
        errors.password = 'Please provide password';
    }

    if(formProps.password !== formProps.passwordConfirm){
        errors.password = 'Passwords must match';
    }

    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

const signupForm = reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
})(Signup);

export default connect(mapStateToProps, actions)(signupForm);