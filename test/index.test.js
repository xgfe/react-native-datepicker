import React from 'react';
import {shallow} from 'enzyme';
import DatePicker from '../index';
import {expect} from 'chai';


let icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEw' +
  'AACxMBAJqcGAAABA9JREFUeJztm81vG0UYxp+ZdRzsqAmtjZBV81kKEmrPVEpDcSNRCSGkXihcOMIBCQTqH0CPDTlSCf4ApJLe2kpIUORGNBECWgV' +
  'ICyWtDXVKYpo6/og33vXOvhyCIMYrxjvZeJ1kfjfPvvO+zzya2X0VTQDNzoapTpyYnY3uLlWPGkS0lBjKvnrggB2kMBnT09MxU7AXiIgiwrqcyWQa' +
  'KnmUDMhmv0+6EWsS4M/+PfRTFM6RkZGRZZV8fpmc/C5lw/mac+xbG3HnHI7Dx4aH//Sbi6sIEEbz/XWLB4CDNiLvquRSocmd9/5dPADw/REX76jkU' +
  'jKAMdrfPkrPqORSqg96wmN0X/uYHCUDyOvoECm/T8Ksr2TAdqJj1xbOjJ9g+dyYW8in5188zmtPH2x5PvTzDPae/zRwgV4Ujr8Br/qpS+eJP/LYXT' +
  'z51MnU2yc/6yRXRzug+OGpj/HlxbP0y4+PsnqtZ3cNN2sMN2fT+OLC2eLYB590NEcWsHBm/IQ7lX0LjrNxhd1CCLhT2TfvfjT+uixUagDL58b+u/i' +
  'mEG1xtnD9SNwQHdUXAsZvudOyXFID3EI+vf531bbR8BBgOQJVa/ObQT/13Tu398ryyXeAudISUzIbYB4CyHWwvKrUjfqiZDbAHI/6or0+M+vS9clf' +
  'aEQtP20hwG7eaI/79TosD2OCxhYC7MZM2zi/PqNUP+J3gsE56OoU2J4EaHgUjAi4cgn82jcw+OZ/IAzOQTPfgu9Ogo4cAxGBX/4cmL2qVF/aByy8f' +
  'LhlC9wzTZRWLc/YROwBJOMx3yL84Ld+6uKV/12jb8uSsTjife0bJ97Xh0Rscxe/GfV9HwHGgPTgLtQsG6bT/Kf4rmhU/Y8LIdb3bQCwdm4G+6MY7I' +
  '+qTN8wQdbv2ba2W2gDwhYQNjveAOmLc6lcIVlML5N8cCjYPmC7oQ0IW0DY7HgDlDrBe0v3UTfNlrGBgTgeSiR64rkflAyomyYqlVrLGAcDEr3x3A8' +
  '7/ghoA8IWEDZK74CBgfjamVtHPB7vmed+0K1wt4T0KroP8D0D4X/ndR8QINqAsAWEje4DZAG6D9jm6D7A9wyE/53XfUCAaAPCFhA2ug+QBSzeL1HE' +
  'MJSSh41wHDycTGysD1hZqQenqMvUVkxpjNSA4mLRJdp6zSARYbFYlF5flRpgNpr5wvwCtpIJRITC/B+wbOuWLFZ+U5TRueVyGXO38yhXqnA8bmn2C' +
  'sJxUC5XMXcrh+VyBQDOyeZIvwKGsE47kehrq6uNx3+/Mx+Ezu7gUs7qN8ZkYdIdkMlkykDfqOvSD8Eo6wrXuMtGXzp0qCoL7Phq3cTEhLEnlX6FET' +
  'sKRslu/o9QJ7iMuwxY4i77avL55y6cYqx79/c1Go1mq/IXVr8zUhJfa5MAAAAASUVORK5CYII=';

describe('<DatePicker />', () => {
  it('should render stuff', () => {
    const wrapper = shallow(<DatePicker iconSource={icon} />);
    expect(wrapper.length).to.equal(1);
  });
});
