import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Welcome.module.css';

class Welcome extends Component {
	render() {    
 		return (
			<div className={styles.WelcomeCard}>
				<div className={styles.TextWrapper}>
					<div className={styles.Title}> Welcome to Memrise! </div>
					Pick a course and start learning.
				</div>
				<div className={styles.BtnWrapper}>
					<Link to='/courses' className={styles.CoursesBtn}>Pick a course</Link>
				</div>
       		</div>
    	);
  	}
}

export default Welcome;