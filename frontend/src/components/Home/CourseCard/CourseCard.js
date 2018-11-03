import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './CourseCard.module.css';

class CourseCard extends Component {

	render() {    
		if (this.props.loading) {
	 		return (
				<div className={styles.CourseCard+' '+styles.LoadingBox}/>
	    	);
	 	} else {
	 		const img = 'https://static.memrise.com/uploads/course_photos/16054981000161215151931.jpg';
	 		const progress = 100*Number(this.props.course.wordsLearned)/Number(this.props.course.totalWords);
	 		const progressWidth = {
	 			width: progress+'%',
	 		};

	 		let courseComplete = null;
	 		let nextUpButtonClasses = styles.NextUpButton;
	 		if (progress === 100) {
	 			courseComplete = (
	 				<div className={styles.CourseCompleted}>
	 					Course completed!
	 				</div>
	 			);
				nextUpButtonClasses = styles.NextUpButton+' '+styles.Disabled;
			 }
			 
			 // TODO TEMPORARY
			 nextUpButtonClasses = styles.NextUpButton+' '+styles.Disabled;
			 // TODO TEMPORARY

	 		return (
	 			<div className={styles.CourseCard}>
					<div className={styles.CardTop}>
						<div className={styles.ImgWrapper}>
							<img src={img} className={styles.Image} alt=''/>
						</div>
						<div className={styles.CardMainContainer}>
							<Link className={styles.CourseTitle} to={"/course/"+this.props.course.id}>{this.props.course.name}</Link>
							<div className={styles.WordsLearned}>{this.props.course.wordsLearned}/{this.props.course.totalWords} words learned</div>
							<div className={styles.ProgressBar}>
								<div style={progressWidth} className={styles.Progress}/>
							</div>
							{courseComplete}
						</div>
					</div>
					<div className={styles.CardBottom}>
						<div className={styles.MoreButton+' '+styles.Disabled}>
							<div className={styles.MoreButtonIcon}/>
							<div className={styles.MoreButtonText}>More</div>
						</div>
						<div className={nextUpButtonClasses}>
							<div className={styles.LearnIcon}/>
							<div className={styles.NextUpLabel}>
								<div className={styles.NextUpText}>NEXT UP</div>
								<div>Learn new words</div>
								</div>
								<div className={styles.NextUpArrow}/>
						</div>
					</div>
				</div>
	 		);
	 	}
  	}
}

export default CourseCard;