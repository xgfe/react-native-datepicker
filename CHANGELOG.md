<a name="1.4.5"></a>
## [1.4.5](https://github.com/xgfe/react-native-datepicker/compare/v1.4.4...v1.4.5) (2017-03-21)


### Bug Fixes

* **datepicker:** fix `date` prop change not invoke state change bug ([#93](https://github.com/xgfe/react-native-datepicker/issues/93), [3c8099b](https://github.com/xgfe/react-native-datepicker/commit/3c8099b))



<a name="1.4.4"></a>
## [1.4.4](https://github.com/xgfe/react-native-datepicker/compare/v1.4.3...v1.4.4) (2017-02-06)


### Features

* **datepicker:** Added two new properties: onOpenModal and onCloseModal ([#77](https://github.com/xgfe/react-native-datepicker/pull/77), [846ae35](https://github.com/xgfe/react-native-datepicker/commit/846ae35))
* **Datepicker:** Add animation on datepicker dismiss ([#76](https://github.com/xgfe/react-native-datepicker/pull/76), [fdfcc21](https://github.com/xgfe/react-native-datepicker/commit/fdfcc21))

### Bug Fixes

* **datepicker:** fix datepicker can't  open in landscape mode bug ([#28](https://github.com/xgfe/react-native-datepicker/issues/28), [3a9df99](https://github.com/xgfe/react-native-datepicker/commit/3a9df99))



<a name="1.4.3"></a>
## [1.4.3](https://github.com/xgfe/react-native-datepicker/compare/v1.4.1...v1.4.3) (2016-12-13)


### Bug Fixes

* **datepicker:** fix `disabled` props change not update bug [#66](https://github.com/xgfe/react-native-datepicker/issues/66) ([7579dc9](https://github.com/xgfe/react-native-datepicker/commit/7579dc9)), closes [#66](https://github.com/xgfe/react-native-datepicker/issues/66)
* **datepicker:** fix is24Hour flag can't be specified bug ([c320e56](https://github.com/xgfe/react-native-datepicker/commit/c320e56)), closes [#69](https://github.com/xgfe/react-native-datepicker/issues/69)


### Reverts

* **datepicker:** revert responder prevert func temporary [#47](https://github.com/xgfe/react-native-datepicker/issues/47) [#50](https://github.com/xgfe/react-native-datepicker/issues/50) ([5b9f60c](https://github.com/xgfe/react-native-datepicker/commit/5b9f60c))



<a name="1.4.1"></a>
## [1.4.1](https://github.com/xgfe/react-native-datepicker/compare/v1.4.0...v1.4.1) (2016-11-03)


### Bug Fixes

* **datepicker:** fix btn not work in 7p bug [#50](https://github.com/xgfe/react-native-datepicker/issues/50) ([8285d2d](https://github.com/xgfe/react-native-datepicker/commit/8285d2d)), closes [#50](https://github.com/xgfe/react-native-datepicker/issues/50)



<a name="1.4.0"></a>
# [1.4.0](https://github.com/xgfe/react-native-datepicker/compare/v1.3.2...v1.4.0) (2016-10-31)


### Features

* **datepicker:** default prevent manual panResonder when mdal shown ([6d1c1d0](https://github.com/xgfe/react-native-datepicker/commit/6d1c1d0))
* **Datepicker:** support minuteInterval property in ios [#46](https://github.com/xgfe/react-native-datepicker/issues/46) ([3ae69a4](https://github.com/xgfe/react-native-datepicker/commit/3ae69a4))



<a name="1.3.2"></a>
## [1.3.2](https://github.com/xgfe/react-native-datepicker/compare/v1.3.1...v1.3.2) (2016-08-02)


### Bug Fixes

* **datepicker:** fix default date bug without selecting ([b08fb7e](https://github.com/xgfe/react-native-datepicker/commit/b08fb7e))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/xgfe/react-native-datepicker/compare/v1.3.0...v1.3.1) (2016-07-25)


### Features

* **datepicker:** add placeholder when this.props.date is falsy([1430f06](https://github.com/xgfe/react-native-datepicker/commit/1430f06906906d408217bae8183395969f3cf51f))

### Refactor

* **datepicker:** refactor datepicker with official ES6 Classes pattern([fb5f6e2](https://github.com/xgfe/react-native-datepicker/commit/fb5f6e2))

<a name="1.3.0"></a>
# [1.3.0](https://github.com/xgfe/react-native-datepicker/compare/v1.2.2...v1.3.0) (2016-07-11)


### Bug Fixes

* **datepicker:** fix the DatepickerIOS align bug above 0.28.0 with the removing of width ([b51b9ca](https://github.com/xgfe/react-native-datepicker/commit/b51b9ca))
* **readme:** fix readme gif img   [#17](https://github.com/xgfe/react-native-datepicker/issues/17) ([49e310e](https://github.com/xgfe/react-native-datepicker/commit/49e310e)), closes [#17](https://github.com/xgfe/react-native-datepicker/issues/17)

### Breaking Change

* can't be center automatic below 0.28.0([b51b9ca](https://github.com/xgfe/react-native-datepicker/commit/b51b9ca)).

<a name="1.2.2"></a>
## [1.2.2](https://github.com/xgfe/react-native-datepicker/compare/v1.2.1...v1.2.2) (2016-06-22)


### Features

* **datepicker:** add supoort of `showIcon` property ([f274179](https://github.com/xgfe/react-native-datepicker/commit/f274179))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/xgfe/react-native-datepicker/compare/v1.2.0...v1.2.1) (2016-05-19)


### Bug Fixes

* **datepicker:** fix datepicker Modal adaptation with different width on ios([b3234bd](https://github.com/xgfe/react-native-datepicker/commit/b3234bd))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/xgfe/react-native-datepicker/compare/v1.1.0...v1.2.0) (2016-05-17)

### Breaking Change

* Upgrade Requiring React API, Requiring from react-native is now deprecated. Work after 0.24.([53b0846](https://github.com/xgfe/react-native-datepicker/commit/53b0846))

<a name="1.1.0"></a>
# [1.1.0](https://github.com/xgfe/react-native-datepicker/compare/v1.0.3...v1.1.0) (2016-05-06)


### Features

* **datepicker:** add support for custom btn text([1bbd66e](https://github.com/xgfe/react-native-datepicker/commit/1bbd66e))
* **datepicker:** add support for custom icon([7ffbe43](https://github.com/xgfe/react-native-datepicker/commit/7ffbe43))
* **datepicker:** add support for custom styles with customStyles property([cb254e4](https://github.com/xgfe/react-native-datepicker/commit/cb254e4))



<a name="1.0.3"></a>
## [1.0.3](https://github.com/xgfe/react-native-datepicker/compare/v1.0.2...v1.0.3) (2016-04-27)


### Features

* **datepicker:** optimize the animation of datepicker, and add support for duration property([91fa55c](https://github.com/xgfe/react-native-datepicker/commit/91fa55c))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/xgfe/react-native-datepicker/compare/v1.0.1...v1.0.2) (2016-04-26)



<a name="1.0.1"></a>
## [1.0.1](https://github.com/xgfe/react-native-datepicker/compare/v1.0.0...v1.0.1) (2016-04-26)



<a name="1.0.0"></a>
# 1.0.0 (2016-04-25)



