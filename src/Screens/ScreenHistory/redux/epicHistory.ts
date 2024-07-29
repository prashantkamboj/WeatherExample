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
import {
  ActionsHistory,
  errorSearchingWeatherData,
  searchedWeatherData,
  searchWeatherData,
} from './sliceHistory';
import {Config} from '../../../Utils/Config';
import {OpenWeatherResponse} from '../../ScreenHome/utils/types';
import debugLog from '../../../Utils/Logger';
import axios from 'axios';
import {getJson, setUserPref} from '../../../Utils/LocalStorageConstants';
import {searchHistoryArray} from '../../../Utils/Constants';

async function getDaysData(query: string): Promise<OpenWeatherResponse> {
  debugLog('Working Till Here');
  const result = await axios.get<OpenWeatherResponse>(Config.searchData(query));
  debugLog(result.data);
  return result.data;
}

export const epicSearchData = (action$: Observable<ActionsHistory>) =>
  action$.pipe(
    filter(searchWeatherData.match),
    debounceTime(400),
    map(x => x.payload),
    mergeMap(q =>
      from(getDaysData(q)).pipe(
        map(res => {
          if (res) {
            const history = getJson(searchHistoryArray);
            if (history) {
              const data = {query: q, ...res};
              const dataToSet = [...history, data];
              setUserPref(searchHistoryArray, JSON.stringify(dataToSet));
            } else {
              const hist = [{query: q, ...res}];
              setUserPref(searchHistoryArray, JSON.stringify(hist));
            }
            return searchedWeatherData(res);
          }
          debugLog('Error Empty Object');
          return errorSearchingWeatherData();
        }),
        takeUntil(action$.pipe(filter(searchWeatherData.match))),
        catchError(() => of(errorSearchingWeatherData())),
      ),
    ),
  );
