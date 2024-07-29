/* eslint-disable react-hooks/exhaustive-deps */
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './StyleHistory';
import {useEffect, useState} from 'react';
import {debounceTime, map, Subject} from 'rxjs';
import debugLog from '../../Utils/Logger';
import {useAppDispatch, useAppSelector} from '../../redux/reduxHooks';
import {clearState, searchWeatherData} from './redux/sliceHistory';
import {getJson} from '../../Utils/LocalStorageConstants';
import {searchHistoryArray} from '../../Utils/Constants';

function ScreenHistory() {
  const [onTextChange$] = useState(() => new Subject());
  const [input, setInput] = useState<string>('');
  const {weatherData} = useAppSelector(state => state.reducerHistory);
  const dispatch = useAppDispatch();
  const handleTextChange = (text: string) => {
    debugLog(text);
    setInput(text);
  };
  useEffect(() => {
    const subscription = onTextChange$
      .pipe(
        debounceTime(300),
        map(text => handleTextChange(text as string)),
      )
      .subscribe();
    return () => subscription.unsubscribe();
  }, []);
  const handleOnPress = () => {
    if (input) dispatch(searchWeatherData(input));
  };
  const handleClearPress = () => {
    if (input) dispatch(clearState());
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={value => onTextChange$.next(value)}
        />
        <TouchableOpacity onPress={handleOnPress}>
          <Text>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClearPress}>
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>
      {Object.keys(weatherData).length > 0 && weatherData && (
        <View>
          <Text>{`Temp ${weatherData.main.temp}`}</Text>
          <Text>{`Maximum ${weatherData.main.temp_max}`}</Text>
          <Text>{`Minimum ${weatherData.main.temp_min}`}</Text>
        </View>
      )}
      <View style={styles.subContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Text>History</Text>
          {getJson(searchHistoryArray) ? (
            getJson(searchHistoryArray)?.map(item => (
              <View>
                <Text>{`${item.query}`}</Text>
              </View>
            ))
          ) : (
            <View />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
export default ScreenHistory;
