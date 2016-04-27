# react-native-datepicker
react native datePicker component for both Android and IOS, useing DatePikcerAndroid, TimePickerAndroid and DatePickerIOS

## Install

``` bash
npm install react-native-datepicker --save
```

## Example
Check [index.js](https://github.com/xgfe/react-native-datepicker/blob/master/example/index.android.js) in the Example folder.

## Usage

```javascript
<DatePicker
  style={{width: 200}}
  date={this.state.date}
  mode="date"
  format="YYYY-MM-DD"
  minDate="2016-05-01"
  maxDate="2016-06-01"
  onDateChange={(date) => {this.setState({date: date})}}
/>
```

You can check [index.js](https://github.com/xgfe/react-native-datepicker/blob/master/example/index.android.js) in the Example folder for detail.

## Properties

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| style | - | `object` | Specify the style of the DatePicker, eg. width, height...  |
| date | - | `string | date` | Specify the display date of DatePicker. `string` type value must match the specified format  |
| mode | 'date' | `enum` | The `enum` of `date`, `datetime` and `time` |
| format | 'YYYY-MM-DD' | `string` | Specify the display format of the date, which using [moment.js](http://momentjs.com/). The default value change according to the mode. |
| minDate | - | `string | date` | Restricts the range of possible date values. |
| maxDate | - | `string | date` | Restricts the range of possible date values. |
| duration | 300 | `number` | Specify the animation duration of datepicker.

## Methods


| Method  | Params  | Description |
| :------------ |:---------------:| :---------------:|
| onDateChange | date:string | This is called when the user confirm the picked date or time in the UI. The first and only argument is a date or time string representing the new date and time formatted by [moment.js](http://momentjs.com/) with the given format property. |
