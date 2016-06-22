/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import DatePicker from 'react-native-datepicker';

class example extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: '2016-05-11',
      time: '20:00',
      datetime: '2016-05-05 20:00',
      datetime1: '2016-05-05 20:00'
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to react-native-datepicker example!
        </Text>
        <DatePicker
          style={{width: 200}}
          date={this.state.date}
          mode="date"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          iconSource={require('./google_calendar.png')}
          onDateChange={(date) => {this.setState({date: date});}}
        />
        <Text style={styles.instructions}>date: {this.state.date}</Text>
        <DatePicker
          style={{width: 200}}
          date={this.state.time}
          mode="time"
          format="HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(time) => {this.setState({time: time});}}
        />
        <Text style={styles.instructions}>time: {this.state.time}</Text>
        <DatePicker
          style={{width: 200}}
          date={this.state.datetime}
          mode="datetime"
          format="YYYY-MM-DD HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          onDateChange={(datetime) => {this.setState({datetime: datetime});}}
        />
        <Text style={styles.instructions}>datetime: {this.state.datetime}</Text>
        <DatePicker
          style={{width: 200}}
          date={this.state.datetime1}
          mode="datetime"
          format="YYYY-MM-DD HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(datetime) => {this.setState({datetime1: datetime});}}
        />
        <Text style={styles.instructions}>datetime: {this.state.datetime1}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

AppRegistry.registerComponent('example', () => example);
