import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
}

const setIngredient = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    };
}

const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
}

export const initIngredient = () => {
    return (dispatch) => {
        axios.get('https://react-my-burger-73175.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredient(response.data));
        })
        .catch(error => {
            dispatch(fetchIngredientFailed());
        })
    };
}