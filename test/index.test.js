import React from 'react';
import {
  Animated,
  Platform
} from 'react-native';
import {shallow} from 'enzyme';
import Moment from 'moment';
import DatePicker from '../index';
import {expect} from 'chai';
import sinon from 'sinon';

// hack require for require image
var m = require('module');
var originalLoader = m._load;

m._load = function (request, parent, isMain) {
  var file = m._resolveFilename(request, parent);
  if (file.match(/.jpeg|.jpg|.png$/)) {
    return {uri: file};
  }
  return originalLoader(request, parent, isMain);
};

describe('DatePicker:', () => {

  it('initialize', () => {
    const wrapper = shallow(<DatePicker />);
    const datePicker = wrapper.instance();

    expect(datePicker.mode).to.equal('date');
    expect(datePicker.format).to.equal('YYYY-MM-DD');
    expect(datePicker.duration).to.equal(300);
    expect(datePicker.height).to.above(200);
    expect(datePicker.confirmBtnText).to.equal('确定');
    expect(datePicker.cancelBtnText).to.equal('取消');
    expect(datePicker.iconSource).to.deep.equal(require('../date_icon.png'));
    expect(datePicker.customStyles).to.deep.equal({});
    expect(datePicker.showIcon).to.equal(true);
    expect(wrapper.find('Image').length).to.equal(1);

    expect(wrapper.state('date')).to.be.a('date');
    expect(wrapper.state('disabled')).to.equal(undefined);
    expect(wrapper.state('modalVisible')).to.equal(false);
    expect(wrapper.state('animatedHeight')).to.deep.equal(new Animated.Value(0));

    const wrapper1 = shallow(
      <DatePicker
        date="2016-05-11"
        format="YYYY/MM/DD"
        mode="datetime"
        duration={400}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        iconSource={{}}
        customStyles={{testStyle: 123}}
        disabled={true}
        showIcon={false}
      />
    );
    const datePicker1 = wrapper1.instance();


    expect(datePicker1.mode).to.equal('datetime');
    expect(datePicker1.format).to.equal('YYYY/MM/DD');
    expect(datePicker1.duration).to.equal(400);
    expect(datePicker1.confirmBtnText).to.equal('Confirm');
    expect(datePicker1.cancelBtnText).to.equal('Cancel');
    expect(datePicker1.iconSource).to.deep.equal({});
    expect(datePicker1.customStyles).to.deep.equal({testStyle: 123});
    expect(datePicker1.showIcon).to.equal(false);
    expect(wrapper1.find('Image').length).to.equal(0);

    expect(wrapper1.state('date')).to.deep.equal(Moment('2016-05-11', 'YYYY-MM-DD').toDate());
    expect(wrapper1.state('disabled')).to.equal(true);
  });

  it('setModalVisible', () => {
    const wrapper = shallow(<DatePicker />);
    const datePicker = wrapper.instance();

    datePicker.setModalVisible(true);

    expect(wrapper.state('modalVisible')).to.equal(true);
    expect(wrapper.state('animatedHeight')._animation._toValue).to.above(200);

    datePicker.setModalVisible(false);

    expect(wrapper.state('modalVisible')).to.equal(false);
    expect(wrapper.state('animatedHeight')).to.deep.equal(new Animated.Value(0));
  });

  it('onPressCancel', () => {
    const setModalVisible = sinon.spy();
    const wrapper = shallow(<DatePicker />);
    const datePicker = wrapper.instance();
    datePicker.setModalVisible = setModalVisible;

    datePicker.onPressCancel();

    expect(setModalVisible.calledWith(false)).to.equal(true);
  });

  it('onPressConfirm', () => {
    const setModalVisible = sinon.spy();
    const datePicked = sinon.spy();
    const wrapper = shallow(<DatePicker />);
    const datePicker = wrapper.instance();
    datePicker.setModalVisible = setModalVisible;
    datePicker.datePicked = datePicked;

    datePicker.onPressConfirm();

    expect(setModalVisible.calledWith(false)).to.equal(true);
    expect(datePicked.callCount).to.equal(1);
  });

  it('getDate', () => {
    const wrapper = shallow(<DatePicker date="2016-06-04"/>);
    const datePicker = wrapper.instance();

    expect(datePicker.getDate()).to.deep.equal(Moment('2016-06-04', 'YYYY-MM-DD').toDate());
    expect(datePicker.getDate('2016-06-06')).to.deep.equal(Moment('2016-06-06', 'YYYY-MM-DD').toDate());

    const date = new Date();
    expect(datePicker.getDate(date)).to.equal(date);
  });

  it('getDateStr', () => {
    const wrapper = shallow(<DatePicker date="2016-06-01"/>);
    const datePicker = wrapper.instance();

    expect(datePicker.getDateStr()).to.equal('2016-06-01');
    expect(datePicker.getDateStr(new Date('2016-06-02'))).to.equal('2016-06-02');
    expect(datePicker.getDateStr('2016-06-03')).to.equal('2016-06-03');

    datePicker.format = 'YYYY/MM/DD';
    expect(datePicker.getDateStr(new Date('2016-06-02'))).to.equal('2016/06/02');
  });

  it('datePicked', () => {
    const onDateChange = sinon.spy();
    const wrapper = shallow(<DatePicker onDateChange={onDateChange}/>);
    const datePicker = wrapper.instance();
    const date = new Date('2016-06-06');
    wrapper.setState({date});

    datePicker.datePicked();

    expect(onDateChange.calledWith('2016-06-06', date)).to.equal(true);
  });

  it('onDatePicked', () => {
    const onDateChange = sinon.spy();
    const wrapper = shallow(<DatePicker onDateChange={onDateChange}/>);
    const datePicker = wrapper.instance();

    datePicker.onDatePicked({action: 'dismissedAction', year: 2016, month: 5, day: 12});
    datePicker.onDatePicked({action: '', year: 2016, month: 5, day: 12});

    expect(wrapper.state('date')).to.deep.equal(new Date(2016, 5, 12));
    expect(onDateChange.callCount).to.equal(1);
  });

  it('onTimePicked', () => {
    const onDateChange = sinon.spy();
    const wrapper = shallow(<DatePicker onDateChange={onDateChange}/>);
    const datePicker = wrapper.instance();

    datePicker.onTimePicked({action: 'dismissedAction', hour: 12, minute: 10});
    datePicker.onTimePicked({action: '', hour: 12, minute: 10});

    expect(wrapper.state('date').getHours()).to.equal(12);
    expect(wrapper.state('date').getMinutes()).to.equal(10);
    expect(onDateChange.callCount).to.equal(1);
  });

  it('onDatetimeTimePicked', () => {
    const onDateChange = sinon.spy();
    const wrapper = shallow(<DatePicker onDateChange={onDateChange}/>);
    const datePicker = wrapper.instance();

    datePicker.onDatetimePicked({action: 'dismissedAction', year: 2016, month: 12, day: 12});
    datePicker.onDatetimePicked({action: '', year: 2016, month: 12, day: 12});
    datePicker.onDatetimeTimePicked(2016, 6, 1, {action: 'dismissedAction', hour: 12, minute: 10});
    datePicker.onDatetimeTimePicked(2016, 6, 1, {action: '', hour: 12, minute: 10});

    expect(wrapper.state('date').getFullYear()).to.equal(2016);
    expect(wrapper.state('date').getMonth()).to.equal(6);
    expect(wrapper.state('date').getDate()).to.equal(1);
    expect(wrapper.state('date').getHours()).to.equal(12);
    expect(wrapper.state('date').getMinutes()).to.equal(10);
    expect(onDateChange.callCount).to.equal(1);
  });

  it('onPressDate', () => {
    Platform.OS = 'ios';
    const setModalVisible = sinon.spy();
    const wrapper = shallow(<DatePicker date="2016-05-06" minDate="2016-04-01" maxDate="2016-06-01"/>);
    const datePicker = wrapper.instance();
    datePicker.setModalVisible = setModalVisible;

    wrapper.setState({disabled: true});
    datePicker.onPressDate();

    expect(setModalVisible.callCount).to.equal(0);

    wrapper.setState({disabled: false});
    datePicker.onPressDate();
    expect(wrapper.state('date')).to.deep.equal(datePicker.getDate());
    expect(setModalVisible.callCount).to.equal(1);

    Platform.OS = 'android';
    expect(datePicker.onPressDate).to.not.throw(Error);

    datePicker.mode = 'datetime';
    expect(datePicker.onPressDate).to.not.throw(Error);

    datePicker.mode = 'time';
    expect(datePicker.onPressDate).to.not.throw(Error);

    datePicker.mode = 'tttt';
    expect(datePicker.onPressDate).to.throw(Error);
  });
});


describe('Coverage', () => {

  it('Event: onRequestClose', () => {
    Platform.OS = 'ios';
    const setModalVisible = sinon.spy();
    const wrapper = shallow(<DatePicker />);
    const datePicker = wrapper.instance();
    datePicker.setModalVisible = setModalVisible;

    wrapper.find('Modal').simulate('requestClose');

    expect(setModalVisible.callCount).to.equal(1);
  });

  it('Event: onDateChange', () => {
    Platform.OS = 'ios';
    const wrapper = shallow(<DatePicker />);

    wrapper.find('DatePickerIOS').simulate('dateChange');
  });
});
