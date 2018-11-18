import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import SignUp from './containers/SignUp/SignUp';
import * as authActions from './store/actions/auth';
import * as profileActions from './store/actions/profile';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

class App extends Component {
	state = {
		Courses: null,
		Learn: null,
		Course: null,
		CreateCourse: null,
		EditCourse: null,
		NotFound: null,
	};

	componentDidMount() {
		this.props.onTryAutoSignup();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.isAuthenticated && !prevProps.isAuthenticated) {
			this.props.profileLoad(this.props.token);
			const path = this.props.location.pathname;
			if (path === '/home' || path === '/login' || path === '/register') {
				setTimeout(this.loadComponents, 500);
			} else {
				this.loadComponents();
			}
		}
	}

	loadComponents = () => {
		const components = ['Courses', 'Learn', 'Course', 'CreateCourse', 'EditCourse', 'NotFound'];
		for (let c of components) {
			import('./containers/' + c + '/' + c).then(component =>
				this.setState({ [c]: component.default }),
			);
		}
	};

	render() {
		const { isAuthenticated, loading } = this.props;
		if (isAuthenticated) {
			const { Courses, Learn, Course, CreateCourse, EditCourse, NotFound } = this.state;
			return (
				<ErrorBoundary>
					<Switch>
						<Route path="/logout" exact component={Logout} />
						<Route path="/course/create" exact component={CreateCourse} />
						<Route path="/course/:courseId/edit" exact component={EditCourse} />
						<Route path="/course/:courseId" exact component={Course} />
						<Route path="/courses" exact component={Courses} />
						<Route path="/learn/:courseId" exact component={Learn} />
						<Route path="/home" exact component={Home} />
						<Redirect path="/" exact to="/home" />
						<Redirect path="/join" exact to="/home" />
						<Redirect path="/login" exact to="/home" />
						<Route path="*" component={NotFound} />
					</Switch>
				</ErrorBoundary>
			);
		}
		return (
			<Switch>
				<Route path="/join" exact component={SignUp} />
				<Route path="/login" exact component={Login} />
				{!loading && <Redirect path="*" to="/login" />}
			</Switch>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.token !== null,
	token: state.auth.token,
	loading: state.auth.loading,
});

const mapDispatchToProps = dispatch => ({
	onTryAutoSignup: () => dispatch(authActions.authCheckState()),
	profileLoad: token => dispatch(profileActions.profileLoad(token)),
});

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(App),
);

App.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	onTryAutoSignup: PropTypes.func.isRequired,
	token: PropTypes.string,
};

App.defaultProps = {
	token: '',
};
