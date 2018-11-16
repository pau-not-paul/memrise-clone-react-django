import React from 'react';
import styles from './QuitCourseModal.module.css';

const QuitCourseModal = props => {
	return (
		<div className={styles.Full}>
			<div className={styles.ModalDialog}>
				<div className={styles.Modal}>
					<div className={styles.ModalHeader}>Quit this course</div>
					<div className={styles.ModalBody}>
						Quitting will not wipe your learning history, but will remove it entirely from your
						dashboard. You can re-join the course to restore your progress at any point, but you
						will need to find it again in "Courses". Are you sure you would like to quit?
					</div>
					<div className={styles.ModalFooter}>
						<div onClick={props.closeModal} className={styles.Button}>
							No
						</div>
						<div onClick={props.quitCourse} className={styles.Button + ' ' + styles.YesButton}>
							Yes
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuitCourseModal;
