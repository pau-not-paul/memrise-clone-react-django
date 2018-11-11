import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styles from './EditCourse.module.css';
import Header from '../../components/Header/Header';
import Spinner from '../../components/Spinner/Spinner';
import EditingNavBar from '../../components/EditCourse/EditingNavBar/EditingNavBar';
import AddWordsRow from '../../components/EditCourse/AddWordsRow/AddWordsRow';
import WordsBlock from '../../components/Course/WordsBlock/WordsBlock';
import CourseHead from '../../components/Course/CourseHead/CourseHead';

class EditCourse extends Component {

	state = {
		courseId: this.props.match.params.courseId,
		course: null,
	}

	componentDidMount() {
		this.loadCourse();
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.course && this.props.profile.username !== nextProps.profile.username) {
			this.checkIfOwner(nextProps, this.state.course);
		}
	}

	checkIfOwner = (props, course) => {
		if (props.profile.username && course.owner !== props.profile.username) {
			this.props.history.goBack();
		}
	}

	loadCourse = () => {
		const url = (window.location.href.indexOf('heroku') !== -1)
			? 'https://memclone-react-django.herokuapp.com/'
			: 'http://localhost:8000/';

		axios.defaults.xsrfCookieName = 'csrftoken';
		axios.defaults.xsrfHeaderName = 'X-CSRFToken';

		axios.get(url + 'courses-api/' + this.state.courseId + '/')
			.then(res => {
				const course = res.data;

				const words = JSON.parse(course.words);

				course.words = words;

				this.checkIfOwner(this.props, course);

				this.setState({
					course: course,
				});
			})
	}

	addNewWord = (word, description) => {
		const words = this.state.course.words;

		words.push({
			word: word,
			description: description
		});

		this.setState({ words: words });

		this.pushWordsUpdate(words);
	}

	removeWord = (word, description) => {
		const words = this.state.course.words;

		for (let w of words) {
			if (w.word === word && w.description === description) {
				words.pop(w);
			}
		}

		this.setState({ words: words });
		this.pushWordsUpdate(words);
	}

	pushWordsUpdate = (words) => {
		const url = (window.location.href.indexOf('heroku') !== -1)
			? 'https://memclone-react-django.herokuapp.com/'
			: 'http://localhost:8000/';

		axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
		axios.defaults.xsrfCookieName = "csrftoken";

		axios.defaults.headers = {
			"Content-Type": "application/json",
			Authorization: `Token ${this.props.token}`,
		};

		axios.put(url + 'courses-api/' + this.state.courseId + '/updateWords/', {
			words: JSON.stringify(words),
		});
	}

	render() {
		if (this.state.course) {
			return (
				<React.Fragment>
					<Header url={this.props.match.url} />
					<CourseHead course={this.state.course} />
					<EditingNavBar goBack={() => this.props.history.goBack()} />
					<WordsBlock removeWord={this.removeWord} course={this.state.course}>
						<AddWordsRow addNewWord={this.addNewWord} />
					</WordsBlock>
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<Header url={this.props.match.url} />
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

const mapStateToProps = (state) => {
	return {
		profile: state.profile,
		token: state.auth.token,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		// updateProfile: () => dispatch(profileActions.profileLoad())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCourse);
