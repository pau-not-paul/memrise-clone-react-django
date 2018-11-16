import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import Welcome from '../../components/Home/Welcome/Welcome';
import LeftColumn from '../../components/Home/LeftColumn/LeftColumn';
import CourseCard from '../../components/Home/CourseCard/CourseCard';

import * as profileActions from '../../store/actions/profile';

export class Home extends Component {
	static propTypes = {
		profile: PropTypes.object.isRequired,
	};

	state = {
		coursesHTML: (
			<React.Fragment>
				<CourseCard loading />
				<CourseCard loading />
			</React.Fragment>
		),
	};

	componentDidMount() {
		document.title = 'Dashboard - Memrise';
		this.loadCourses();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.profile.courses !== prevProps.profile.courses) {
			this.loadCourses();
		}
	}

	loadCourses = (props = this.props) => {
		if (!props.profile.loading) {
			let coursesHTML = [];
			if (props.profile.courses.length === 0) {
				coursesHTML = <Welcome />;
			} else {
				for (let course of props.profile.courses) {
					coursesHTML.push(
						<CourseCard
							key={course.id}
							learn={this.learn}
							course={course}
							quitCourse={this.quitCourse}
						/>,
					);
				}
			}
			this.setState({
				coursesHTML: coursesHTML,
			});
		}
	};

	learn = courseId => {
		this.props.history.push('/learn/' + courseId);
	};

	quitCourse = courseId => {
		axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
		axios.defaults.xsrfCookieName = 'csrftoken';

		axios.defaults.headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${this.props.token}`,
		};

		const url =
			window.location.href.indexOf('heroku') !== -1
				? 'https://memclone-react-django.herokuapp.com/'
				: 'http://127.0.0.1:8000/';

		axios.post(url + 'profiles-api/remove/' + courseId + '/').then(res => {
			this.props.updateProfile();
		});
	};

	render() {
		return (
			<React.Fragment>
				<Header url={this.props.match.url} />
				{/*<div className={styles.PageHead}>
					<div className={styles.PageHeadRow}>
						<div className={styles.Title}>
							German
						</div>
					</div>
				</div>*/}
				<div className={styles.Content}>
					<div className={styles.ContainerMain}>
						<LeftColumn profile={this.props.profile} />
						<div className={styles.RightColumn}>{this.state.coursesHTML}</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		profile: state.profile,
		token: state.auth.token,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateProfile: () => dispatch(profileActions.profileLoad()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Home);
