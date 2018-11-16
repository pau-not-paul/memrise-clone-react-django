import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	loading: true,
	username: null,
	level: '1',
	points: '0',
	wordsLearned: '0',
	courses: null,
	progress: null,
};

const profileStart = state => {
	return updateObject(state, {
		loading: true,
	});
};

const profileLoaded = (state, action) => {
	return updateObject(state, {
		loading: false,
		username: action.username,
		courses: action.courses,
		level: String(action.level),
		points: String(action.points),
		wordsLearned: String(action.wordsLearned),
		progress: action.progress,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PROFILE_START:
			return profileStart(state);
		case actionTypes.PROFILE_LOADED:
			return profileLoaded(state, action);
		default:
			return state;
	}
};

export default reducer;
