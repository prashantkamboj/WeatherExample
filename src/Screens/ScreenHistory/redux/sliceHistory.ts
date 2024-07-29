import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TypeInitialStateHistory} from './type';
import {OpenWeatherResponse} from '../../ScreenHome/utils/types';

const initialState: TypeInitialStateHistory = {
  isLoading: false,
  weatherData: {} as OpenWeatherResponse,
};
const sliceHistory = createSlice({
  name: 'sliceHistory',
  initialState,
  reducers: {
    searchWeatherData(state, _action: PayloadAction<string>) {
      return {
        ...state,
        isLoading: true,
      };
    },
    searchedWeatherData(state, action: PayloadAction<OpenWeatherResponse>) {
      return {
        ...state,
        isLoading: false,
        weatherData: action.payload,
      };
    },
    errorSearchingWeatherData(state) {
      return {
        ...state,
        isLoading: false,
      };
    },
    clearState(state) {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

export const {
  searchWeatherData,
  searchedWeatherData,
  errorSearchingWeatherData,
  clearState,
} = sliceHistory.actions;
export const reducerHistory = sliceHistory.reducer;
export type ActionsHistory =
  | ReturnType<typeof searchWeatherData>
  | ReturnType<typeof searchedWeatherData>
  | ReturnType<typeof errorSearchingWeatherData>;
