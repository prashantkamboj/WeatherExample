import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  InitialStateHome,
  OpenWeatherResponse,
  WeatherForecast,
} from '../utils/types';

const initialState: InitialStateHome = {
  isLoading: false,
  gettingFiveDaysData: false,
  todaysData: {} as OpenWeatherResponse,
  fiveDaysData: [] as WeatherForecast[],
};
const sliceHome = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {
    getTodaysData(state) {
      return {
        ...state,
        isLoading: false,
      };
    },
    gotTodaysData(state, action: PayloadAction<OpenWeatherResponse>) {
      return {
        ...state,
        todaysData: action.payload,
        isLoading: false,
      };
    },
    errorGettingTodaysData(state, _action: PayloadAction<string>) {
      return {
        ...state,
        isLoading: false,
      };
    },
    getFiveDaysData(state) {
      return {
        ...state,
        gettingFiveDaysData: true,
      };
    },
    gotFiveDaysData(state, action: PayloadAction<WeatherForecast[]>) {
      return {
        ...state,
        fiveDaysData: action.payload,
        gettingFiveDaysData: false,
      };
    },
    errorGettingFiveDaysData(state, _action: PayloadAction<string>) {
      return {
        ...state,
        gettingFiveDaysData: false,
      };
    },
  },
});

export const {
  getTodaysData,
  gotTodaysData,
  errorGettingTodaysData,
  getFiveDaysData,
  gotFiveDaysData,
  errorGettingFiveDaysData,
} = sliceHome.actions;
export const reducerHome = sliceHome.reducer;
export type ActionsHome =
  | ReturnType<typeof getTodaysData>
  | ReturnType<typeof gotTodaysData>
  | ReturnType<typeof getFiveDaysData>
  | ReturnType<typeof gotFiveDaysData>
  | ReturnType<typeof errorGettingFiveDaysData>
  | ReturnType<typeof errorGettingTodaysData>;
