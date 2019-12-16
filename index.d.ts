interface DatePickerProps {
  style: object;
  date?: Date | null;
  mode?: "date" | "datetime" | "time";
  androidMode?: "default" | "calendar" | "spinner";
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
  format?: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
  hideText?: boolean;
  customStyles?: object;
  onDateChange: (date: string) => void;
  showIcon: boolean;
  onOpenModal: Function;
  onCloseModal: Function;
  height?: any;
  duration?: any;
  iconSource?: any;
  iconComponent?: any;
  disabled?: boolean;
  allowFontScaling?: boolean;
  onPressMask?: Function;
  modalOnResponderTerminationRequest?: any;
  is24Hour?: any;
  getDateStr?: (date: Date) => string;
  locale?: any;
}

export const DatePicker: React.ComponentClass<DatePickerProps>;

export default DatePicker;
