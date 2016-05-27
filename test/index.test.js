import React from 'react';
import {
  Animated,
  Platform,
  TimePickerAndroid
} from 'react-native';
import {shallow} from 'enzyme';
import DatePicker from '../index';
import {expect} from 'chai';
import sinon from 'sinon';

// hack require for require image
var m = require('module');
var originalLoader = m._load;

m._load = function hookedLoader(request, parent, isMain) {
  var file = m._resolveFilename(request, parent);
  if (file.match(/.jpeg|.jpg|.png$/)) {
    return {uri: file};
  }
  return originalLoader(request, parent, isMain);
};

describe('DatePicker', () => {

  it('Create DatePicker Component', () => {
    const wrapper = shallow(<DatePicker />);
    const datePicker = wrapper.instance();

    datePicker.render();

    expect(datePicker).to.be.instanceOf(DatePicker);
    expect(wrapper.find('TouchableHighlight').length).to.above(0);
    expect(wrapper.state('modalVisible')).to.equal(false);
    expect(wrapper.state('animatedHeight')).to.deep.equal(new Animated.Value(0));
  });

  it('Function: getDate()', () => {
    const wrapper = shallow(<DatePicker />);
    const datePicker = wrapper.instance();

    let current = new Date();
    expect(datePicker.getDate(current)).to.equal(current);
    expect(datePicker.getDate('2016-05-16')).to.be.instanceOf(Date);
  });

  it('Function: getDateStr()', () => {
    const wrapper = shallow(<DatePicker />);
    const datePicker = wrapper.instance();

    expect(datePicker.getDateStr(new Date('2016-05-04'))).to.equal('2016-05-04');
  });
});

describe('DatePicker: ios', () => {

  it('Create DatePicker Component', () => {
    Platform.OS= 'ios';
    const wrapper = shallow(<DatePicker />);
    const datePicker = wrapper.instance();

    datePicker.render();

    expect(datePicker).to.be.instanceOf(DatePicker);
    expect(wrapper.find('Modal').length).to.equal(1);
  });

  it('Function: setModalVisible(true)', () => {
    Platform.OS= 'ios';
    const wrapper = shallow(<DatePicker />);
    const datePicker = wrapper.instance();

    datePicker.setModalVisible(true);

    expect(wrapper.state('modalVisible')).to.equal(true);
    expect(wrapper.state('animatedHeight')._animation._toValue).to.above(200);
  });

  it('Function: setModalVisible(false)', () => {
    Platform.OS= 'ios';
    const wrapper = shallow(<DatePicker />);
    const datePicker = wrapper.instance();

    datePicker.setModalVisible(false);

    expect(wrapper.state('modalVisible')).to.equal(false);
    expect(wrapper.state('animatedHeight')).to.deep.equal(new Animated.Value(0));
  });

  it('Function: onPressDate() -> onPressCancel()', () => {
    Platform.OS= 'ios';
    const wrapper = shallow(<DatePicker />);
    const datePicker = wrapper.instance();

    datePicker.onPressDate();

    expect(wrapper.state('modalVisible')).to.equal(true);
    expect(wrapper.state('animatedHeight')._animation._toValue).to.above(200);

    datePicker.onPressCancel();

    expect(wrapper.state('modalVisible')).to.equal(false);
    expect(wrapper.state('animatedHeight')).to.deep.equal(new Animated.Value(0));
  });

  it('Function: onPressDate() -> onPressConfirm()', () => {
    Platform.OS= 'ios';
    const onDateChange = sinon.spy();
    const wrapper = shallow(<DatePicker onDateChange={onDateChange} />);
    const datePicker = wrapper.instance();

    datePicker.onPressDate();

    expect(wrapper.state('modalVisible')).to.equal(true);
    expect(wrapper.state('animatedHeight')._animation._toValue).to.above(200);

    datePicker.onPressConfirm();

    expect(wrapper.state('modalVisible')).to.equal(false);
    expect(wrapper.state('animatedHeight')).to.deep.equal(new Animated.Value(0));
    expect(onDateChange.callCount).to.equal(1);
  });
});

describe('DatePicker: android', () => {

  it('Create DatePicker Component', () => {
    Platform.OS= 'android';
    const wrapper = shallow(<DatePicker />);
    const datePicker = wrapper.instance();

    datePicker.render();

    expect(datePicker).to.be.instanceOf(DatePicker);
    expect(wrapper.find('TouchableHighlight').length).to.equal(1);
  });

  it('Function: onPressDate() -> onPressConfirm()', () => {
    Platform.OS= 'android';
    const onDateChange = sinon.spy();
    const wrapper = shallow(<DatePicker onDateChange={onDateChange} />);
    const datePicker = wrapper.instance();

    datePicker.onPressDate();

    datePicker.onPressConfirm();

    expect(onDateChange.callCount).to.equal(1);
  });

  it('mode: time Function: onPressDate() -> onPressConfirm()', () => {
    Platform.OS= 'android';
    const onDateChange = sinon.spy();
    const wrapper = shallow(<DatePicker mode="time" onDateChange={onDateChange} />);
    const datePicker = wrapper.instance();

    datePicker.onPressDate();

    // datePicker.onPressConfirm();
    //
    // expect(onDateChange.callCount).to.equal(1);
  });

  it('mode: datetime Function: onPressDate() -> onPressConfirm()', () => {
    Platform.OS= 'android';
    const onDateChange = sinon.spy();
    const wrapper = shallow(<DatePicker mode="datetime" onDateChange={onDateChange} />);
    const datePicker = wrapper.instance();

    datePicker.onPressDate();

    datePicker.onPressConfirm();

    expect(onDateChange.callCount).to.equal(1);
  });
});
