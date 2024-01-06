import React, {Component} from 'react';
import {Text, View, ImageBackground, FlatList} from 'react-native';
import moment from 'moment';
import '../../../node_modules/moment/locale/pt-br';

import styles from './styles';
import todayImage from '../../../assets/imgs/today.jpg';
import Task from '../../components/Task/Task';

export default class TaskList extends Component {
  state = {
    tasks: [
      {
        id: Math.random(),
        desc: 'Comprar livro \'Maus\'',
        estimateAt: new Date(),
        doneAt: new Date(),
      },
      {
        id: Math.random(),
        desc: 'Ler livro \'Maus\'',
        estimateAt: new Date(),
      },
      {
        id: Math.random(),
        desc: 'Comprar livro \'Maus\'',
        estimateAt: new Date(),
        doneAt: new Date(),
      },
      {
        id: Math.random(),
        desc: 'Ler livro \'Maus\'',
        estimateAt: new Date(),
      },
    ],
  };

  toggleTask = (taskId: number) => {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if(task.id === taskId) {
        task.doneAt = task.doneAt ? undefined : new Date();
      }
    });

    this.setState({ tasks })
  }

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
          <FlatList
            data={this.state.tasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask} />}
          />
        </View>
      </View>
    );
  }
}
