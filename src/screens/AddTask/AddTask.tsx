import React, {Component} from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

type AddTaskProps = {
  isVisible: boolean;
  onCancel: () => void;
};

const initialState = {desc: ''};

export default class AddTask extends Component<AddTaskProps> {
  state = {...initialState};

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background}>
            <TouchableWithoutFeedback onPress={() => null}>
              <View style={styles.container}>
                <Text style={styles.header}>Nova tarefa</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Informe a descrição..."
                  onChangeText={desc => this.setState({desc})}
                  value={this.state.desc}
                />

                <View style={styles.buttons}>
                  <TouchableOpacity onPress={this.props.onCancel}>
                    <Text style={styles.button}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.button}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
