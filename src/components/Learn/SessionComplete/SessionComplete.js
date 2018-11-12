import React, { Component } from 'react';
import styles from './SessionComplete.module.css';

class SessionComplete extends Component {
	render() {
		return (
			<React.Fragment>
				<div className={styles.Content}>
					Session complete!
				</div>
				<div onClick={this.props.home} className={styles.NextButton}>
					<div className={styles.BtnText}>Course</div>
					<div className={styles.RightArrow}></div>
				</div>
			</React.Fragment>
		);
	}
}

export default SessionComplete;