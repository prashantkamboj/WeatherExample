import {combineReducers} from '@reduxjs/toolkit';
import {reducerHome} from '../Screens/ScreenHome/redux/sliceHome';
import {reducerHistory} from '../Screens/ScreenHistory/redux/sliceHistory';

export const rootReducer = combineReducers({reducerHome, reducerHistory});
