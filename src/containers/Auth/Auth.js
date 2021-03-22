import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { updatedObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Mail Address"
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount () {
        if (!this.props.building && this.props.authRedirectPath !== "/") {
            this.props.onSetAuthRedirectPath();
        }
    }

    InputChangedHandler = (event, controlName) => {
        const updatedState = updatedObject(this.state.controls, {
            [controlName]: updatedObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });

        this.setState({controls: updatedState});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchSignUpHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp };
        });
    }

    render () {
        const formElementArray = [];

        for(let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        
        let formInputs = formElementArray.map((formElement) => 
            <Input 
                key={formElement.id} 
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                shouldValidate={formElement.config.validation !== undefined}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                errorMessage={formElement.config.errorMessage ?? ''}
                changed={(event) => this.InputChangedHandler(event, formElement.id)} />
        );

        if (this.props.loading) {
            formInputs = <Spinner />;
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if (this.props.isAuth) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.onSubmitHandler}>
                    {formInputs}
                    <Button btnType="Success">{this.state.isSignUp? 'SIGN UP': 'LOG IN'}</Button>
                </form>
                <Button 
                    clicked={this.switchSignUpHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignUp? 'LOG IN': 'SIGN UP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        building: state.burgerBuilder.building
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => { dispatch(actions.auth(email, password, isSignUp)); },
        onSetAuthRedirectPath: () => { dispatch(actions.setAuthRedirectPath('/')); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);