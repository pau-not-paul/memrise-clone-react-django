import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styles from './Learn.module.css';
import Spinner from '../../components/Spinner/Spinner';
import Header from '../../components/Learn/Header/Header';
import NewWordFragment from '../../components/Learn/NewWordFragment/NewWordFragment';
import SessionComplete from '../../components/Learn/SessionComplete/SessionComplete';
import * as profileActions from '../../store/actions/profile';

class Learn extends Component {

	state = {
		courseId: this.props.match.params.courseId,
		course: null,
		index: 0,
		finished: false,
	}

	componentDidMount() {
		this.loadCourse();
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
				course.words = JSON.parse(course.words);

				if (course.words.length === 0) {
					this.props.history.goBack();
				}

				this.setState({
					course: course,
				});
			})
	}

	nextClick = () => {
		const idx = this.state.index + 1;
		if (idx < this.state.course.words.length) {
			this.setState({ index: idx })
		} else if (this.state.finished) {
			console.log('puush');
			this.props.history.push('/');
		} else {
			this.setState({ finished: true });
		}
	}

	render() {
		if (this.state.course) {
			const pair = this.state.course.words[this.state.index];
			let content = <NewWordFragment next={this.nextClick} pair={pair} />;

			if (this.state.finished) {
				content = (<SessionComplete home={this.nextClick} />);
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

export default connect(mapStateToProps, mapDispatchToProps)(Learn);
