import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import WithErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/index';
import { updatedObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 15
                },
                valid: false,
                errorMessage: "Name should be between 5 ~ 15 characters!",
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Country"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 15
                },
                valid: false,
                errorMessage: "Country should be between 5 ~ 15 characters!",
                touched: false
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 15
                },
                valid: false,
                errorMessage: "Street should be between 5 ~ 15 characters!",
                touched: false
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Postal Code"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 15
                },
                valid: false,
                errorMessage: "Postal Code should be between 5 ~ 15 characters!",
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Mail"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 15
                },
                valid: false,
                errorMessage: "Email should be between 5 ~ 15 characters!",
                touched: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" }
                    ]
                },
                value: "fastest",
                validation: {},
                valid: true,
                erorrMessage: "",
                touched: false
            }
        },
        formIsValid: false
    };
    
    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};

        for(let formElementKey in this.state.orderForm) {
            formData[formElementKey] = this.state.orderForm[formElementKey].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onBurgerOrdered(order, this.props.token);
    }

    InputChangedHandler = (event, id) => {
        const updatedFormElement = updatedObject(this.state.orderForm[id], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[id].validation),
            touched: true
        });

        const updatedOrderForm = updatedObject(this.state.orderForm, {
            [id]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentity in updatedOrderForm) {
           formIsValid = updatedOrderForm[inputIdentity].valid && formIsValid; 
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render () {
        const formElementArray = [];

        for(let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => 
                    <Input 
                        key={formElement.id} 
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        shouldValidate={formElement.config.validation !== undefined}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        errorMessage={formElement.config.errorMessage ?? ''}
                        changed={(event) => this.InputChangedHandler(event, formElement.id)} />)}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if(this.props.loading) {
            form = <Spinner />;   
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onBurgerOrdered: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios));