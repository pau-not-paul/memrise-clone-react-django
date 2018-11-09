import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styles from './CreateCourse.module.css';
import Header from '../../components/Header/Header';

class CreateCourse extends Component {

	state = {
		name: '',
		description: '',
		nameInputClasses: styles.Input,
		descriptionInputClasses: styles.InputDescription,
	}

	createCourse = () => {
		let correct = true;

		if (this.state.name === '') {
			correct = false;
			this.setState({
				nameInputClasses: styles.Input + ' ' + styles.Error,
			});
		}
		if (this.state.description === '') {
			correct = false;
			this.setState({
				descriptionInputClasses: styles.InputDescription + ' ' + styles.Error,
			});
		}

		if (correct) {
			const url = (window.location.href.indexOf('heroku') !== -1)
				? 'https://memclone-react-django.herokuapp.com/'
				: 'http://localhost:8000/';

			axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
			axios.defaults.xsrfCookieName = "csrftoken";

			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: `Token ${this.props.token}`,
			};

			axios.post(url + 'courses-api/create/', {
				name: this.state.name,
				description: this.state.description,
			})
				.then(res => {
					this.goToCourses(res.data.id);
				});
			// .catch(err => console.error(err));
		}
	}

	goToCourses = (id) => {
		this.props.history.push('/courses/' + id);
	}

	nameChange = (event) => {
		if (this.state.nameInputClasses === styles.Input + ' ' + styles.Error) {
			this.setState({
				name: event.target.value,
				nameInputClasses: styles.Input,
			});
		} else {
			this.setState({ name: event.target.value });
		}
	}

	descriptionChange = (event) => {
		if (this.state.descriptionInputClasses === styles.InputDescription + ' ' + styles.Error) {
			this.setState({
				description: event.target.value,
				descriptionInputClasses: styles.InputDescription,
			});
		} else {
			this.setState({ description: event.target.value });
		}
	}

	render() {
		return (
			<React.Fragment>
				<Header url={this.props.match.url} />
				<div className={styles.PageHead}>
					<div className={styles.PageHeadRow}>
						<div className={styles.Title}>
							Create a course
						</div>
					</div>
				</div>
				<div className={styles.WhiteBox}>
					<div className={styles.Label}>Name:</div>
					<input onChange={this.nameChange} maxLength='100' className={this.state.nameInputClasses} />
					<div className={styles.Label}>Description:</div>
					<textarea onChange={this.descriptionChange} rows='2' className={this.state.descriptionInputClasses} onKeyDown={this.onKeyDown} />
					<div onClick={this.createCourse} className={styles.LoginButton}>Create course</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
	}
}

export default connect(mapStateToProps)(CreateCourse);
