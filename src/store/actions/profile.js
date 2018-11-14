import * as actionTypes from './actionTypes';
import axios from 'axios';

export const profileStart = () => {
	return {
		type: actionTypes.PROFILE_START,
	};
};

export const profileLoaded = (username, courses, level, wordsLearned, points, progress) => {
	return {
		type: actionTypes.PROFILE_LOADED,
		username: username,
		courses: courses,
		level: level,
		wordsLearned: wordsLearned,
		points: points,
		progress: progress,
	};
};

export const profileLoad = token => {
	return (dispatch, getState) => {
		dispatch(profileStart());

		const url =
			window.location.href.indexOf('heroku') !== -1
				? 'https://memclone-react-django.herokuapp.com/'
				: 'http://localhost:8000/';

		axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
		axios.defaults.xsrfCookieName = 'csrftoken';

		if (!token) {
			token = getState().auth.token;
		}

		axios.defaults.headers = {
			'Content-Type': 'application/json',
			Authorization: 'Token ' + token,
		};

		const username = localStorage.getItem('username');
		axios.get(url + 'profiles-api/u/').then(res => {
			if (res.data) {
				const obj = JSON.parse(res.data);
				const courses = JSON.parse(obj.courses);
				let progress = {};
				if (obj.progress !== '') {
					try {
						progress = JSON.parse(obj.progress);
					} catch (e) {
						progress = {};
					}
				}
				let totalWordsLearned = 0;
				const coursesF = [];
				for (let c of courses) {
					const totalWords = JSON.parse(c.fields.words).length;
					let wordsLearned = 0;
					if (progress[c.pk]) {
						wordsLearned = progress[c.pk].wordsLearned;
					}
					const course = {
						id: c.pk,
						name: c.fields.name,
						wordsLearned: wordsLearned,
						totalWords: totalWords,
					};
					coursesF.push(course);
					totalWordsLearned += wordsLearned;
				}
				const level = 1;
				const points = totalWordsLearned * 125;
				dispatch(profileLoaded(username, coursesF, level, totalWordsLearned, points, progress));
			}
		});
	};
};
