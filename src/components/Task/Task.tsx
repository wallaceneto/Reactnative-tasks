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
import {getCheckView} from './functions';
import {TaskType} from '../../global/types';

export default function Task(props: TaskType) {
  const doneOrNotStyle: TextStyle = props.doneAt
    ? {textDecorationLine: 'line-through'}
    : {};
  const date = props.doneAt || props.estimateAt;
  const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM');

  const getRightContent = () => {
    return (
      <TouchableOpacity
        style={styles.right}
        onPress={() => props.onDelete && props.onDelete(props.id)}>
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
        renderLeftActions={getLeftContent}
        onSwipeableOpen={direction => {
          if (direction === 'left') {
            props.onDelete && props.onDelete(props.id);
          }
        }}>
        <View style={styles.container}>
          <TouchableWithoutFeedback
            onPress={() => {
              props.onToggleTask ? props.onToggleTask(props.id) : () => {};
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
