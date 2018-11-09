import React, { Component } from 'react';
import { connect } from 'react-redux';

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
		this.loadCourses();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.profile.courses !== nextProps.profile.courses) {
			this.loadCourses(nextProps);
		}
	}

	loadCourses = (props = this.props) => {
		if (!props.profile.loading) {
			let coursesHTML = [];
			if (props.profile.courses.length === 0) {
				coursesHTML = (
					<Welcome />
				);
			} else {
				for (let course of props.profile.courses) {
					coursesHTML.push(
						<CourseCard key={course.id} course={course} />
					);
				}
			}
			this.setState({
				coursesHTML: coursesHTML
			})
		}
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
						<LeftColumn profile={this.props.profile} />
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
		profile: state.profile,
	}
}

export default connect(mapStateToProps)(Home);