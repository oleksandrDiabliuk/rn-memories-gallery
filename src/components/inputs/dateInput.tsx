import React, { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { DATE_FORMATS } from '../../constants';
import { inputs } from '../../styles';

type Props = {
  date: Date;
  setDate: (data: Date) => void;
};

export const DateInput = ({date, setDate}: Props) => {
  const [isOpened, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={inputs.textInput}
      >
        <Text style={inputs.dateInputText}>{date ? moment(date).format(DATE_FORMATS.dd_mm_yyyy) : ''}</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={isOpened}
        date={date}
        mode="date"
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  );
};
