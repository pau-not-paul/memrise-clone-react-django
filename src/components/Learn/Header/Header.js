import React, { Component } from 'react';
import styles from './Header.module.css';

class Header extends Component {
	render() {
		return (
			<div className={styles.Header}>
				<div className={styles.HeaderRow}>
					<div className={styles.LeftColumn}>
						<div className={styles.LearningIcon} />
					</div>
					<div className={styles.CenterColumn}>{this.props.course.name}. Learn new words</div>
					<div className={styles.RightColumn}>
						<div onClick={this.props.close} className={styles.CloseButton} />
					</div>
				</div>
			</div>
		);
	}
}

export default Header;
