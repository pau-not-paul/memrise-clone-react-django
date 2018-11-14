import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styles from './Course.module.css';
import Header from '../../components/Header/Header';
import Spinner from '../../components/Spinner/Spinner';
import QuitCourseModal from '../../components/QuitCourseModal/QuitCourseModal';
import WordsBlock from '../../components/Course/WordsBlock/WordsBlock';
import CourseHead from '../../components/Course/CourseHead/CourseHead';
import * as profileActions from '../../store/actions/profile';

class Course extends Component {
	state = {
		courseId: this.props.match.params.courseId,
		course: null,
		added: false,
		loading: true,
		modal: false,
		wordsLearned: 0,
	};

	componentDidMount() {
		this.props.updateProfile();
		this.loadCourse();
		this.checkIfAdded();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.profile.courses !== nextProps.profile.courses) {
			this.checkIfAdded(nextProps);
		}
		if (this.state.course && this.props.profile.username !== nextProps.profile.username) {
			this.checkIfOwner(nextProps, this.state.course);
		}
	}

	checkIfOwner = (props, course) => {
		if (course.owner === props.profile.username) {
			this.setState({ owner: true });
		}
	};

	checkIfAdded = (props = this.props) => {
		if (!props.profile.loading) {
			this.setState({ loading: false });
			const courses = props.profile.courses;
			let added = false;
			let wordsLearned = 0;

			if (courses && courses.length !== 0) {
				for (let c of courses) {
					if (String(c.id) === this.state.courseId) {
						added = true;
						wordsLearned = c.wordsLearned;
					}
				}
			}
			this.setState({
				added: added,
				wordsLearned: wordsLearned,
			});
		}
	};

	loadCourse = () => {
		const url =
			window.location.href.indexOf('heroku') !== -1
				? 'https://memclone-react-django.herokuapp.com/'
				: 'http://localhost:8000/';

		axios.defaults.xsrfCookieName = 'csrftoken';
		axios.defaults.xsrfHeaderName = 'X-CSRFToken';

		axios.get(url + 'courses-api/' + this.state.courseId + '/').then(res => {
			const course = res.data;
			const words = JSON.parse(course.words);
			if (words.length === 0) {
				course.words = [{ word: 'This course is empty', description: '' }];
			} else {
				course.words = words;
			}
			course.wordsLearned = 0;
			course.totalWords = words.length;
			this.checkIfOwner(this.props, course);
			this.setState({
				course: course,
			});
		});
	};

	openModal = () => {
		this.setState({ modal: true });
	};

	closeModal = () => {
		this.setState({ modal: false });
	};

	updateCourse = action => {
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

		axios.post(url + 'profiles-api/' + action + '/' + this.state.courseId + '/').then(res => {
			this.props.updateProfile();
			if (action === 'remove') {
				this.closeModal();
			}
		});
	};

	learn = () => {
		const course = this.state.course;
		if (Number(course.totalWords) !== 0 && this.state.wordsLearned !== Number(course.totalWords)) {
			this.props.history.push('/learn/' + this.state.courseId);
		}
	};

	render() {
		const course = this.state.course;
		if (course && !this.state.loading) {
			let learnBtnClasses;
			let progressWidth;
			let progress = 0;

			if (this.state.added) {
				learnBtnClasses = styles.LearnBtn + ' ' + styles.Disabled;

				if (Number(course.totalWords) !== 0) {
					progress = (100 * Number(this.state.wordsLearned)) / Number(course.totalWords);
					learnBtnClasses =
						progress === 100 ? styles.LearnBtn + ' ' + styles.Disabled : styles.LearnBtn;
				}
				progressWidth = { width: progress + '%' };
			}

			return (
				<React.Fragment>
					<Header url={this.props.match.url} />
					{this.state.modal ? (
						<QuitCourseModal
							closeModal={this.closeModal}
							quitCourse={() => this.updateCourse('remove')}
						/>
					) : null}
					<CourseHead course={course} />
					<div className={styles.SecondHeader}>
						<div className={styles.Row}>
							{this.state.added ? (
								<div className={styles.RemoveButton} onClick={this.openModal}>
									Leave course
								</div>
							) : (
								<div className={styles.StartButton} onClick={() => this.updateCourse('add')}>
									Add to my courses
								</div>
							)}
							{this.state.owner ? (
								<div
									onClick={() => this.props.history.push(this.state.courseId + '/edit')}
									className={styles.EditBtn}
								>
									Edit course
								</div>
							) : null}
						</div>
					</div>
					{this.state.added ? (
						<div className={styles.ProgressDiv}>
							<div className={styles.WordsLearned}>
								{this.state.wordsLearned} / {course.totalWords} words learned
							</div>
							<div className={styles.ProgressBar}>
								<div style={progressWidth} className={styles.Progress} />
							</div>
							{progress === 100 ? (
								<div className={styles.CourseCompleted}>Course completed!</div>
							) : null}
							<div onClick={this.learn} className={learnBtnClasses}>
								Learn
							</div>
						</div>
					) : null}
					<WordsBlock course={this.state.course} />
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<Header url={this.props.match.url} />
					{this.state.modal ? (
						<QuitCourseModal
							closeModal={this.closeModal}
							quitCourse={() => this.updateCourse('remove')}
						/>
					) : null}
					<div className={styles.PageHead}>
						<div className={styles.PageHeadRow}>
							<div className={styles.SpinnerWrapper}>
								<Spinner />
							</div>
						</div>
					</div>
				</React.Fragment>
			);
		}
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
)(Course);
