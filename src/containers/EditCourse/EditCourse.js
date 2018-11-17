import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from '../../components/Header/Header';
import EditingNavBar from '../../components/EditCourse/EditingNavBar/EditingNavBar';
import AddWordsRow from '../../components/EditCourse/AddWordsRow/AddWordsRow';
import WordsTable from '../../components/Course/WordsTable/WordsTable';
import CourseHead from '../../components/Course/CourseHead/CourseHead';

class EditCourse extends Component {
	state = {
		courseId: this.props.match.params.courseId,
		course: null,
	};

	componentDidMount() {
		this.loadCourse();
	}

	componentDidUpdate(prevProps, prevState) {
		if (!this.checkIfOwnerDone && this.state.course && this.props.profile.username) {
			this.checkIfOwnerDone = true;
			this.checkIfOwner(this.props, this.state.course);
		}
	}

	checkIfOwner = (props, course) => {
		if (props.profile.username && course.owner !== props.profile.username) {
			this.props.history.goBack();
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
			course.words = words;
			this.checkIfOwner(this.props, course);
			this.setState({
				course: course,
			});
		});
	};

	addNewWord = (word, description) => {
		const words = this.state.course.words;
		words.push({
			word: word,
			description: description,
		});
		this.setState({ words: words });
		this.pushWordsUpdate(words);
	};

	removeWord = pair => {
		const words = this.state.course.words;
		const index = words.indexOf(pair);
		if (index !== -1) {
			words.splice(index, 1);
		}
		this.setState({ words: words });
		this.pushWordsUpdate(words);
	};

	pushWordsUpdate = words => {
		const url =
			window.location.href.indexOf('heroku') !== -1
				? 'https://memclone-react-django.herokuapp.com/'
				: 'http://localhost:8000/';

		axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
		axios.defaults.xsrfCookieName = 'csrftoken';

		axios.defaults.headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${this.props.token}`,
		};

		axios.put(url + 'courses-api/' + this.state.courseId + '/updateWords/', {
			words: JSON.stringify(words),
		});
	};

	render() {
		const course = this.state.course;
		return (
			<React.Fragment>
				<Header url={this.props.match.url} />
				<CourseHead {...course} />
				<EditingNavBar goBack={() => this.props.history.push('/course/' + this.state.courseId)} />
				{course && (
					<WordsTable removeWord={this.removeWord} {...this.state.course}>
						<AddWordsRow addNewWord={this.addNewWord} />
					</WordsTable>
				)}
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

export default connect(mapStateToProps)(EditCourse);
