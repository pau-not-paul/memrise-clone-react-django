import React, { Component } from 'react';
import styles from './AddWordsRow.module.css';

class AddWordsRow extends Component {

	state = {
		word: '',
		description: '',
	}

	confirm = () => {
		if (this.state.word !== '' & this.state.description !== '') {
			this.props.addNewWord(this.state.word, this.state.description);
			this.setState({ word: '', description: '' });
			this.focusFirstInput();
		}
	}

	wordChange = (event, learning) => {
		if (learning) {
			this.setState({ word: event.target.value });
		} else {
			this.setState({ description: event.target.value });
		}
	}

	onKeyDown = (event) => {
		if (event.key === 'Enter') {
			this.confirm();
		}
	}

	focusFirstInput = () => {
		this.firstInput.focus();
	}

	render() {
		let confirmIconClasses = styles.ConfirmIcon + ' ' + styles.Invisible;
		if (this.state.word !== '' & this.state.description !== '') {
			confirmIconClasses = styles.ConfirmIcon;
		}
		return (
			<React.Fragment>
				<div className={styles.RowWrapper}>
					<div className={styles.Row}>
						<div className={styles.AddWords}>Add words:</div>
					</div>
				</div>
				<div className={styles.RowWrapper}>
					<div className={styles.Row}>
						<div className={styles.Column}>
							<input ref={(input) => { this.firstInput = input; }} value={this.state.word} onChange={(event) => this.wordChange(event, true)} className={styles.Input} />
						</div>
						<div className={styles.Column}>
							<input value={this.state.description} onKeyDown={this.onKeyDown} onChange={(event) => this.wordChange(event, false)} className={styles.Input} />
						</div>
						<div className={confirmIconClasses} onClick={this.confirm} />
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default AddWordsRow;