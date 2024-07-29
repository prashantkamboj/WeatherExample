import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  textInputContainer: {
    marginTop: 30,
    width: Dimensions.get('screen').width,
    paddingHorizontal: 30,
    gap: 20,
  },
  textInput: {
    height: 60,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: 'black',
  },
  subContainer: {
    flex: 0.7,
    marginTop: 20,
  },
  scrollViewContainer: {
    gap: 10,
    paddingHorizontal: 20,
  },
});
