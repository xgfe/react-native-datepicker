# react-native-datepicker [![Build Status](https://travis-ci.org/xgfe/react-native-datepicker.svg)](https://github.com/xgfe/react-native-datepicker) [![Coverage Status](https://coveralls.io/repos/github/xgfe/react-native-datepicker/badge.svg?branch=master)](https://coveralls.io/github/xgfe/react-native-datepicker?branch=master)
react native datePicker component for both Android and IOS, useing DatePikcerAndroid, TimePickerAndroid and DatePickerIOS

## Install

```bash
npm install react-native-datepicker --save
```

## Example
Check [index.js](https://github.com/xgfe/react-native-datepicker/blob/master/example/index.js) in the Example folder.

![android](http://7xtixz.com2.z0.glb.clouddn.com/react-native-datepicker-android.gif)
![android](http://7xtixz.com2.z0.glb.clouddn.com/react-native-datepicker-ios.gif)

## Usage

```javascript
<DatePicker
  style={{width: 200}}
  date={this.state.date}
  mode="date"
  format="YYYY-MM-DD"
  minDate="2016-05-01"
  maxDate="2016-06-01"
  confirmBtnText="Confirm"
  cancelBtnText="Cancel"
  onDateChange={(date) => {this.setState({date: date})}}
/>
```

You can check [index.js](https://github.com/xgfe/react-native-datepicker/blob/master/example/index.js) in the Example folder for detail.

## Properties

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| style | - | `object` | Specify the style of the DatePicker, eg. width, height...  |
| date | - | `string | date` | Specify the display date of DatePicker. `string` type value must match the specified format  |
| mode | 'date' | `enum` | The `enum` of `date`, `datetime` and `time` |
| format | 'YYYY-MM-DD' | `string` | Specify the display format of the date, which using [moment.js](http://momentjs.com/). The default value change according to the mode. |
| confirmBtnText | '确定' | `string` | Specify the text of confirm btn in ios. |
| cancelBtnText | '取消' | `string` | Specify the text of cancel btn in ios. |
| iconSource | - | `{uri: string} | number` | Specify the icon. Same as the `source` of Image, always using `require()` |
| minDate | - | `string | date` | Restricts the range of possible date values. |
| maxDate | - | `string | date` | Restricts the range of possible date values. |
| duration | 300 | `number` | Specify the animation duration of datepicker.|
| customStyles | - | `number` | The hook of customize datepicker style, same as the native style. `dateTouchBody`, `dateInput`...|

## Methods


| Method  | Params  | Description |
| :------------ |:---------------:| :---------------:|
| onDateChange | date:string | This is called when the user confirm the picked date or time in the UI. The first and only argument is a date or time string representing the new date and time formatted by [moment.js](http://momentjs.com/) with the given format property. |
