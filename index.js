import React, {PropTypes, Component} from 'react';
import {
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
  constructor(props) {
    super(props);

    this.state = {
      date: this.getDate(),
      modalVisible: false,
      disabled: this.props.disabled,
      animatedHeight: new Animated.Value(0)
    };
  }

  componentWillMount() {
    // ignore the warning of Failed propType for date of DatePickerIOS, will remove after being fixed by official
    console.ignoredYellowBox = [
      'Warning: Failed propType'
      // Other warnings you don't want like 'jsSchedulingOverhead',
    ];
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});

    // slide animation
    if (visible) {
      Animated.timing(
        this.state.animatedHeight,
        {
          toValue: this.props.height,
          duration: this.props.duration
        }
      ).start();
    } else {
      this.setState({
        animatedHeight: new Animated.Value(0)
      });
    }
  };

  onStartShouldSetResponder(e) {
    return true;
  }

  onMoveShouldSetResponder(e) {
    return true;
  }

  onPressCancel = () => {
    this.setModalVisible(false);
  };

  onPressConfirm = () => {
    this.datePicked();
    this.setModalVisible(false);
  };

  getDate(date = this.props.date) {
    // date默认值
    if (!date) {
      let now = new Date();
      if (this.props.minDate) {
        let minDate = this.getDate(this.props.minDate);

        if (now < minDate) {
          return minDate;
        }
      }

      if (this.props.maxDate) {
        let maxDate = this.getDate(this.props.maxDate);

        if (now > maxDate) {
          return maxDate;
        }
      }

      return now;
    }

    if (date instanceof Date) {
      return date;
    }

    return Moment(date, this.format).toDate();
  }

  getDateStr(date = this.props.date) {
    if (date instanceof Date) {
      return Moment(date).format(this.format);
    } else {
      return Moment(this.getDate(date)).format(this.format);
    }
  }

  datePicked = () => {
    if (typeof this.props.onDateChange === 'function') {
      this.props.onDateChange(this.getDateStr(this.state.date), this.state.date);
    }
  };

  getTitleElement() {
    const {date, placeholder, styles} = this.props;
    if (!date && placeholder) {
      return (<Text style={[styles.placeholderText, this.props.customStyles.placeholderText]}>{placeholder}</Text>);
    }
    return (<Text style={[styles.dateText, this.props.customStyles.dateText]}>{this.getDateStr()}</Text>);
  }

  onDatePicked = ({action, year, month, day}) => {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: new Date(year, month, day)
      });
      this.datePicked();
    }
  };

  onTimePicked = ({action, hour, minute}) => {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: Moment().hour(hour).minute(minute).toDate()
      });
      this.datePicked();
    }
  };

  onDatetimePicked = ({action, year, month, day}) => {
    if (action !== DatePickerAndroid.dismissedAction) {
      const timeMoment = Moment(this.state.date);

      TimePickerAndroid.open({
        hour: timeMoment.hour(),
        minute: timeMoment.minutes(),
        is24Hour: !this.format.match(/h|a/)
      }).then(this.onDatetimeTimePicked.bind(this, year, month, day));
    }
  };

  onDatetimeTimePicked = (year, month, day, {action, hour, minute}) => {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: new Date(year, month, day, hour, minute)
      });
      this.datePicked();
    }
  };

  onPressDate = () => {
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
      if (this.props.mode === 'date') {
        DatePickerAndroid.open({
          date: this.state.date,
          minDate: this.props.minDate && this.getDate(this.props.minDate),
          maxDate: this.props.maxDate && this.getDate(this.props.maxDate)
        }).then(this.onDatePicked);
      } else if (this.props.mode === 'time') {
        // 选时间

        const timeMoment = Moment(this.state.date);

        TimePickerAndroid.open({
          hour: timeMoment.hour(),
          minute: timeMoment.minutes(),
          is24Hour: !this.format.match(/h|a/)
        }).then(this.onTimePicked);
      } else if (this.props.mode === 'datetime') {
        // 选日期和时间

        DatePickerAndroid.open({
          date: this.state.date,
          minDate: this.props.minDate && this.getDate(this.props.minDate),
          maxDate: this.props.maxDate && this.getDate(this.props.maxDate)
        }).then(this.onDatetimePicked);
      } else {
        throw new Error('The specified mode is not supported');
      }
    }
  };

  setDateState = (newDate) => {
    this.setState({date: newDate})
  };

  get format() {
    return this.props.format || FORMATS[this.props.mode];
  }

  render() {
    const {
      customStyles, 
      styles, 
      style, 
      showIcon, 
      iconSource, 
      mode, 
      minDate, 
      maxDate, 
      minuteInterval, 
      timeZoneOffsetInMinutes,
      confirmBtnText,
      cancelBtnText
    } = this.props;

    const {date, disabled, modalVisible, animatedHeight} = this.state;

    const dateInputStyle = [
      styles.dateInput, customStyles.dateInput,
      disabled && styles.disabled,
      disabled && customStyles.disabled
    ];

    return (
      <TouchableHighlight
        style={[styles.dateTouch, style]}
        underlayColor={'transparent'}
        onPress={this.onPressDate}
      >
        <View style={[styles.dateTouchBody, customStyles.dateTouchBody]}>
          <View style={dateInputStyle}>
            {this.getTitleElement()}
          </View>
          {showIcon && <Image
            style={[styles.dateIcon, customStyles.dateIcon]}
            source={iconSource}
          />}
          {Platform.OS === 'ios' && <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {this.setModalVisible(false);}}
          >
            <View
              style={{flex: 1}}
            >
              <TouchableHighlight
                style={styles.datePickerMask}
                activeOpacity={1}
                underlayColor={'#00000077'}
                onPress={this.onPressCancel}
              >
                <TouchableHighlight
                  underlayColor={'#fff'}
                  style={{flex: 1}}
                >
                  <Animated.View
                    style={[styles.datePickerCon, {height: animatedHeight}, customStyles.datePickerCon]}
                  >
                    <DatePickerIOS
                      date={date}
                      mode={mode}
                      minimumDate={minDate && this.getDate(minDate)}
                      maximumDate={maxDate && this.getDate(maxDate)}
                      onDateChange={this.setDateState}
                      minuteInterval={minuteInterval}
                      timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
                      style={[styles.datePicker, customStyles.datePicker]}
                    />
                    <TouchableHighlight
                      underlayColor={'transparent'}
                      onPress={this.onPressCancel}
                      style={[styles.btnText, styles.btnCancel, customStyles.btnCancel]}
                    >
                      <Text
                        style={[styles.btnTextText, styles.btnTextCancel, customStyles.btnTextCancel]}
                      >
                        {cancelBtnText}
                      </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      underlayColor={'transparent'}
                      onPress={this.onPressConfirm}
                      style={[styles.btnText, styles.btnConfirm, customStyles.btnConfirm]}
                    >
                      <Text style={[styles.btnTextText, customStyles.btnTextConfirm]}>{confirmBtnText}</Text>
                    </TouchableHighlight>
                  </Animated.View>
                </TouchableHighlight>
              </TouchableHighlight>
            </View>
          </Modal>}
        </View>
      </TouchableHighlight>
    );
  }
}

DatePicker.defaultProps = {
  mode: 'date',
  date: '',
  // component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
  height: 259,

  // slide animation duration time, default to 300ms, IOS only
  duration: 300,
  confirmBtnText: '确定',
  cancelBtnText: '取消',
  iconSource: require('./date_icon.png'),
  styles: Style,
  customStyles: {},

  // whether or not show the icon
  showIcon: true,
  disabled: false,
  placeholder: '',
  modalOnResponderTerminationRequest: e => true
};

DatePicker.propTypes = {
  mode: PropTypes.oneOf(['date', 'datetime', 'time']),
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  height: PropTypes.number,
  duration: PropTypes.number,
  confirmBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  iconSource: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  styles: PropTypes.object,
  customStyles: PropTypes.object,
  showIcon: PropTypes.bool,
  disabled: PropTypes.bool,
  onDateChange: PropTypes.func,
  placeholder: PropTypes.string,
  modalOnResponderTerminationRequest: PropTypes.func
};

export default DatePicker;
