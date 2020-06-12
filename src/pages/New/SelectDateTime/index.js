import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Background from '~/components/Background';
import DateInput from '~/components/DateInput';

import api from '~/services/api';

import { Container, HourList, Hour, Title } from './styles';

const SelectDateTime = ({ route, navigation }) => {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  const { provider } = route.params;

  useEffect(() => {
    async function loadAvailable() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });

      setHours(response.data);
    }
    loadAvailable();
  }, [date, provider.id]);

  function handleSelectHour(time) {
    navigation.navigate('Confirm', {
      provider,
      time,
    });
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />

        <HourList
          data={hours}
          keyExtractor={(item) => item.time}
          renderItem={({ item }) => (
            <Hour
              onPress={() => handleSelectHour(item.value)}
              enabled={item.available}
            >
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
};

SelectDateTime.propTypes = {
  route: PropTypes.oneOfType([PropTypes.object]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default SelectDateTime;
