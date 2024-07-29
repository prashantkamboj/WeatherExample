import {
  ActionsHome,
  errorGettingFiveDaysData,
  errorGettingTodaysData,
  getFiveDaysData,
  getTodaysData,
  gotFiveDaysData,
  gotTodaysData,
} from './sliceHome';
import {
  catchError,
  debounceTime,
  filter,
  from,
  map,
  mergeMap,
  Observable,
  of,
  takeUntil,
} from 'rxjs';
import {OpenWeatherResponse, WeatherData} from '../utils/types';
import axios from 'axios';
import {Config} from '../../../Utils/Config';
import debugLog from '../../../Utils/Logger';

async function getData(): Promise<OpenWeatherResponse> {
  const result = await axios.get<OpenWeatherResponse>(Config.currentData);
  debugLog(result.data);
  return result.data;
}

export const epicGetTodaysData = (action$: Observable<ActionsHome>) =>
  action$.pipe(
    filter(getTodaysData.match),
    debounceTime(400),
    mergeMap(() =>
      from(getData()).pipe(
        map(res => {
          if (res) {
            return gotTodaysData(res);
          }
          debugLog('Error Empty Object');
          return errorGettingTodaysData('Error Empty Object');
        }),
        takeUntil(action$.pipe(filter(getTodaysData.match))),
        catchError(() => of(errorGettingTodaysData('Error Getting Data'))),
      ),
    ),
  );

async function getDaysData(): Promise<WeatherData> {
  debugLog('Working Till Here');
  const result = await axios.get<WeatherData>(Config.fiveDaysData);
  debugLog(result.data);
  return result.data;
}

export const epicGetFiveDaysData = (action$: Observable<ActionsHome>) =>
  action$.pipe(
    filter(getFiveDaysData.match),
    debounceTime(400),
    mergeMap(() =>
      from(getDaysData()).pipe(
        map(res => {
          if (res) {
            return gotFiveDaysData(res.list);
          }
          debugLog('Error Empty Object');
          return errorGettingFiveDaysData('Error Empty Object');
        }),
        takeUntil(action$.pipe(filter(getFiveDaysData.match))),
        catchError(() => of(errorGettingFiveDaysData('Error Getting Data'))),
      ),
    ),
  );
