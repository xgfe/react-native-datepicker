import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableHighlight,
  Platform,
  Animated,
  Keyboard,
  Picker,
} from 'react-native';
import Style from './style';

export default class RangePicker extends Component{
  constructor(props){
    super(props);
    
    const min = parseInt(props.min);
    const max = parseInt(props.max);
    const interval = (max - min) + 1;

    this.state = {
      animatedHeight: new Animated.Value(0),
      selected : props.rangeArray ? props.rangeArray[0] : props.min,
      modalVisible: false,
      allowPointerEvents: true,
      rangeArray : props.rangeArray ? props.rangeArray : Array.from(new Array(interval),(val,index)=>index+min),
      showContent: false,
    }
    
  }
  setModalVisible = (visible) => {
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
  onPicked = () => {
    if(typeof this.props.onValueChange === 'function'){
      this.props.onValueChange(this.state.selected);
    }
  }
  onPressCancel = () => {
    this.setModalVisible(false);

    if (typeof this.props.onCloseModal === 'function') {
      this.props.onCloseModal();
    }
  }
  onPressMask = () => {
    if (typeof this.props.onPressMask === 'function') {
      this.props.onPressMask();
    } else {
      this.onPressCancel();
    }
  }
  onPressConfirm = () => {
    this.onPicked();
    this.setState({showContent:true});
    this.setModalVisible(false);
    
    if (typeof this.props.onCloseModal === 'function') {
      this.props.onCloseModal();
    }
  }
  
  getTitleElement() {
    const { placeholder, customStyles, allowFontScaling} = this.props;
    const showContent = this.state.showContent;
    if (!showContent && placeholder) {
      return (
        <Text allowFontScaling={allowFontScaling} style={[Style.placeholderText, customStyles.placeholderText]}>
          {placeholder}
        </Text>
      );
    }
    return (
      <Text allowFontScaling={allowFontScaling} style={[Style.dateText, customStyles.contentText]}>
        {this.state.selected}
      </Text>
    );
  }
  render(){
    const {
      style,
      customStyles,
      disabled,
      TouchableComponent,
      cancelBtnText,
      confirmBtnText,
      cancelBtnTestID,
      confirmBtnTestID,
      allowFontScaling,
    } = this.props;
    
    const contentInputStyle = [
      Style.dateInput, customStyles.contentInput,
      disabled && Style.disabled,
      disabled && customStyles.disabled
    ];
    return(
     
        <TouchableComponent
          onPress={() => {this.setModalVisible(true);}}
          underlayColor={'transparent'}
          style={[ Style.dateTouch, style ]}>
        
        
        <View style={[ Style.dateTouchBody, customStyles.dateTouchBody ]}>
          {
            !this.props.hideText ?
              <View style={contentInputStyle}>
                {this.getTitleElement()}
              </View>
            :
              <View/>
          }
          <Modal
            animationType="none"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {this.setModalVisible(false);}}
          >
          <View style={{flex: 1}}>
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
              style={[Style.datePickerCon, {height: this.state.animatedHeight}]}
            >
          <View pointerEvents={this.state.allowPointerEvents ? 'auto' : 'none'}>
            <Picker
              style={[Style.datePicker, customStyles.datePicker]}
              selectedValue = { this.state.selected }
              onValueChange = { (itemValue, itemIndex) => {this.setState({selected: itemValue});} }>
              {this.state.rangeArray.map((value,index)=>{
                return(<Picker.Item key={index} label={String(value)} value={value}/>)})}
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
        </Modal>
        </View>
        
        </TouchableComponent>
    )
  }
}


RangePicker.defaultProps = {
  selected: '',
  // component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
  height: 259,

  // slide animation duration time, default to 300ms, IOS only
  duration: 300,
  confirmBtnText: '确定',
  cancelBtnText: '取消',
  customStyles: {},

  // whether or not show the icon
  disabled: false,
  allowFontScaling: true,
  hideText: false,
  placeholder: '',
  TouchableComponent: TouchableHighlight,
  modalOnResponderTerminationRequest: e => true
};