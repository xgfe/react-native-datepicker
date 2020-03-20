import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableHighlight,
  DatePickerAndroid,
  TimePickerAndroid,
  DatePickerIOS,
  Picker, 
  Platform,
  Animated,
  Keyboard
} from 'react-native';
import Style from './style';
import Moment from 'moment';

import {years} from '../../../app/lib/config'; 

const FORMATS = {
  'date': 'YYYY-MM-DD',
  'datetime': 'YYYY-MM-DD HH:mm',
  'time': 'HH:mm', 
  'year': 'YYYY'
};

const PickerItem = Picker.Item;

let date


const SUPPORTED_ORIENTATIONS = ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right'];

class DatePicker extends Component {
  constructor(props) {
    super(props);
    
    console.log ("picker_modal,js, constructor, props:", props)

    this.state = {
      date: this.props.year,
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      allowPointerEvents: true,
      index: null, 
      dateInstance: 0, 
      isEnabled: this.props.isEnabled,

      // selectedValue= {this.state.index ? this.state.index : this.getDateStr(this.props.yearIndex) }// to display currently selected year -> {this.props.yearIndex}  // @TODO: to set value based on min / max with this.state.index, however it does not update the selected date as there is no min/max date in Picker. 

    };

    this.getDate = this.getDate.bind(this);
    this.getDateStr = this.getDateStr.bind(this);
    this.datePicked = this.datePicked.bind(this);
    this.onPressDate = this.onPressDate.bind(this);
    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressConfirm = this.onPressConfirm.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onPressMask = this.onPressMask.bind(this);
    this.onDatePicked = this.onDatePicked.bind(this);
    this.onTimePicked = this.onTimePicked.bind(this);
    this.onDatetimePicked = this.onDatetimePicked.bind(this);
    this.onDatetimeTimePicked = this.onDatetimeTimePicked.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);

  }

  componentWillReceiveProps(nextProps) {

    console.log ("picker_modal,js, componentWillReceiveProps, nextProps:", nextProps)
    if (nextProps.date !== this.props.date) {
      this.setState({date: this.getDate(nextProps.date)});
    }

      if (nextProps.yearIndex !== this.props.yearIndex) {
      // this.setState({date: this.getDate(nextProps.date)});

      console.log('IN HERE!!!!! componentWillReceiveProps, nextProps.yearIndex: ', nextProps.yearIndex)
    }

  }

  setModalVisible(visible) {
    const {height, duration} = this.props;

    // slide animation
    if (visible) {
      this.setState({modalVisible: visible});
      return Animated.timing(
        this.state.animatedHeight,
        {
          toValue: height,
          duration: duration
        }
      ).start();
    } else {
      return Animated.timing(
        this.state.animatedHeight,
        {
          toValue: 0,
          duration: duration
        }
      ).start(() => {
        this.setState({modalVisible: visible});
      });
    }
  }

  onStartShouldSetResponder(e) {
    return true;
  }

  onMoveShouldSetResponder(e) {
    return true;
  }

  onPressMask() {
    if (typeof this.props.onPressMask === 'function') {
      this.props.onPressMask();
    } else {
      this.onPressCancel();
    }
  }

  onPressCancel() {
    this.setModalVisible(false);

    if (typeof this.props.onCloseModal === 'function') {
      this.props.onCloseModal();
    }
  }

  onPressConfirm() {
    this.datePicked();
    this.setModalVisible(false);

    if (typeof this.props.onCloseModal === 'function') {
      this.props.onCloseModal();
    }
  }

  // getDate(date = this.props.date) {
  //   const {mode, minDate, maxDate, format = FORMATS[mode]} = this.props;

  //   // date默认值
  //   if (!date) {
  //     let now = new Date();
  //     if (minDate) {
  //       let _minDate = this.getDate(minDate);

  //       if (now < _minDate) {
  //         return _minDate;
  //       }
  //     }

  //     if (maxDate) {
  //       let _maxDate = this.getDate(maxDate);

  //       if (now > _maxDate) {
  //         return _maxDate;
  //       }
  //     }

  //     return now;
  //   }

  //   if (date instanceof Date) {
  //     return date;
  //   }

  //   return Moment(date, format).toDate();
  // }

  componentDidUpdate(prevProps, prevState) {
    console.log ('picker_modal,js, componentDidUpdate(), props:', this.props)
  
    if (this.props.yearIndex!= prevProps.yearIndex ) {

      yearIndex =  this.props.year
      console.log ('picker_modal,js, componentDidUpdate(), this.props.year = yearIndex, yearIndex:', yearIndex)
    }

    if (prevProps.isEnabled != this.props.isEnabled) {
      this.setState(
        { isEnabled: this.props.isEnabled}
        )
    }
  }

  getDate(date = this.props.year ) {  // date = this.props.date,
    const {mode, minDate, maxDate, format = FORMATS[mode]} = this.props;
    let dateAfterTest = date; // setup as date and run test below
    
    // date默认值
    if (date) {
      let now = new Date();
      now =  now.getFullYear();

      if (minDate) {
        let _minDate = this.props.minDate;

        if (date < _minDate) {
          // return _minDate;

          dateAfterTest = _minDate
        }
      }

      if (maxDate) {
        let _maxDate = this.props.maxDate;

        if (date > _maxDate) {
          // return _maxDate;
          dateAfterTest = _maxDate;
        }
      }

      return dateAfterTest;
    }

    // if (date instanceof Date) {
    //   return date;
    // }

    return dateAfterTest;
  }

  
  getDateStr( date = this.props.year ) {
    const { mode, format = FORMATS[mode]} = this.props;
    console.log ('getDateStr(), this.props.yearIndex, ', this.props.yearIndex) 
    console.log ('getDateStr(), this.state.date, ', this.state.date) 

 
    let dateInstance = this.props.year < this.props.maxYear   // changed date to this.props.year for currently selected year//  = date instanceof Date
      ? this.props.year
      : this.props.maxYear



     let index =  years.findIndex(p => p.year == dateInstance)

    // if (typeof this.props.getDateStr === 'function') {
    //   return this.props.getDateStr(dateInstance);
    // }

    this.setState({
      index, 
      dateInstance,
  
    }, () => {
      console.log ('getDateStr(), this.state.index, ', this.state.index)
      console.log ('getDateStr(), this.state.index, ', this.state.dateInstance)
      // return this.state.dateInstance
    
    })

  


  
  }

  datePicked() {
    if (typeof this.props.onDateChange === 'function') {
      this.props.onDateChange(this.getDateStr(this.state.date), this.state.date) // Need to return the index number for Years array//  to display the selected year ->   ( this.props.yearIndex); //@TODO: to limit date min / max need pass to try this and fix it:  this.props.onDateChange( this.getDateStr(this.state.date));   
    }
  }

  getTitleElement() {
    const {date, placeholder, customStyles, allowFontScaling} = this.props;

    if (!date && placeholder) {
      return (
        <Text allowFontScaling={allowFontScaling} style={[Style.placeholderText, customStyles.placeholderText]}>
          {placeholder}
        </Text>
      );
    }
    return (
      <Text allowFontScaling={allowFontScaling} style={[Style.dateText, customStyles.dateText]}>
      {this.props.year} { /* // to display smaller of selected year or maxYear  {this.state.dateInstance ? this.state.dateInstance: this.getDateStr(this.props.year)  */}  { /* // -> to display the currently selected year:  {this.props.year} */}{/*  {this.getDateStr()}  // to get the max/min allowable date, however it does not update the picker, need to change the onSelectValue = this.state.index*/} 
      </Text>
    );
  }

  onDateChange(date) {
    console.log ('picker_modal.js, onDateChange(), date: ', date) 
    this.setState({
      allowPointerEvents: false,
      date: date
    });
    const timeoutId = setTimeout(() => {
      this.setState({
        allowPointerEvents: true
      });
      clearTimeout(timeoutId);
    }, 200);
  }

  onDatePicked({action, year, month, day}) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: new Date(year, month, day)
      });
      this.datePicked();
    } else {
      this.onPressCancel();
    }
  }

  onTimePicked({action, hour, minute}) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: Moment().hour(hour).minute(minute).toDate()
      });
      this.datePicked();
    } else {
      this.onPressCancel();
    }
  }

  onDatetimePicked({action, year, month, day}) {
    const {mode, androidMode, format = FORMATS[mode], is24Hour = !format.match(/h|a/)} = this.props;

    if (action !== DatePickerAndroid.dismissedAction) {
      let timeMoment = Moment(this.state.date);

      TimePickerAndroid.open({
        hour: timeMoment.hour(),
        minute: timeMoment.minutes(),
        is24Hour: is24Hour,
        mode: androidMode
      }).then(this.onDatetimeTimePicked.bind(this, year, month, day));
    } else {
      this.onPressCancel();
    }
  }

  onDatetimeTimePicked(year, month, day, {action, hour, minute}) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: new Date(year, month, day, hour, minute)
      });
      this.datePicked();
    } else {
      this.onPressCancel();
    }
  }


  onPressDate() {
    if (this.props.disabled) {
      return true;
    }

    Keyboard.dismiss();

    // reset state
    this.setState({
      date: this.getDate()
    });

    if (Platform.OS === 'ios') {
      this.setModalVisible(true);
    } else {

      const {mode, androidMode, format = FORMATS[mode], minDate, maxDate, is24Hour = !format.match(/h|a/)} = this.props;

      // 选日期
      if (mode === 'date') {
        DatePickerAndroid.open({
          date: this.state.date,
          minDate: minDate && this.getDate(minDate),
          maxDate: maxDate && this.getDate(maxDate),
          mode: androidMode
        }).then(this.onDatePicked);
      } else if (mode === 'time') {
        // 选时间

        let timeMoment = Moment(this.state.date);

        TimePickerAndroid.open({
          hour: timeMoment.hour(),
          minute: timeMoment.minutes(),
          is24Hour: is24Hour,
          mode: androidMode
        }).then(this.onTimePicked);
      } else if (mode === 'datetime') {
        // 选日期和时间

        DatePickerAndroid.open({
          date: this.state.date,
          minDate: minDate && this.getDate(minDate),
          maxDate: maxDate && this.getDate(maxDate),
          mode: androidMode
        }).then(this.onDatetimePicked);
      }
    }

    if (typeof this.props.onOpenModal === 'function') {
      this.props.onOpenModal();
    }
  }

  _renderIcon() {
    const {
      showIcon,
      iconSource,
      iconComponent,
      customStyles
    } = this.props;

    if (showIcon) {
      if (iconComponent) {
        return iconComponent;
      }
      return (
        <Image
          style={[Style.dateIcon, customStyles.dateIcon]}
          source={iconSource}
        />
      );
    }

    return null;
  }

  render() {
    const {
      mode,
      style,
      customStyles,
      disabled,
      minDate,
      maxDate,
      minuteInterval,
      timeZoneOffsetInMinutes,
      cancelBtnText,
      confirmBtnText,
      TouchableComponent,
      testID,
      cancelBtnTestID,
      confirmBtnTestID,
      allowFontScaling,
      locale
    } = this.props;

    const dateInputStyle = [
      Style.dateInput, customStyles.dateInput,
      disabled && Style.disabled,
      disabled && customStyles.disabled
    ];

      if (this.props.isEnabled) {
        return (


          <TouchableComponent
          style={[Style.dateTouch, style]}
          underlayColor={'transparent'}
          onPress={this.onPressDate}
          testID={testID}
        >
          <View style={[Style.dateTouchBody, customStyles.dateTouchBody]}>
            {
              !this.props.hideText ?
                <View style={dateInputStyle}>
                  {this.getTitleElement()}
                </View>
              :
                <View/>
            }
            {this._renderIcon()}
            {Platform.OS === 'ios' && <Modal
              transparent={true}
              animationType="none"
              visible={this.state.modalVisible}
              supportedOrientations={SUPPORTED_ORIENTATIONS}
              onRequestClose={() => {this.setModalVisible(false);}}
            >
              <View
                style={{flex: 1}}
              >
                <TouchableComponent
                  style={Style.datePickerMask}
                  activeOpacity={1}
                  underlayColor={'#00000077'} 
                  onPress={this.onPressMask}
                >
                  <TouchableComponent
                    underlayColor={'#fff'}
                    style={{flex: 1}} 
                  >
                    <Animated.View
                      style={[Style.datePickerCon, {height: this.state.animatedHeight}, customStyles.datePickerCon]}
                    >
            
                    <View pointerEvents={this.state.allowPointerEvents ? 'auto' : 'none'}>
                    <Picker
                              // date={this.state.date}
                              // mode={mode}
                              // minimumDate={minDate && this.getDate(minDate)}
                              // maximumDate={maxDate && this.getDate(maxDate)}
                              // onDateChange={this.onDateChange}
                              // minuteInterval={minuteInterval}
                              // timeZoneOffsetInMinutes={timeZoneOffsetInMinutes ? timeZoneOffsetInMinutes : null}
                          
                              style={[Style.datePicker, customStyles.datePicker]}
                              // locale={locale}
                              selectedValue= { this.props.yearIndex }// to display currently selected year -> {this.props.yearIndex}.  Tried to set to max year but did not work using:  this.state.index. also not able to use: this.state.index? this.getDateStr() : this.props.yearIndex // ISSUE:  to set value based on min / max -  however it does not update the selected date as there is no min/max date in Picker. 
                              onValueChange={(year) => this.props.onDateChange(year)}
                              enabled = {this.props.isEnabled}  // picker modal appears, but cannot select - don't like the interface, prefer to hide it as done above with check on view.
                              >
                              {Object.keys(years).map((year) => (
                              <PickerItem
                                key={year}
                                value={year}
                                label={years[year].year} 
                              />
                            ))}
                          </Picker>

                    </View>
             
                      <TouchableComponent
                        underlayColor={'transparent'}
                        onPress={this.onPressCancel}
                        style={[Style.btnText, Style.btnCancel, customStyles.btnCancel]}
                        testID={cancelBtnTestID}
                      >
                        <Text
                          allowFontScaling={allowFontScaling}
                          style={[Style.btnTextText, Style.btnTextCancel, customStyles.btnTextCancel]}
                        >
                          {cancelBtnText}
                        </Text>
                      </TouchableComponent>
                      <TouchableComponent
                        underlayColor={'transparent'}
                        onPress={this.onPressConfirm}
                        style={[Style.btnText, Style.btnConfirm, customStyles.btnConfirm]}
                        testID={confirmBtnTestID}
                      >
                        <Text allowFontScaling={allowFontScaling}
                              style={[Style.btnTextText, customStyles.btnTextConfirm]}
                        >
                          {confirmBtnText}
                        </Text>
                      </TouchableComponent>
                    </Animated.View>
                  </TouchableComponent>
                </TouchableComponent>
              </View>
            </Modal>}
          </View>
        </TouchableComponent>

        ) }  else  { 
          return <View></View>
          
        }

      } // END: render()
} // END: class DatePicker
 
