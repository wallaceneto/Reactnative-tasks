import {StyleSheet} from 'react-native';

import commonStyles from '../../global/commonStyles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#AAA',
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkContainer: {
    width: '20%',
    alignItems: 'center',
  },
  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555',
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    backgroundColor: '#4D7031',
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
    fontSize: 15,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
    fontSize: 12,
  },
});

export default styles;
