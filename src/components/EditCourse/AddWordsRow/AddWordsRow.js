import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './AddWordsRow.module.css';

class AddWordsRow extends Component {
	state = {
		word: '',
		description: '',
	};

	confirm = () => {
		if ((this.state.word !== '') & (this.state.description !== '')) {
			this.props.addNewWord(this.state.word.trim(), this.state.description.trim());
			this.setState({ word: '', description: '' });
			this.firstInput.focus();
			window.scrollTo(0, document.body.scrollHeight);
		}
	};

	inputChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	onKeyDown = event => {
		if (event.key === 'Enter') {
			if (event.target.name === 'word') {
				if (this.state.word !== '') {
					this.descriptionInput.focus();
				}
			} else {
				this.confirm();
			}
		}
	};

	render() {
		let confirmIconClasses = styles.ConfirmIcon + ' ' + styles.Invisible;
		if ((this.state.word !== '') & (this.state.description !== '')) {
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
							<input
								ref={input => {
									this.firstInput = input;
								}}
								name="word"
								value={this.state.word}
								onKeyDown={e => this.onKeyDown(e, true)}
								onChange={this.inputChange}
								className={styles.Input}
							/>
						</div>
						<div className={styles.Column}>
							<input
								ref={input => {
									this.descriptionInput = input;
								}}
								name="description"
								value={this.state.description}
								onKeyDown={e => this.onKeyDown(e, false)}
								onChange={this.inputChange}
								className={styles.Input}
							/>
						</div>
						<div className={confirmIconClasses} onClick={this.confirm} />
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default React.memo(AddWordsRow);

AddWordsRow.propTypes = {
	addNewWord: PropTypes.func.isRequired,
};
