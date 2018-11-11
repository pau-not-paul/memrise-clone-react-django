import React, { Component } from 'react';
import styles from './WordsBlock.module.css';

class WordsBlock extends Component {

	render() {
		return (
			<div className={styles.WordsBlock}>
				<div className={styles.RowWrapper}>
					<div className={styles.LanguagesRow}>
						<div className={styles.Column}>{this.props.course.teaching}</div>
						<div className={styles.Column}>{this.props.course.description_language}</div>
					</div>
				</div>

				{this.props.course.words.map((p, idx) => (
					<div key={idx} className={styles.RowWrapper}>
						<div className={styles.Row}>
							<div className={styles.Column}>{p.word}</div>
							<div className={styles.Column}>{p.description}</div>
							{this.props.removeWord ?
								<div className={styles.RemoveBtn} onClick={() => this.props.removeWord(p)} /> : null
							}
						</div>
					</div>
				))}
				{this.props.children}
			</div>
		);
	}
}

export default WordsBlock;