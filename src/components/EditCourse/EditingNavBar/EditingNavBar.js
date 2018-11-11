import React, { Component } from 'react';
import styles from './EditingNavBar.module.css';

class EditingNavBar extends Component {

	render() {
		return (
			<div className={styles.EditingNavBar}>
				<div className={styles.Row}>
					<div className={styles.Title}>
						Editing
					</div>
					<div onClick={this.props.goBack} className={styles.BackBtn}>
						<span className={styles.LeftArrow} />
						Back to course
					</div>
				</div>
			</div>
		);
	}
}

export default EditingNavBar;