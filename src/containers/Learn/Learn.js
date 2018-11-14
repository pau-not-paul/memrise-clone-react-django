import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styles from './Learn.module.css';
import Spinner from '../../components/Spinner/Spinner';
import Header from '../../components/Learn/Header/Header';
import NewWordFragment from '../../components/Learn/NewWordFragment/NewWordFragment';
import WriteWordFragment from '../../components/Learn/WriteWordFragment/WriteWordFragment';
import SessionComplete from '../../components/Learn/SessionComplete/SessionComplete';
import * as profileActions from '../../store/actions/profile';

const GOAL_SCORE = 2;

class Learn extends Component {
	state = {
		courseId: this.props.match.params.courseId,
		course: null,
		loading: true,
		index: 0,
		turns: 10,
		result: 'learning',
		progress: null,
		sessionWords: null,
		wordsLearned: [],
		currentWord: null,
	};

	componentDidMount() {
		this.loadCourse();
		this.props.updateProfile();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.profile.loading && !nextProps.profile.loading) {
			this.loadProgress(nextProps);
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextState.loading && nextState.progress && nextState.course) {
			this.createLearningSession(nextState);
		}
		return true;
	}

	createLearningSession = (state = this.state) => {
		const course = state.course;
		const sessionWords = [];
		const wordsLearned = [];

		for (let pair of course.words) {
			let score = state.progress.wordsInProgress[pair.word] || 0;
			if (score !== GOAL_SCORE) {
				pair.score = score;
				sessionWords.push(pair);
			} else {
				wordsLearned.push(pair.word);
			}
		}

		if (sessionWords.length === 0) {
			this.props.history.goBack();
		} else {
			const currentWord = sessionWords[0];

			this.setState({
				loading: false,
				wordsLearned: wordsLearned,
				sessionWords: sessionWords,
				currentWord: currentWord,
			});
		}
	};

	loadProgress = (props = this.props) => {
		if (!props.profile.loading) {
			let progress = props.profile.progress[this.state.courseId];

			if (!progress) {
				progress = { wordsLearned: 0, wordsInProgress: {} };
			} else {
				progress = JSON.parse(JSON.stringify(progress));
			}
			this.setState({ progress: progress });
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
			course.words = JSON.parse(course.words);
			if (course.words.length === 0) {
				this.props.history.goBack();
			}
			this.setState({
				course: course,
			});
		});
	};

	nextClick = () => {
		const turns = this.state.turns - 1;
		if (turns === 0) {
			this.setState({ turns: 0 });
		} else {
			const sessionWords = JSON.parse(JSON.stringify(this.state.sessionWords));
			sessionWords[this.state.index].score++;
			let idx = 0;
			if (sessionWords.length > 1) {
				do {
					idx = Math.floor(Math.random() * sessionWords.length);
				} while (idx === this.state.index);
			}
			this.setState({
				turns: turns,
				index: idx,
				sessionWords: sessionWords,
				currentWord: sessionWords[idx],
			});
		}
	};

	goToCourse = () => {
		this.props.history.push('/course/' + this.state.courseId);
	};

	userWrote = word => {
		let sessionWords = JSON.parse(JSON.stringify(this.state.sessionWords));
		const wordsLearned = [...this.state.wordsLearned];
		const currentWord = {
			word: this.state.currentWord.word,
			description: this.state.currentWord.description,
			score: this.state.currentWord.score,
		};

		if (currentWord.word === word.trim()) {
			currentWord.score++;
			if (currentWord.score === GOAL_SCORE) {
				wordsLearned.push(currentWord.word);
				sessionWords.splice(this.state.index, 1);
			}
			this.postProgress(sessionWords, wordsLearned);
			this.setState({
				result: 'correct',
				sessionWords: sessionWords,
				wordsLearned: wordsLearned,
				currentWord: currentWord,
			});
		} else {
			sessionWords[this.state.index].score = 0;
			currentWord.score = 0;
			this.setState({
				result: 'wrong',
				sessionWords: sessionWords,
				currentWord: currentWord,
			});
		}
		setTimeout(this.setResultToLearning, 1000);
	};

	postProgress = (words, wordsLearned) => {
		let progress = { wordsLearned: 0, wordsInProgress: {} };
		for (let pair of words) {
			progress.wordsInProgress[pair.word] = pair.score;
		}
		for (let word of wordsLearned) {
			progress.wordsInProgress[word] = GOAL_SCORE;
			progress.wordsLearned++;
		}
		const profileProgress = JSON.parse(JSON.stringify(this.props.profile.progress));
		profileProgress[this.state.courseId] = progress;

		const url =
			window.location.href.indexOf('heroku') !== -1
				? 'https://memclone-react-django.herokuapp.com/'
				: 'http://localhost:8000/';

		axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
		axios.defaults.xsrfCookieName = 'csrftoken';

		axios.defaults.headers = {
			'Content-Type': 'application/json',
			Authorization: 'Token ' + this.props.token,
		};

		const progress_json = JSON.stringify(profileProgress);

		axios.put(url + 'profiles-api/update-progress/', progress_json);
	};

	setResultToLearning = () => {
		if (this.state.result === 'wrong') {
			this.setState({ result: 'learning' });
		} else {
			const turns = this.state.turns - 1;
			const sessionWords = this.state.sessionWords;
			if (turns === 0 || sessionWords.length === 0) {
				this.setState({ turns: 0 });
			} else {
				let idx = 0;
				if (sessionWords.length > 1) {
					do {
						idx = Math.floor(Math.random() * sessionWords.length);
					} while (idx === this.state.index);
				}
				const currentWord = sessionWords[idx];
				this.setState({
					result: 'learning',
					index: idx,
					turns: turns,
					currentWord: currentWord,
				});
			}
		}
	};

	render() {
		if (this.state.course && !this.state.loading) {
			const pair = this.state.currentWord;

			let content = <NewWordFragment next={this.nextClick} pair={pair} />;
			if (pair.score > 0 || this.state.result === 'wrong') {
				content = (
					<WriteWordFragment result={this.state.result} userWrote={this.userWrote} pair={pair} />
				);
			}
			if (this.state.turns === 0) {
				content = <SessionComplete home={this.goToCourse} />;
			}
			return (
				<React.Fragment>
					<Header close={this.props.history.goBack} course={this.state.course} />
					{content}
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<div className={styles.SpinnerWrapper}>
						<Spinner />
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
)(Learn);
