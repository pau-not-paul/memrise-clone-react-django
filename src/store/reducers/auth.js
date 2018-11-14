import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	token: null,
	loginError: null,
	signupError: null,
	loading: true,
};

const authStart = (state, action) => {
	return updateObject(state, {
		loginError: null,
		signupError: null,
		loading: true,
	});
};

const authSuccess = (state, action) => {
	return updateObject(state, {
		token: action.token,
		loginError: null,
		signupError: null,
		loading: false,
	});
};

const authFailLogin = (state, action) => {
	return updateObject(state, {
		loginError: action.error,
		loading: false,
	});
};

const authFailSignup = (state, action) => {
	return updateObject(state, {
		signupError: action.error,
		loading: false,
	});
};

const authLogout = (state, action) => {
	return updateObject(state, {
		token: null,
		loading: false,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state, action);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAIL_LOGIN:
			return authFailLogin(state, action);
		case actionTypes.AUTH_FAIL_SIGNUP:
			return authFailSignup(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action);
		default:
			return state;
	}
};

export default reducer;
