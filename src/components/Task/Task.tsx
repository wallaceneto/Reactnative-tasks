import React from 'react';
import {Text, TextStyle, View} from 'react-native';
import { Icon } from '@rneui/themed';
import moment from 'moment';
import '../../../node_modules/moment/locale/pt-br';

import styles from './styles';

type Props = {
  desc: String;
  estimateAt: Date;
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
      <View style={styles.checkContainer}>
        {getCheckView(props.doneAt)}
      </View>
      <View>
        <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
        <Text style={styles.date}>{formattedDate + ''}</Text>
      </View>
    </View>
  );
}
