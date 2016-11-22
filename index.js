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
    const {height, duration} = this.props;

    this.setState({modalVisible: visible});

    // slide animation
    if (visible) {
      Animated.timing(
        this.state.animatedHeight,
        {
          toValue: height,
          duration: duration
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
    const {minDate, maxDate} = this.props;
    // date默认值
    if (!date) {
      const now = new Date();

      if (minDate) {
        const cleanMinDate = this.getDate(minDate);

        if (now < cleanMinDate) {
          return cleanMinDate;
        }
      }

      if (maxDate) {
        const cleanMaxDate = this.getDate(maxDate);

        if (now > cleanMaxDate) {
          return cleanMaxDate;
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
    this.props.onDateChange(this.getDateStr(this.state.date));
  };

  getTitleElement() {
    const {date, placeholder, styles, customStyles} = this.props;
    if (!date && placeholder) {
      return (<Text style={[styles.placeholderText, customStyles.placeholderText]}>{placeholder}</Text>);
    }
    return (<Text style={[styles.dateText, customStyles.dateText]}>{this.getDateStr()}</Text>);
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
    const {mode, minDate, maxDate} = this.props;
    const {disabled, date} = this.state;

    if (disabled) {
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
      if (mode === 'date') {
        DatePickerAndroid.open({
          date,
          minDate: minDate && this.getDate(minDate),
          maxDate: maxDate && this.getDate(maxDate)
        }).then(this.onDatePicked);
      } else if (mode === 'time') {
        // 选时间

        const timeMoment = Moment(date);

        TimePickerAndroid.open({
          hour: timeMoment.hour(),
          minute: timeMoment.minutes(),
          is24Hour: !this.format.match(/h|a/)
        }).then(this.onTimePicked);
      } else if (mode === 'datetime') {
        // 选日期和时间

        DatePickerAndroid.open({
          date,
          minDate: minDate && this.getDate(minDate),
          maxDate: maxDate && this.getDate(maxDate)
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
  modalOnResponderTerminationRequest: e => true,
  onDateChange: () => {}
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
  styles: PropTypes.shape({
    btnCancel: PropTypes.number,
    btnConfirm: PropTypes.number,
    btnText: PropTypes.number,
    btnTextCancel: PropTypes.number,
    btnTextText: PropTypes.number,
    dateIcon: PropTypes.number,
    dateInput: PropTypes.number,
    datePicker: PropTypes.number,
    datePickerCon: PropTypes.number,
    datePickerMask: PropTypes.number,
    dateText: PropTypes.number,
    dateTouch: PropTypes.number,
    dateTouchBody: PropTypes.number,
    disabled: PropTypes.number,
    placeholderText: PropTypes.number
  }),
  customStyles: PropTypes.object,
  showIcon: PropTypes.bool,
  disabled: PropTypes.bool,
  onDateChange: PropTypes.func,
  placeholder: PropTypes.string,
  modalOnResponderTerminationRequest: PropTypes.func
};

export default DatePicker;
