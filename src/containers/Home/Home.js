import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import Welcome from '../../components/Home/Welcome/Welcome';
import LeftColumn from '../../components/Home/LeftColumn/LeftColumn';
import CourseCard from '../../components/Home/CourseCard/CourseCard';

export class Home extends Component {

	state = {
		coursesHTML: (
			<React.Fragment>
				<CourseCard loading />
				<CourseCard loading />
			</React.Fragment>
		),
	}

	componentDidMount() {
		document.title = 'Dashboard - Memrise';
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

		let coursesHTML = [];

		axios.get(url + 'profiles-api/u/')
			.then(res => {
				if (res.data) {
					const courses = JSON.parse(res.data)
					for (let c of courses) {
						const course = {
							id: c.pk,
							name: c.fields.name,
							wordsLearned: 0,
							totalWords: 0,
						};
						coursesHTML.push(
							<CourseCard key={course.id} course={course} />
						);
					}
					if (coursesHTML.length === 0) {
						coursesHTML = (
							<Welcome />
						);
					}
					this.setState({
						coursesHTML: coursesHTML
					})
				}
			});
	}

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
						<LeftColumn />
						<div className={styles.RightColumn}>
							{this.state.coursesHTML}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		username: state.username,
		token: state.token,
	}
}

export default connect(mapStateToProps)(Home);