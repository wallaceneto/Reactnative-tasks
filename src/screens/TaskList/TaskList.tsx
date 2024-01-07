import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import '../../../node_modules/moment/locale/pt-br';

import commonStyles from '../../global/commonStyles';
import styles from './styles';
import todayImage from '../../../assets/imgs/today.jpg';
import Task from '../../components/Task/Task';
import {TaskType} from '../../global/types';

type TaskListState = {
  showDoneTasks: boolean;
  visibleTasks: TaskType[];
  tasks: TaskType[];
};

export default class TaskList extends Component {
  state: TaskListState = {
    showDoneTasks: true,
    visibleTasks: [],
    tasks: [
      {
        id: Math.random(),
        desc: "Comprar livro 'Maus'",
        estimateAt: new Date(),
        doneAt: new Date(),
      },
      {
        id: Math.random(),
        desc: "Ler livro 'Maus'",
        estimateAt: new Date(),
      },
      {
        id: Math.random(),
        desc: "Comprar livro 'Maus'",
        estimateAt: new Date(),
        doneAt: new Date(),
      },
      {
        id: Math.random(),
        desc: "Ler livro 'Maus'",
        estimateAt: new Date(),
      },
    ],
  };

  componentDidMount() {
    this.filterTask();
  }

  toggleFilter = () => {
    this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTask);
  };

  filterTask = () => {
    let visibleTasks = null;
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks];
    } else {
      const pending = (task: TaskType) => task.doneAt === undefined;
      visibleTasks = this.state.tasks.filter(pending);
    }

    this.setState({visibleTasks});
  };

  toggleTask = (taskId: number) => {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt ? undefined : new Date();
      }
    });

    this.setState({tasks}, this.filterTask);
  };

  render() {
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM');

    return (
      <View style={styles.container}>
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon
                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20}
                color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>{today}</Text>
          </View>
        </ImageBackground>

        <View style={styles.taskList}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => (
              <Task {...item} toggleTask={this.toggleTask} />
            )}
          />
        </View>
      </View>
    );
  }
}
