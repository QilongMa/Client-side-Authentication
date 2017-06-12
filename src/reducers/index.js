import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import autheReducer from './auth_reducer';

const rootReducer = combineReducers({
    form,
    auth: autheReducer
});

export default rootReducer;
