import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import DatePicker from '@react-native-community/datetimepicker';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText, Picker } from './styles';

const DateInput = ({ date, onChange }) => {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  function onChangeDate(event, selectedDate) {
    const currentDate = selectedDate || date;
    setOpened(Platform.OS === 'ios');
    onChange(currentDate);
  }

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#fff" size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>
      {opened &&
        (Platform.OS === 'ios' ? (
          <Picker>
            <DatePicker
              value={date}
              mode="date"
              display="default"
              locale="pt"
              minuteInterval={60}
              minimumDate={new Date()}
              onChange={onChangeDate}
            />
          </Picker>
        ) : (
          <DatePicker
            value={date}
            mode="date"
            display="spinner"
            locale="pt"
            minuteInterval={60}
            minimumDate={new Date()}
            onChange={onChangeDate}
          />
        ))}
    </Container>
  );
};

DateInput.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DateInput;
