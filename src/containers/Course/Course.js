import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styles from './Course.module.css';
import Header from '../../components/Header/Header';
import Spinner from '../../components/Spinner/Spinner';

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
	}

	componentDidMount() {
		this.loadCourse();
		this.fetchCourses();
	}

	fetchCourses = () => {
		const url = (window.location.href.indexOf('heroku') !== -1)
			? 'https://memclone-react-django.herokuapp.com/'
			: 'http://localhost:8000/';

		axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
		axios.defaults.xsrfCookieName = "csrftoken";

		axios.defaults.headers = {
			"Content-Type": "application/json",
			Authorization: `Token ${this.props.token}`,
		};

		axios.get(url + 'profiles-api/u/')
			.then(res => {
				this.setState({ loading: false });
				if (res.data) {
					const courses = JSON.parse(res.data)
					for (let c of courses) {
						if (String(c.pk) === this.courseId) {
							this.setState({ added: true });
						}
					}
				}
			})
			.catch(err => {
				this.setState({ loading: false });
			});
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

	updateCourse = (add) => {
		axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
		axios.defaults.xsrfCookieName = "csrftoken";

		axios.defaults.headers = {
			"Content-Type": "application/json",
			Authorization: `Token ${this.props.token}`,
		};

		const url = (window.location.href.indexOf('heroku') !== -1)
			? 'https://memclone-react-django.herokuapp.com/'
			: 'http://127.0.0.1:8000/';

		const l = add ? 'add' : 'remove';

		axios.post(url + 'profiles-api/' + l + '/' + this.courseId + '/')
			.then(res => {
				this.setState({ added: add });
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
						<div className={styles.RemoveButton} onClick={() => this.updateCourse(false)}>Remove from my courses</div>
						:
						<div className={styles.StartButton} onClick={() => this.updateCourse(true)}>Add to my courses</div>
					}
				</div>
			);
		}

		return (
			<React.Fragment>
				<Header url={this.props.match.url} />
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
		token: state.token,
	}
}

export default connect(mapStateToProps)(Course);
