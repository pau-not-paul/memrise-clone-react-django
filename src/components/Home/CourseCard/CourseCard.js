import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './CourseCard.module.css';
import img from '../../../assets/images/course_image_small.jpg';
import QuitCourseModal from '../../QuitCourseModal/QuitCourseModal';

class CourseCard extends Component {

	state = {
		modal: false,
	}

	openModal = () => {
		this.setState({ modal: true });
	}

	closeModal = () => {
		this.setState({ modal: false });
	}

	render() {
		const course = this.props.course;
		if (this.props.loading) {
			return (
				<div className={styles.CourseCard + ' ' + styles.LoadingBox} />
			);
		} else {
			let progress = 0;
			if (Number(course.totalWords) !== 0) {
				progress = 100 * Number(course.wordsLearned) / Number(course.totalWords);
			}
			const progressWidth = { width: progress + '%' };
			let nextUpButtonClasses = (progress === 100) ? styles.NextUpButton + ' ' + styles.Disabled : styles.NextUpButton;

			// TODO TEMPORARY
			nextUpButtonClasses = styles.NextUpButton + ' ' + styles.Disabled;
			// TODO TEMPORARY

			return (
				<div className={styles.CourseCard}>
					{this.state.modal ?
						<QuitCourseModal closeModal={this.closeModal} quitCourse={() => this.props.quitCourse(course.id)} />
						: null}
					<div className={styles.CardTop}>
						<div className={styles.ImgWrapper}>
							<img src={img} className={styles.Image} alt='' />
						</div>
						<div className={styles.CardMainContainer}>
							<div className={styles.TitleRow}>
								<Link className={styles.CourseTitle} to={"/course/" + course.id}>{course.name}</Link>
								<div className={styles.MoreOptionsDiv}>
									<div className={styles.MoreOptionsButton} />
									<div className={styles.TooltipWrapper}>
										<ul className={styles.Tooltip}>
											<li>
												<Link className={styles.TooltipLink} to={"/course/" + course.id}>Course details</Link>
											</li>
											<li>
												<div onClick={this.openModal} className={styles.TooltipLink}>Quit course</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className={styles.WordsLearned}>{course.wordsLearned}/{course.totalWords} words learned</div>
							<div className={styles.ProgressBar}>
								<div style={progressWidth} className={styles.Progress} />
							</div>
							{(progress === 100) ? (
								<div className={styles.CourseCompleted}>
									Course completed!
	 							</div>
							) : null}
						</div>
					</div>
					<div className={styles.CardBottom}>
						<div className={styles.MoreButton + ' ' + styles.Disabled}>
							<div className={styles.MoreButtonIcon} />
							<div className={styles.MoreButtonText}>More</div>
						</div>
						<div className={nextUpButtonClasses}>
							<div className={styles.LearnIcon} />
							<div className={styles.NextUpLabel}>
								<div className={styles.NextUpText}>NEXT UP</div>
								<div>Learn new words</div>
							</div>
							<div className={styles.NextUpArrow} />
						</div>
					</div>
				</div>
			);
		}
	}
}

export default CourseCard;