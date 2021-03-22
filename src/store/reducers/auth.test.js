import { initIngredient } from '../actions';
import authReducer from './auth';
import * as actionTypes from '../../store/actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should store the token upon login', () => {
        expect(authReducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            localId: 'some-userId'
        })).toEqual({
            token: 'some-token',
            userId: 'some-userId',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
})