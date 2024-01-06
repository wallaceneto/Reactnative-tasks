import React, {Component} from 'react';
import {Text, View, ImageBackground} from 'react-native';
import moment from 'moment';
import '../../../node_modules/moment/locale/pt-br';

import styles from './styles';
import todayImage from '../../../assets/imgs/today.jpg';
import Task from '../../components/Task/Task';

export default class TaskList extends Component {
  render() {
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM');

    return (
      <View style={styles.container}>
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>{today}</Text>
          </View>
        </ImageBackground>

        <View style={styles.taskList}>
          <Task
            desc={'Comprar livro'}
            estimateAt={new Date()}
            doneAt={new Date('2024-01-02')}
          />
          <Task desc={'Ler livro'} estimateAt={new Date()}  />
        </View>
      </View>
    );
  }
}
