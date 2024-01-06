import React from 'react';
import {Text, TextStyle, View, TouchableWithoutFeedback} from 'react-native';
import { Icon } from '@rneui/themed';
import moment from 'moment';
import '../../../node_modules/moment/locale/pt-br';

import styles from './styles';

type Props = {
  id: number;
  desc: String;
  estimateAt: Date;
  toggleTask: Function,
  doneAt?: Date;
};

function getCheckView(doneAt?: Date) {
    if (doneAt) {
        return (
            <View style={styles.done}>
                <Icon name='check' size={20} color={'#fff'} />
            </View>
        );
    } else {
        return (
            <View style={styles.pending}></View>
        );
    }
}

export default function Task(props: Props) {
  const doneOrNotStyle: TextStyle = props.doneAt ? {textDecorationLine: 'line-through'} : {};
  const date = props.doneAt || props.estimateAt;
  const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM');

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
        <View style={styles.checkContainer}>
            {getCheckView(props.doneAt)}
        </View>
      </TouchableWithoutFeedback>
      <View>
        <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
        <Text style={styles.date}>{formattedDate + ''}</Text>
      </View>
    </View>
  );
}
