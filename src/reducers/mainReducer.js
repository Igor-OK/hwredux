import {combineReducers} from 'redux';
import {tagsReducer} from './tagsReducer';
import {fetchReducer} from './fetchReducer';

export const mainReducer = combineReducers({
    tags: tagsReducer,
    feed: fetchReducer
})

