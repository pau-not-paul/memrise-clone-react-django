import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './containers/Home/Home';
import Courses from './containers/Courses/Courses';
import Course from './containers/Course/Course';
import CreateCourse from './containers/CreateCourse/CreateCourse';
import EditCourse from './containers/EditCourse/EditCourse';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import SignUp from './containers/SignUp/SignUp';
import NotFound from './containers/NotFound/NotFound';
import * as authActions from './store/actions/auth';
import * as profileActions from './store/actions/profile';

class App extends Component {

	componentDidMount() {
		this.props.onTryAutoSignup();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.token !== nextProps.token) {
			this.props.profileLoad(nextProps.token);
		}
	}

	render() {
		if (this.props.isAuthenticated) {
			return (
				<Switch>
					<Route path='/logout' exact component={Logout} />
					<Route path='/course/create' exact component={CreateCourse} />
					<Route path='/course/:courseId/edit' exact component={EditCourse} />
					<Route path='/course/:courseId' exact component={Course} />
					<Route path='/courses/:courseId' exact component={Courses} />
					<Route path='/courses' exact component={Courses} />
					<Route path='/home' exact component={Home} />
					<Redirect path='/' exact to='/home' />
					<Redirect path='/join' exact to='/home' />
					<Redirect path='/login' exact to='/home' />
					<Route path='*' component={NotFound} />
				</Switch>
			);
		} else {
			return (
				<Switch>
					<Route path='/join' exact component={SignUp} />
					<Route path='/login' exact component={Login} />
					{this.props.loading ?
						null : <Redirect path='*' to='/login' />
					}
				</Switch>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
		token: state.auth.token,
		loading: state.auth.loading,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => dispatch(authActions.authCheckState()),
		profileLoad: (token) => dispatch(profileActions.profileLoad(token))
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));