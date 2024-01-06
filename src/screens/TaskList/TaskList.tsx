import React, {Component} from 'react';
import {Text, View, ImageBackground} from 'react-native';

import styles from './styles';
import todayImage from '../../../assets/imgs/today.jpg';

export default class TaskList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={todayImage} style={styles.background} />
        <View style={styles.taskList}>
          <Text>Lista de tarefas</Text>
        </View>
      </View>
    );
  }
}
