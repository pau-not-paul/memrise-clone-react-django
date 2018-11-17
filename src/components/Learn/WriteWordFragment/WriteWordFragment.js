import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './WriteWordFragment.module.css';

class WriteWordFragment extends Component {
	state = {
		inputValue: '',
	};

	componentDidMount() {
		this.input.focus();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.result === 'learning' && this.props.result !== prevProps.result) {
			this.clearInput();
		}
	}

	inputChange = event => {
		this.setState({
			inputValue: event.target.value,
		});
	};

	onKeyDown = e => {
		if (e.key === 'Enter' && this.props.result === 'learning') {
			this.next();
		}
	};

	next = () => {
		if (this.props.result === 'learning') {
			this.props.userWrote(this.state.inputValue);
		}
	};

	clearInput = () => {
		this.input.focus();
		this.setState({ inputValue: '' });
	};

	render() {
		let inputClasses = styles.Input;

		if (this.props.result === 'correct') {
			inputClasses += ' ' + styles.InputCorrect;
		} else if (this.props.result === 'wrong') {
			inputClasses += ' ' + styles.InputWrong;
		}

		return (
			<div className={styles.Content}>
				<div className={styles.Main}>
					<div className={styles.Word}>{this.props.pair.description}</div>
					{/* {input} */}
					<input
						ref={input => {
							this.input = input;
						}}
						readOnly={this.props.result !== 'learning'}
						value={this.state.inputValue}
						onChange={this.inputChange}
						onKeyDown={this.onKeyDown}
						className={inputClasses}
					/>
				</div>
				<div className={styles.RightColumn}>
					<div onClick={this.next} className={styles.NextButton}>
						<div className={styles.RightArrow} />
						<div>Next</div>
					</div>
				</div>
			</div>
		);
	}
}

export default React.memo(WriteWordFragment);

WriteWordFragment.propTypes = {
	result: PropTypes.string.isRequired,
	pair: PropTypes.shape({
		word: PropTypes.string,
		description: PropTypes.string,
	}).isRequired,
	userWrote: PropTypes.func.isRequired,
};
