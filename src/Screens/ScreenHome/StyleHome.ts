import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    marginTop: 40,
    width: Dimensions.get('screen').width,
  },
  tempratureItems: {
    marginTop: 20,
  },
});
