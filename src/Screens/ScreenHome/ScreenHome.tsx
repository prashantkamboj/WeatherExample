/* eslint-disable react-hooks/exhaustive-deps */
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './StyleHome';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/reduxHooks';
import {getFiveDaysData, getTodaysData} from './redux/sliceHome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteStackParamList} from '../../Navigator/types';

function ScreenHome({navigation}: NativeStackScreenProps<RouteStackParamList>) {
  const dispatch = useAppDispatch();
  const {todaysData, isLoading, fiveDaysData, gettingFiveDaysData} =
    useAppSelector(state => state.reducerHome);
  useEffect(() => {
    dispatch(getTodaysData());
    dispatch(getFiveDaysData());
  }, []);
  const gotoSearchScreen = () => {
    navigation.navigate('ScreenHistory');
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text>Today's Weather</Text>
      {!isLoading && Object.keys(todaysData).length > 0 && (
        <View>
          <Text>{`Temp: ${todaysData.main.temp} f`}</Text>
          <Text>{`Feels Like: ${todaysData.main.feels_like} f`}</Text>
          <Text>{`Minimum Temp: ${todaysData.main.temp_min} f`}</Text>
          <Text>{`Maximum Temp: ${todaysData.main.temp_max} f`}</Text>
        </View>
      )}
      {
        <>
          <ScrollView
            contentContainerStyle={styles.scrollViewContainer}
            style={{marginTop: 20}}>
            <Text>Five Day's Weather</Text>
            {!gettingFiveDaysData &&
              fiveDaysData.length > 0 &&
              fiveDaysData.map(item => (
                <View style={styles.tempratureItems} key={item.dt}>
                  <Text>{`Temp: ${item.main.temp} f`}</Text>
                  <Text>{`Feels Like: ${item.main.feels_like} f`}</Text>
                  <Text>{`Minimum Temp: ${item.main.temp_min} f`}</Text>
                  <Text>{`Maximum Temp: ${item.main.temp_max} f`}</Text>
                </View>
              ))}
          </ScrollView>
        </>
      }
      <TouchableOpacity onPress={gotoSearchScreen}>
        <Text>Move To Search Screen</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
export default ScreenHome;
