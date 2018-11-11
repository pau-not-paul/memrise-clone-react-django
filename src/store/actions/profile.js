import * as actionTypes from './actionTypes';
import axios from 'axios';

export const profileStart = () => {
    return {
        type: actionTypes.PROFILE_START
    }
}

export const profileLoaded = (username, courses, level, wordsLearned, points) => {
    return {
        type: actionTypes.PROFILE_LOADED,
        username: username,
        courses: courses,
        level: level,
        wordsLearned: wordsLearned,
        points: points,
    }
}

export const profileLoad = (token) => {
    return (dispatch, getState) => {
        dispatch(profileStart());

        const url = (window.location.href.indexOf('heroku') !== -1)
            ? 'https://memclone-react-django.herokuapp.com/'
            : 'http://localhost:8000/';

        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";

        if (!token) {
            token = getState().auth.token;
        }

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: 'Token ' + token,
        };

        const username = localStorage.getItem('username');
        axios.get(url + 'profiles-api/u/')
            .then(res => {
                if (res.data) {
                    const courses = JSON.parse(res.data)
                    const coursesF = [];
                    for (let c of courses) {
                        const totalWords = JSON.parse(c.fields.words).length;
                        const course = {
                            id: c.pk,
                            name: c.fields.name,
                            wordsLearned: 0,
                            totalWords: totalWords,
                        };
                        coursesF.push(course);
                    }
                    const level = 1;
                    const wordsLearned = 0;
                    const points = 0;
                    dispatch(profileLoaded(username, coursesF, level, wordsLearned, points));
                }
            });
    }
}