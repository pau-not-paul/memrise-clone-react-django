import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = token => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
	};
};

export const authFail = (error, isLogin) => {
	if (isLogin) {
		return {
			type: actionTypes.AUTH_FAIL_LOGIN,
			error: error,
		};
	} else {
		return {
			type: actionTypes.AUTH_FAIL_SIGNUP,
			error: error,
		};
	}
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('username');
	localStorage.removeItem('expirationDate');
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const authLogin = (username, password) => {
	return dispatch => {
		dispatch(authStart());

		const url =
			window.location.href.indexOf('heroku') !== -1
				? 'https://memclone-react-django.herokuapp.com/'
				: 'http://127.0.0.1:8000/';

		axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
		axios.defaults.xsrfCookieName = 'csrftoken';

		axios.defaults.headers = {
			'Content-Type': 'application/json',
			Authorization: '',
		};

		axios
			.post(url + 'rest-auth/login/', {
				username: username,
				password: password,
			})
			.then(res => {
				const token = res.data.key;
				const expirationDate = new Date(new Date().getTime() + 24 * 3600 * 1000);
				localStorage.setItem('token', token);
				localStorage.setItem('username', username);
				localStorage.setItem('expirationDate', expirationDate);
				dispatch(authSuccess(token));
				dispatch(checkAuthTimeout(3600));
			})
			.catch(err => {
				dispatch(authFail(err, true));
			});
	};
};

export const authSignup = (username, email, password) => {
	return dispatch => {
		dispatch(authStart());

		const url =
			window.location.href.indexOf('heroku') !== -1
				? 'https://memclone-react-django.herokuapp.com/'
				: 'http://localhost:8000/';

		axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
		axios.defaults.xsrfCookieName = 'csrftoken';

		axios.defaults.headers = {
			'Content-Type': 'application/json',
			Authorization: '',
		};

		axios
			.post(url + 'rest-auth/registration/', {
				username: username,
				email: email,
				password1: password,
				password2: password,
			})
			.then(res => {
				const token = res.data.key;
				const expirationDate = new Date(new Date().getTime() + 24 * 3600 * 1000);
				localStorage.setItem('token', token);
				localStorage.setItem('username', username);
				localStorage.setItem('expirationDate', expirationDate);
				dispatch(authSuccess(token));
				dispatch(checkAuthTimeout(3600));

				axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
				axios.defaults.xsrfCookieName = 'csrftoken';

				axios.defaults.headers = {
					'Content-Type': 'application/json',
					Authorization: `Token ${token}`,
				};
				axios.post(url + 'profiles-api/create/', {
					courses: [],
					progress: '{}',
				});
			})
			.catch(err => {
				dispatch(authFail(err, false));
			});
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (token === undefined) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				dispatch(authSuccess(token));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
			}
		}
	};
};
