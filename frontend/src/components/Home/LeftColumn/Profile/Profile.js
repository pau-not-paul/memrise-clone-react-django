import React, { Component } from 'react';
import styles from './Profile.module.css';

class Profile extends Component {
	render() {    
 		return (
			<div className={styles.Profile}>
				<div className={styles.ProfileHeader}>
					<div className={styles.UserName}>UserName</div>
					<div className={styles.Level}>LEVEL 1</div>
					<img className={styles.ProfileImage} alt=""/>
       			</div>
       		</div>
    	);
  	}
}

export default Profile;