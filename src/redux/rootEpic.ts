import {Epic, combineEpics} from 'redux-observable';
import {
  epicGetFiveDaysData,
  epicGetTodaysData,
} from '../Screens/ScreenHome/redux/epicHome';
import {epicSearchData} from '../Screens/ScreenHistory/redux/epicHistory';

const epics: Epic[] = [
  epicGetTodaysData,
  epicGetFiveDaysData,
  epicSearchData,
] as Epic[];

export const rootEpic = combineEpics(...(epics as Epic[]));
