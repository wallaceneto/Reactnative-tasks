import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import moment from 'moment';
import '../../../node_modules/moment/locale/pt-br';
import AsyncStorage from '@react-native-async-storage/async-storage';

import commonStyles from '../../global/commonStyles';
import styles from './styles';
import todayImage from '../../../assets/imgs/today.jpg';
import Task from '../../components/Task/Task';
import {TaskType} from '../../global/types';
import AddTask from '../AddTask/AddTask';

type TaskListState = {
  showDoneTasks: boolean;
  showAddTask: boolean;
  visibleTasks: TaskType[];
  tasks: TaskType[];
};

const initialState = {
  showDoneTasks: true,
  showAddTask: false,
  visibleTasks: [],
  tasks: [],
};

export default class TaskList extends Component {
  state: TaskListState = {...initialState};

  async componentDidMount() {
    const stateString = await AsyncStorage.getItem('tasksState');
    let state = initialState;

    if (stateString) {
      state = JSON.parse(stateString) || initialState;
    }
    this.setState(state, this.filterTask);
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
    AsyncStorage.setItem('tasksState', JSON.stringify(this.state));
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

  addTask = (newTask: TaskType) => {
    if (!newTask.desc.trim()) {
      Alert.alert('Dados inválidos', 'Descrição não informada');
      return;
    }

    const tasks = [...this.state.tasks];
    tasks.push({
      id: newTask.id,
      desc: newTask.desc,
      estimateAt: newTask.estimateAt,
    });

    this.setState({tasks, showAddTask: false}, this.filterTask);
  };

  deleteTask = (id: number) => {
    const tasks = this.state.tasks.filter(task => task.id !== id);
    this.setState({tasks}, this.filterTask);
  };

  render() {
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM');

    return (
      <View style={styles.container}>
        <AddTask
          isVisible={this.state.showAddTask}
          onCancel={() => this.setState({showAddTask: false})}
          onSave={this.addTask}
        />

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
              <Task
                {...item}
                onToggleTask={this.toggleTask}
                onDelete={this.deleteTask}
              />
            )}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.addButton}
          onPress={() => this.setState({showAddTask: true})}>
          <Icon name="plus" size={20} color={commonStyles.colors.secondary} />
        </TouchableOpacity>
      </View>
    );
  }
}
