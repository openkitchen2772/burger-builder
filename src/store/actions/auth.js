import axios from 'axios';

import * as actionTypes from './actionTypes';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        localId: localId
    };
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const authLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const checkAuthTimeout = (expiresIn) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expiresIn * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBo-JeHzRl4vJ0U0elk5SIR7xlLlLAwZSs';
        if (isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBo-JeHzRl4vJ0U0elk5SIR7xlLlLAwZSs';
        }

        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem("token", response.data.idToken);
                localStorage.setItem("userId", response.data.localId);
                localStorage.setItem("expirationDate", expirationDate);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            });
    };
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        authRedirectPath: path
    };
}

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (token) {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem("userId");
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
            else { 
                dispatch(authLogout());
            }
        } else {
            dispatch(authLogout());
        }
    };
}