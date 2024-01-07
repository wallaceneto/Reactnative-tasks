import React from 'react';
import {
  Text,
  TextStyle,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import '../../../node_modules/moment/locale/pt-br';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

import styles from './styles';
import {TaskType} from '../../global/types';

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

export default function Task(props: TaskType) {
  const doneOrNotStyle: TextStyle = props.doneAt
    ? {textDecorationLine: 'line-through'}
    : {};
  const date = props.doneAt || props.estimateAt;
  const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM');

  const getRightContent = () => {
    return (
      <TouchableOpacity style={styles.right}>
        <Icon name="trash" size={25} color="#fff" />
      </TouchableOpacity>
    );
  };

  const getLeftContent = () => {
    return (
      <View style={styles.left}>
        <Icon name="trash" size={20} color="#fff" style={styles.excludeIcon} />
        <Text style={styles.excludeText}>Excluir</Text>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={getRightContent}
        renderLeftActions={getLeftContent}>
        <View style={styles.container}>
          <TouchableWithoutFeedback
            onPress={() => {
              props.toggleTask ? props.toggleTask(props.id) : () => {};
            }}>
            <View style={styles.checkContainer}>
              {getCheckView(props.doneAt)}
            </View>
          </TouchableWithoutFeedback>

          <View>
            <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
            <Text style={styles.date}>{formattedDate + ''}</Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}
