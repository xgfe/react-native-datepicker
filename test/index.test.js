import React, {Component} from 'react';
import {
  Animated,
  Platform,
  Image,
  Text,
  View
} from 'react-native';
import {shallow, mount} from 'enzyme';
import Moment from 'moment';
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

/*---------------- mock DOM ----------------*/
import {jsdom} from 'jsdom';
var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

global.ErrorUtils = {
  setGlobalHandler: () => {}
};

var DatePicker = require('../index').default;

describe('DatePicker:', () => {

  it('initialize', () => {

    const wrapper = mount(<DatePicker />);
    const datePicker = wrapper.instance();

    expect(wrapper.prop('mode')).to.equal('date');
    expect(wrapper.prop('duration')).to.equal(300);
    expect(wrapper.prop('height')).to.above(200);
    expect(wrapper.prop('confirmBtnText')).to.equal('确定');
    expect(wrapper.prop('cancelBtnText')).to.equal('取消');
    expect(wrapper.prop('iconSource')).to.deep.equal(require('../date_icon.png'));
    expect(wrapper.prop('customStyles')).to.deep.equal({});
    expect(wrapper.prop('showIcon')).to.equal(true);
    expect(wrapper.prop('disabled')).to.equal(false);

    expect(wrapper.state('date')).to.be.a('date');
    expect(wrapper.state('modalVisible')).to.equal(false);
    expect(wrapper.state('animatedHeight')).to.deep.equal(new Animated.Value(0));

    const wrapper1 = mount(
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

    expect(wrapper1.prop('mode')).to.equal('datetime');
    expect(wrapper1.prop('format')).to.equal('YYYY/MM/DD');
    expect(wrapper1.prop('duration')).to.equal(400);
    expect(wrapper1.prop('confirmBtnText')).to.equal('Confirm');
    expect(wrapper1.prop('cancelBtnText')).to.equal('Cancel');
    expect(wrapper1.prop('iconSource')).to.deep.equal({});
    expect(wrapper1.prop('customStyles')).to.deep.equal({testStyle: 123});
    expect(wrapper1.prop('showIcon')).to.equal(false);
    expect(wrapper1.prop('disabled')).to.equal(true);

    expect(wrapper1.state('date')).to.deep.equal(Moment('2016-05-11', 'YYYY-MM-DD').toDate());

    // find not work with mount, and defaultProps not work with shallow...
    const wrapper2 = shallow(<DatePicker date={new Date('2016/09/09')}/>);
    expect(wrapper2.find('Image')).to.have.length(1);
    expect(wrapper2.instance().getDateStr()).to.equal('2016-09-09');

    const wrapper3 = shallow(<DatePicker showIcon={false} date={{test: 123}}/>);
    expect(wrapper3.find('Image')).to.have.length(0);
    expect(wrapper3.instance().getDateStr()).to.equal('Invalid date');
  });

  it('default selected Date', () => {
    var dateStr = null;
    const wrapper = shallow(<DatePicker date="" onDateChange={(date) => {
      dateStr = date
    }}/>);
    const datePicker = wrapper.instance();

    datePicker.onPressConfirm();

    expect(dateStr).to.equal(Moment().format('YYYY-MM-DD'));
  });

  it('default selected Date with minDate and maxDate', () => {
    var dateStr = null;
    var dateStrMax = null;
    var dateStrNormal = null

    const wrapper = shallow(<DatePicker date="" minDate="3000-09-09" onDateChange={(date) => {
      dateStr = date
    }}/>);
    const datePicker = wrapper.instance();

    datePicker.onPressConfirm();

    expect(dateStr).to.equal('3000-09-09');


    const wrapperMax = shallow(<DatePicker date="" maxDate="2016-07-07" onDateChange={(date) => {
      dateStrMax = date
    }}/>);
    const datePickerMax = wrapperMax.instance();

    datePickerMax.onPressConfirm();

    expect(dateStrMax).to.equal('2016-07-07');


    const wrapperNormal = shallow(<DatePicker date="" minDate="2016-07-07" maxDate="3000-09-09" onDateChange={(date) => {
      dateStrNormal = date
    }}/>);
    const datePickerNormal = wrapperNormal.instance();

    datePickerNormal.onPressConfirm();

    expect(dateStrNormal).to.equal(Moment().format('YYYY-MM-DD'));
  });

  it('setModalVisible', () => {
    const wrapper = shallow(<DatePicker />);
    const datePicker = wrapper.instance();

    new Promise(function(resolve, reject) {
      datePicker.setModalVisible(true);
    }).then((result) => {
      expect(wrapper.state('modalVisible')).to.equal(true);
      expect(wrapper.state('animatedHeight')._animation._toValue).to.above(200);
    })

    new Promise(function(resolve, reject) {
      datePicker.setModalVisible(false);
    }).then((result) => {
      expect(wrapper.state('modalVisible')).to.equal(false);
      expect(wrapper.state('animatedHeight')).to.deep.equal(new Animated.Value(0));
    });
  });

  it('onPressCancel', () => {
    const setModalVisible = sinon.spy();
    const onCloseModal = sinon.spy();
    const wrapper = shallow(<DatePicker onCloseModal={onCloseModal}/>);
    const datePicker = wrapper.instance();
    datePicker.setModalVisible = setModalVisible;

    datePicker.onPressCancel();

    expect(setModalVisible.calledWith(false)).to.equal(true);
    expect(onCloseModal.callCount).to.equal(1);
  });

  it('onPressConfirm', () => {
    const setModalVisible = sinon.spy();
    const datePicked = sinon.spy();
    const onCloseModal = sinon.spy();
    const wrapper = shallow(<DatePicker onCloseModal={onCloseModal}/>);
    const datePicker = wrapper.instance();
    datePicker.setModalVisible = setModalVisible;
    datePicker.datePicked = datePicked;

    datePicker.onPressConfirm();

    expect(setModalVisible.calledWith(false)).to.equal(true);
    expect(datePicked.callCount).to.equal(1);
    expect(onCloseModal.callCount).to.equal(1);
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

    wrapper.setProps({format: 'YYYY/MM/DD'});
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
    const onOpenModal = sinon.spy();
    const wrapper = shallow(
      <DatePicker date="2016-05-06" minDate="2016-04-01" maxDate="2016-06-01" onOpenModal={onOpenModal}/>
    );
    const datePicker = wrapper.instance();
    datePicker.setModalVisible = setModalVisible;

    wrapper.setProps({disabled: true});
    datePicker.onPressDate();

    expect(setModalVisible.callCount).to.equal(0);

    wrapper.setProps({disabled: false});
    datePicker.onPressDate();
    expect(wrapper.state('date')).to.deep.equal(datePicker.getDate());
    expect(setModalVisible.callCount).to.equal(1);
    expect(onOpenModal.callCount).to.equal(1);

    Platform.OS = 'android';
    expect(datePicker.onPressDate).to.not.throw(Error);

    wrapper.setProps({mode: 'datetime'});
    expect(datePicker.onPressDate).to.not.throw(Error);

    wrapper.setProps({mode: 'time'});
    expect(datePicker.onPressDate).to.not.throw(Error);

    wrapper.setProps({mode: 'tttt'});
    expect(datePicker.onPressDate).to.throw(Error);
  });

  it('panResponder', () => {
    Platform.OS = 'ios';
    const wrapper = shallow(<DatePicker date="2016-05-06" minDate="2016-04-01" maxDate="2016-06-01"/>);
    const datePicker = wrapper.instance();

    datePicker.onPressDate();

    expect(datePicker.onStartShouldSetResponder()).to.equal(true);
    expect(datePicker.onMoveShouldSetResponder()).to.equal(true);

    expect(datePicker.props.modalOnResponderTerminationRequest()).to.equal(true);
  });

  it('getTitleElement - with placeholder', () => {
    const placeholder = 'Please pick a date';
    const wrapper = mount(<DatePicker placeholder={placeholder} />);
    const datePicker = wrapper.instance();

    expect(datePicker.getTitleElement().props.children).to.equal(placeholder);
  });

  it('getTitleElement - without placeholder', () => {
    const wrapper = mount(<DatePicker date="2016-06-04" />);
    const datePicker = wrapper.instance();

    expect(datePicker.getTitleElement().props.children).to.equal(datePicker.getDateStr());
  });

  it('`date` prop changes', () => {
    const wrapper = mount(<DatePicker date="2016-06-04" />);

    expect(wrapper.state('date')).to.deep.equal(new Date(2016, 5, 4));

    wrapper.setProps({date: '2016-06-05'});

    expect(wrapper.state('date')).to.deep.equal(new Date(2016, 5, 5));
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
