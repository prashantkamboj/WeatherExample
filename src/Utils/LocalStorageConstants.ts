import {MMKV} from 'react-native-mmkv';
import debugLog from './Logger';

export const storage = new MMKV();

const TAG = 'StorageUtils';

// value can be string | boolean | number
const setUserPref = (key: string, value: string | boolean | number) => {
  try {
    storage.set(key, value);
  } catch (e) {
    debugLog(TAG, (e as Error).message);
  }
};

const getBoolean = (key: string, defaultValue = false): boolean => {
  try {
    const value = storage.getBoolean(key);
    if (value === undefined || value === null) {
      return defaultValue;
    }
    return value;
  } catch (e) {
    debugLog(TAG, (e as Error).message);
  }
  return defaultValue;
};

const getString = (key: string, defaultValue = ''): string => {
  try {
    const value = storage.getString(key);
    if (!value) {
      return defaultValue;
    }
    return value;
  } catch (e) {
    debugLog(TAG, (e as Error).message);
  }
  return defaultValue;
};

const getJson = (key: string, defaultValue = []): undefined | Array<any> => {
  try {
    const value = storage.getString(key);
    if (!value) {
      return defaultValue;
    }
    return JSON.parse(value);
  } catch (e) {
    debugLog(TAG, (e as Error).message);
  }
  return defaultValue;
};

const getNumber = (key: string, defaultValue = 0) => {
  try {
    const value = storage.getNumber(key);
    if (!value) {
      return defaultValue;
    }
    return value;
  } catch (e) {
    debugLog(TAG, (e as Error).message);
  }
  return defaultValue;
};

const flush = () => {
  try {
    storage.clearAll();
  } catch (e) {
    debugLog(TAG, (e as Error).message);
  }
};

export {setUserPref, getBoolean, getString, getJson, getNumber, flush};
