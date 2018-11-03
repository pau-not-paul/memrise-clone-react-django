import React, { Component } from 'react';
import styles from './LeftColumn.module.css';
import Profile from './Profile/Profile';

class LeftColumn extends Component {
	render() {    
 		return (
			<div className={styles.LeftColumn}>
				<Profile/>
       		</div>
    	);
  	}
}

export default LeftColumn;