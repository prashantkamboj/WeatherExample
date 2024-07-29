import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './rootReducer';
import {rootEpic} from './rootEpic';
import {createEpicMiddleware} from 'redux-observable';

const epicMiddleware = createEpicMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);