DatePicker.defaultProps = {
  mode: 'date',
  androidMode: 'default',
  date: '',
  // component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
  height: 259,

  // slide animation duration time, default to 300ms, IOS only
  duration: 300,
  confirmBtnText: '确定',
  cancelBtnText: '取消',
  iconSource: require('./date_icon.png'),
  customStyles: {},

  // whether or not show the icon
  showIcon: false,  // changed to hide icon. not able to pass with props. 
  disabled: false,
  allowFontScaling: true,
  hideText: false,
  placeholder: '',
  TouchableComponent: TouchableHighlight,
  modalOnResponderTerminationRequest: e => true
};

DatePicker.propTypes = {
  mode: PropTypes.oneOf(['date', 'datetime', 'time']),
  androidMode: PropTypes.oneOf(['clock', 'calendar', 'spinner', 'default']),
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date), PropTypes.object]),
  format: PropTypes.string,
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  height: PropTypes.number,
  duration: PropTypes.number,
  confirmBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  iconSource: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  iconComponent: PropTypes.element,
  customStyles: PropTypes.object,
  showIcon: PropTypes.bool,
  disabled: PropTypes.bool,
  allowFontScaling: PropTypes.bool,
  onDateChange: PropTypes.func,
  onOpenModal: PropTypes.func,
  onCloseModal: PropTypes.func,
  onPressMask: PropTypes.func,
  placeholder: PropTypes.string,
  modalOnResponderTerminationRequest: PropTypes.func,
  is24Hour: PropTypes.bool,
  getDateStr: PropTypes.func,
  locale: PropTypes.string
};

export default DatePicker;
