import * as React from 'react';

interface DatePickerProps {
    date?: Date;
    style?: Object;
    mode?: "date" | "datetime" | "time";
    androidMode?: "default" | "calendar" | "spinner";
    format?: string;
    confirmBtnText?: string;
    cancelBtnText?: string;
    iconSource?: any;
    minDate?: Date;
    maxDate?: Date;
    duration?: number;
    customStyles?: Object;
    showIcon?: boolean;
    hideText?: boolean;
    iconComponent?: Element;
    disabled?: boolean;
    is24Hour?: boolean;
    allowFontScaling?: boolean;
    placeholder?: string;
    onDateChange?: Function;
    onOpenModal?: Function;
    onCloseModal?: Function;
    onPressMask?: Function;
    modalOnResponderTerminationRequest?: Function;
    TouchableComponent?: any;
    getDataStr?: Function;
}

export default class DatePicker extends React.Component<DatePickerProps>{
    
}
