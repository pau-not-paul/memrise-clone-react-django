import React, { Component } from 'react';
import styles from './WriteWordFragment.module.css';

class WriteWordFragment extends Component {

	state = {
		inputValue: '',
	}

	componentDidMount() {
		this.input.focus();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.result === 'learning' &&
			nextProps.result !== this.props.result) {
			this.clearInput();
		}
	}

	inputChange = (event) => {
		this.setState({
			inputValue: event.target.value,
		});
	}

	onKeyDown = (e) => {
		if (e.key === 'Enter') {
			this.next();
		}
	}

	next = () => {
		if (this.props.result === 'learning') {
			this.props.userWrote(this.state.inputValue);
		}
	}

	clearInput = () => {
		this.input.focus();
		this.setState({ inputValue: '' });
	}

	render() {
		let input = (<input ref={(input) => { this.input = input; }} value={this.state.inputValue} onChange={(e) => this.inputChange(e)} onKeyDown={(e) => this.onKeyDown(e)} className={styles.Input} />)

		if (this.props.result === 'correct') {
			const inputClasses = styles.Input + ' ' + styles.InputCorrect;
			input = (<input ref={(input) => { this.input = input; }} readOnly value={this.state.inputValue} className={inputClasses} />)
		} else if (this.props.result === 'wrong') {
			const inputClasses = styles.Input + ' ' + styles.InputWrong;
			input = (<input ref={(input) => { this.input = input; }} readOnly value={this.state.inputValue} className={inputClasses} />)
		}

		return (
			<div className={styles.Content}>
				<div className={styles.Main}>
					<div className={styles.Word}>{this.props.pair.description}</div>
					{input}
				</div>
				<div className={styles.RightColumn}>
					<div onClick={this.next} className={styles.NextButton}>
						<div className={styles.RightArrow}></div>
						<div>Next</div>
					</div>
				</div>
			</div>
		);
	}
}

export default WriteWordFragment;