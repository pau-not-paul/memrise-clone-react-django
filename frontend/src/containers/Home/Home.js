import React, { Component } from 'react';
import axios from 'axios';

import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import LeftColumn from '../../components/Home/LeftColumn/LeftColumn';
import CourseCard from '../../components/Home/CourseCard/CourseCard';

class Home extends Component {

	state = {
		loading: true,
		coursesHTML: null,
	}

	componentWillMount () {
		setTimeout(this.loadCourses, 100);

		const coursesHTML = (
			<React.Fragment>
				<CourseCard loading/>
				<CourseCard loading/>
			</React.Fragment>
		);

		this.setState({
			coursesHTML: coursesHTML
		});
	}

	loadCourses = () => {
		const coursesHTML = [];

		for (let level of [1,2,3]) {
			const wordsLearned = 10;
			const totalWords = 10*level;

			const course = {
				id: 'german-'+level,
				name: 'German '+level,
				wordsLearned: wordsLearned, 
				totalWords: totalWords,
			};
			
			coursesHTML.push(
				<CourseCard key={course.id} course={course}/>
			);
		};

		this.setState({
			coursesHTML: coursesHTML
		})
	}

	componentDidMount () {
		console.log('componentDidMount');
		document.title = 'Dashboard - Memrise';
		axios.get('http://127.0.0.1:8000/api/')
			.then(res => {
				console.log('hola');
				console.log(res.data);
			})
	}

	render() {    
		return (
			<React.Fragment>
				<Header url={this.props.match.url}/>
				<div className={styles.PageHead}>
					<div className={styles.PageHeadRow}>
						<div className={styles.Title}>
							German
						</div>
					</div>
				</div>
				<div className={styles.Content}>
					<div className={styles.ContainerMain}>
						<LeftColumn/>
						<div className={styles.RightColumn}>
							{this.state.coursesHTML}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Home;