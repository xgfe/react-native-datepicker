import React from 'react';
import {
  Platform
} from 'react-native';
import {shallow} from 'enzyme';
import DatePicker from '../index';
import {expect} from 'chai';

// hack require for require image
var m = require('module');
var originalLoader = m._load;

m._load = function hookedLoader(request, parent, isMain) {
  var file = m._resolveFilename(request, parent);
  if (file.match(/.jpeg|.jpg|.png$/))
    return {uri: file};

  return originalLoader(request, parent, isMain);
};

// Platform.OS default to 'ios'
describe('DatePicker', () => {
  const wrapper = shallow(<DatePicker />);
  const datePicker = wrapper.instance();

  it('Create DatePicker Component', () => {
    expect(datePicker).to.be.instanceOf(DatePicker);
  });

  it('Click DatePicker change state', () => {
    wrapper.simulate('press');
    expect(wrapper.state('modalVisible')).to.equal(true);
  });

});
