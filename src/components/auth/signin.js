import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const renderInput = field =>
    <div>
        <input {...field.input} type={field.type} className="form-control" />
    </div>

class Signin extends Component {

    handleFormSubmit({ email, password}){
        console.log(email, password);
        this.props.signinUser({email, password});
    }

    renderAlert(){
        if(this.props.errorMessage){
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render(){
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field name="email" component={renderInput} type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Email</label>
                    <Field name="password" component={renderInput} type="password" />
                </div>
                { this.renderAlert() }
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

let InitializeFromStateForm = reduxForm({
    form: 'signin',
    enableReinitialize : true
})(Signin);
InitializeFromStateForm = connect(mapStateToProps, actions)(InitializeFromStateForm);
export default InitializeFromStateForm;