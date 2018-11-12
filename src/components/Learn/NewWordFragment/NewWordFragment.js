import React, { Component } from 'react';
import styles from './NewWordFragment.module.css';

class NewWordFragment extends Component {
	render() {
		return (
			<div className={styles.Content}>
				<div className={styles.Main}>
					<div className={styles.Word}>{this.props.pair.word}</div>
					<div className={styles.Description}>{this.props.pair.description}</div>
				</div>
				<div className={styles.RightColumn}>
					<div onClick={this.props.next} className={styles.NextButton}>
						<div className={styles.RightArrow}></div>
						<div>Next</div>
					</div>
				</div>
			</div>
		);
	}
}

export default NewWordFragment;