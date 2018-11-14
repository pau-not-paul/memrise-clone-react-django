import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styles from './CreateCourse.module.css';
import Header from '../../components/Header/Header';

class CreateCourse extends Component {
	state = {
		name: '',
		teaching: 'Please',
		descriptionLanguage: 'English',
		description: '',
		nameInputClasses: styles.Input,
		descriptionInputClasses: styles.InputDescription,
		teachingClasses: styles.Select,
	};

	createCourse = () => {
		let correct = true;

		if (this.state.name === '') {
			correct = false;
			this.setState({
				nameInputClasses: styles.Input + ' ' + styles.Error,
			});
		}
		if (this.state.teaching === 'Please') {
			correct = false;
			this.setState({
				teachingClasses: styles.Select + ' ' + styles.Error,
			});
		}
		if (this.state.description === '') {
			correct = false;
			this.setState({
				descriptionInputClasses: styles.InputDescription + ' ' + styles.Error,
			});
		}

		if (correct) {
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

			axios
				.post(url + 'courses-api/create/', {
					name: this.state.name.trim(),
					description: this.state.description.trim(),
					teaching: this.state.teaching,
					description_language: this.state.descriptionLanguage,
					owner: this.props.username,
					words: '[]',
				})
				.then(res => {
					this.props.history.push('/course/' + res.data.id + '/edit');
				});
		}
	};

	nameChange = event => {
		if (this.state.nameInputClasses === styles.Input + ' ' + styles.Error) {
			this.setState({
				name: event.target.value,
				nameInputClasses: styles.Input,
			});
		} else {
			this.setState({ name: event.target.value });
		}
	};

	descriptionChange = event => {
		if (this.state.descriptionInputClasses === styles.InputDescription + ' ' + styles.Error) {
			this.setState({
				description: event.target.value,
				descriptionInputClasses: styles.InputDescription,
			});
		} else {
			this.setState({ description: event.target.value });
		}
	};

	teachingChange = event => {
		this.setState({
			teaching: event.target.value,
			teachingClasses: styles.Select,
		});
	};

	forChange = event => {
		this.setState({ descriptionLanguage: event.target.value });
	};

	render() {
		const languages = [
			'Afrikanns',
			'Albanian',
			'Arabic',
			'Armenian',
			'Basque',
			'Bengali',
			'Bulgarian',
			'Catalan',
			'Cambodian',
			'Chinese (Mandarin)',
			'Croation',
			'Czech',
			'Danish',
			'Dutch',
			'English',
			'Estonian',
			'Fiji',
			'Finnish',
			'French',
			'Georgian',
			'German',
			'Greek',
			'Gujarati',
			'Hebrew',
			'Hindi',
			'Hungarian',
			'Icelandic',
			'Indonesian>',
			'Irish',
			'Italian',
			'Japanese',
			'Javanese',
			'Korean',
			'Latin',
			'Latvian',
			'Lithuanian',
			'Macedonian',
			'Malay',
			'Malayalam',
			'Maltese',
			'Maori',
			'Marathi',
			'Mongolian',
			'Nepali',
			'Norwegian',
			'Persian',
			'Polish',
			'Portuguese',
			'Punjabi',
			'Quechua',
			'Romanian',
			'Russian',
			'Samoan',
			'Serbian',
			'Slovak',
			'Slovenian',
			'Spanish',
			'Swahili',
			'Swedish ',
			'Tamil',
			'Tatar',
			'Telugu',
			'Thai',
			'Tibetan',
			'Tonga',
			'Turkish',
			'Ukranian',
			'Urdu',
			'Uzbek',
			'Vietnamese',
			'Welsh',
			'Xhosa',
		];

		return (
			<React.Fragment>
				<Header url={this.props.match.url} />
				<div className={styles.PageHead}>
					<div className={styles.PageHeadRow}>
						<div className={styles.Title}>Create a course</div>
					</div>
				</div>
				<div className={styles.WhiteBox}>
					<div className={styles.Label}>Name:</div>
					<input
						onChange={this.nameChange}
						maxLength="100"
						className={this.state.nameInputClasses}
					/>
					<div className={styles.Label}>Teaching:</div>
					<select
						onChange={this.teachingChange}
						defaultValue="Please"
						className={this.state.teachingClasses}
					>
						<option value={'Please'}>Please select one...</option>
						{languages.map(l => (
							<option key={l} value={l}>
								{l}
							</option>
						))}
					</select>
					<div className={styles.Label}>For:</div>
					<select onChange={this.forChange} defaultValue="English" className={styles.Select}>
						{languages.map(l => (
							<option key={l} value={l}>
								{l} speakers
							</option>
						))}
					</select>
					<div className={styles.Label}>Description:</div>
					<textarea
						onChange={this.descriptionChange}
						rows="2"
						className={this.state.descriptionInputClasses}
						onKeyDown={this.onKeyDown}
					/>
					<div onClick={this.createCourse} className={styles.LoginButton}>
						Create course
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		token: state.auth.token,
		username: state.profile.username,
	};
};

export default connect(mapStateToProps)(CreateCourse);
