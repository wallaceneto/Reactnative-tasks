import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

function getCheckView(doneAt?: Date) {
  if (doneAt) {
    return (
      <View style={styles.done}>
        <Icon name="check" size={15} color={'#fff'} />
      </View>
    );
  } else {
    return <View style={styles.pending} />;
  }
}

export {getCheckView};
