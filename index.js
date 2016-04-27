'use strict';
import React, {
  Component,
  View,
  Text,
  Image,
  Modal,
  TouchableHighlight,
  DatePickerAndroid,
  TimePickerAndroid,
  DatePickerIOS,
  Platform,
  Animated
} from 'react-native';
import Style from './style';
import Moment from 'moment';

const FORMATS = {
  'date': 'YYYY-MM-DD',
  'datetime': 'YYYY-MM-DD HH:mm',
  'time': 'HH:mm'
};

class DatePicker extends Component {

  // 构造
  constructor(props) {
    super(props);

    this.datePicked = this.datePicked.bind(this);
    this.onPressDate = this.onPressDate.bind(this);
    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressConfirm = this.onPressConfirm.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  format = this.props.format;
  mode = this.props.mode || 'date';
  // component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
  height = 259;
  // slide animation duration time, default to 300ms, IOS only
  duration = this.props.duration || 300;

  state = {
    date: this.getDate(),
    modalVisible: false,
    disabled: this.props.disabled,
    animatedHeight: new Animated.Value(0)
  };

  componentWillMount() {
    // ignore the warning of Failed propType for date of DatePickerIOS, will remove after being fixed by official
    console.ignoredYellowBox = [
      'Warning: Failed propType'
      // Other warnings you don't want like 'jsSchedulingOverhead',
    ];

    // init format according to mode
    if (!this.format) {
      this.format = FORMATS[this.mode];
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});

    // slide animation
    if (visible) {
      Animated.timing(
        this.state.animatedHeight,
        {
          toValue: this.height,
          duration: this.duration
        }
      ).start();
    } else {
      this.setState({
        animatedHeight: new Animated.Value(0)
      })
    }
  }

  onPressCancel() {
    this.setModalVisible(false);
  }

  onPressConfirm() {
    this.datePicked();
    this.setModalVisible(false);
  }

  getDate(date = this.props.date) {
    if (date instanceof Date) {
      return date;
    } else {
      return Moment(date, this.format).toDate();
    }
  }

  getDateStr(date = this.props.date) {
    if (date instanceof Date) {
      return Moment(date).format(this.format);
    } else {
      return Moment(this.getDate(date)).format(this.format);
    }
  }

  datePicked() {
    if (typeof this.props.onDateChange === 'function') {
      this.props.onDateChange(this.getDateStr(this.state.date))
    }
  }

  onPressDate() {
    if (this.state.disabled) {
      return true;
    }

    // reset state
    this.setState({
      date: this.getDate()
    });

    if (Platform.OS === 'ios') {
      this.setModalVisible(true);
    } else {

      // 选日期
      if (this.mode === 'date') {
        DatePickerAndroid.open({
          date: this.state.date,
          minDate: this.props.minDate && this.getDate(this.props.minDate),
          maxDate: this.props.maxDate && this.getDate(this.props.maxDate)
        }).then(({action, year, month, day}) => {
          if (action !== DatePickerAndroid.dismissedAction) {
            this.setState({
              date: new Date(year, month, day)
            });
            this.datePicked();
          }
        });
      } else if (this.mode === 'time') {
        // 选时间

        let timeMoment = Moment(this.state.date);

        TimePickerAndroid.open({
          hour: timeMoment.hour(),
          minute: timeMoment.minutes(),
          is24Hour: !this.format.match(/h|a/)
        }).then(({action, hour, minute}) => {
          if (action !== DatePickerAndroid.dismissedAction) {
            console.log(Moment().hour(hour).minute(minute).toDate());
            this.setState({
              date: Moment().hour(hour).minute(minute).toDate()
            });
            this.datePicked();
          }
        });
      } else if (this.mode === 'datetime') {
        // 选日期和时间

        DatePickerAndroid.open({
          date: this.state.date,
          minDate: this.props.minDate && this.getDate(this.props.minDate),
          maxDate: this.props.maxDate && this.getDate(this.props.maxDate)
        }).then(({action, year, month, day}) => {
          if (action !== DatePickerAndroid.dismissedAction) {
            let timeMoment = Moment(this.state.date);

            TimePickerAndroid.open({
              hour: timeMoment.hour(),
              minute: timeMoment.minutes(),
              is24Hour: !this.format.match(/h|a/)
            }).then(({action, hour, minute}) => {
              if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({
                  date: new Date(year, month, day, hour, minute)
                });
                this.datePicked();
              }
            });
          }
        });
      } else {
        new Error('The specified mode is not supported');
      }
    }
  }

  render() {

    return (
      <TouchableHighlight
        style={[Style.dateTouch, this.props.style]}
        underlayColor={'transparent'}
        onPress={this.onPressDate}
      >
        <View style={Style.dateTouchBody}>
          <View style={[Style.dateInput, this.state.disabled && Style.disabled]}>
            <Text style={Style.dateText}>{this.getDateStr()}</Text>
          </View>
          <Image
            style={Style.dateIcon}
            source={require('./date_icon.png')}
          />
          {Platform.OS === 'ios' && <Modal
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {this.setModalVisible(false)}}
          >
            <TouchableHighlight
              style={Style.datePickerMask}
              underlayColor={'#00000077'}
              onPress={this.onPressCancel}
            >
              <TouchableHighlight
                underlayColor={'#fff'}
              >
                <Animated.View style={[Style.datePickerCon, {height: this.state.animatedHeight}]}>
                  <DatePickerIOS
                    date={this.state.date}
                    mode={this.mode}
                    minimumDate={this.props.minDate && this.getDate(this.props.minDate)}
                    maximumDate={this.props.maxDate && this.getDate(this.props.maxDate)}
                    onDateChange={(date) => this.setState({date: date})}
                    style={Style.datePicker}
                  />
                  <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={this.onPressCancel}
                    style={[Style.btnText, Style.btnCancel]}
                  >
                    <Text style={[Style.btnTextText, Style.btnTextCancel]}>取消</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={this.onPressConfirm}
                    style={[Style.btnText, Style.btnConfirm]}
                  >
                    <Text style={Style.btnTextText}>确定</Text>
                  </TouchableHighlight>
                </Animated.View>
              </TouchableHighlight>
            </TouchableHighlight>
          </Modal>}
        </View>
      </TouchableHighlight>
    );
  }
};

export default DatePicker;
