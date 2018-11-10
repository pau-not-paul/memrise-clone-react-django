import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styles from './Course.module.css';
import Header from '../../components/Header/Header';
import Spinner from '../../components/Spinner/Spinner';
import QuitCourseModal from '../../components/QuitCourseModal/QuitCourseModal';
import * as profileActions from '../../store/actions/profile';

class Course extends Component {
	constructor(props) {
		super(props);
		this.courseId = props.match.params.courseId;
	}

	state = {
		courseId: null,
		title: null,
		description: null,
		added: false,
		loading: true,
		modal: false,
	}

	componentDidMount() {
		this.loadCourse();
		this.checkIfAdded();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.profile.courses !== nextProps.profile.courses) {
			this.checkIfAdded(nextProps);
		}
	}

	checkIfAdded = (props = this.props) => {
		if (!props.profile.loading) {
			this.setState({ loading: false });
			const courses = props.profile.courses;
			let added = false;
			if (courses && courses.length !== 0) {
				for (let c of courses) {
					if (String(c.id) === this.courseId) {
						added = true;
					}
				}
			}
			this.setState({ added: added });
		}
	}

	loadCourse = () => {
		const url = (window.location.href.indexOf('heroku') !== -1)
			? 'https://memclone-react-django.herokuapp.com/'
			: 'http://localhost:8000/';

		axios.defaults.xsrfCookieName = 'csrftoken';
		axios.defaults.xsrfHeaderName = 'X-CSRFToken';

		axios.get(url + 'courses-api/' + this.courseId)
			.then(res => {
				const course = res.data;

				this.setState({
					title: course.name,
					description: course.description
				});
			})
	}

	openModal = () => {
		this.setState({ modal: true });
	}

	closeModal = () => {
		this.setState({ modal: false });
	}

	updateCourse = (action) => {
		axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
		axios.defaults.xsrfCookieName = "csrftoken";

		axios.defaults.headers = {
			"Content-Type": "application/json",
			Authorization: `Token ${this.props.token}`,
		};

		const url = (window.location.href.indexOf('heroku') !== -1)
			? 'https://memclone-react-django.herokuapp.com/'
			: 'http://127.0.0.1:8000/';

		axios.post(url + 'profiles-api/' + action + '/' + this.courseId + '/')
			.then(res => {
				this.props.updateProfile();
				if (action === 'remove') {
					this.closeModal();
				}
			});
	}

	render() {
		let courseDetails = (
			<div className={styles.SpinnerWrapper}>
				<Spinner />
			</div>
		);

		if (this.state.title && !this.state.loading) {
			courseDetails = (
				<div className={styles.CourseDetails}>
					<div className={styles.Title}>
						{this.state.title}
					</div>
					<div className={styles.Description}>
						{this.state.description}
					</div>
					{this.state.added ?
						<div className={styles.RemoveButton} onClick={this.openModal}>Remove from my courses</div>
						:
						<div className={styles.StartButton} onClick={() => this.updateCourse('add')}>Add to my courses</div>
					}
				</div>
			);
		}

		return (
			<React.Fragment>
				<Header url={this.props.match.url} />
				{this.state.modal ?
					<QuitCourseModal closeModal={this.closeModal} quitCourse={() => this.updateCourse('remove')} />
					: null}
				<div className={styles.PageHead}>
					<div className={styles.PageHeadRow}>
						{courseDetails}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		profile: state.profile,
		token: state.auth.token,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateProfile: () => dispatch(profileActions.profileLoad())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Course);
