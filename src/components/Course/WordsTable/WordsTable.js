import React from 'react';
import PropTypes from 'prop-types';

import styles from './WordsTable.module.css';

const WordsTable = props => (
	<div className={styles.WordsTable}>
		<div className={styles.RowWrapper}>
			<div className={styles.LanguagesRow}>
				<div className={styles.Column}>{props.teaching}</div>
				<div className={styles.Column}>{props.description_language}</div>
			</div>
		</div>

		{props.words.map((p, idx) => (
			<div key={idx} className={styles.RowWrapper}>
				<div className={styles.Row}>
					<div className={styles.Column}>{p.word}</div>
					<div className={styles.Column}>{p.description}</div>
					{props.removeWord && (
						<div className={styles.RemoveBtn} onClick={() => props.removeWord(p)} />
					)}
				</div>
			</div>
		))}
		{props.children}
	</div>
);

export default WordsTable;

WordsTable.propTypes = {
	name: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	teaching: PropTypes.string.isRequired,
	description_language: PropTypes.string.isRequired,
	words: PropTypes.array.isRequired,
};
