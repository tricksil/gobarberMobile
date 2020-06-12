import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import api from '~/services/api';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import { Container, Title, List } from './styles';

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const isFocused = useIsFocused();

  async function loadAppointments() {
    const response = await api.get('appointments');
    const data = response.data.map((appointment) => {
      if (appointment.provider.avatar) {
        return {
          ...appointment,
          provider: {
            avatar: {
              url:
                appointment.provider.avatar && __DEV__
                  ? appointment.provider.avatar.url.replace(
                      'http://localhost:3333',
                      api.defaults.baseURL
                    )
                  : appointment.provider.avatar.url,
            },
          },
        };
      }

      return appointment;
    });

    setAppointments(data);
  }

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment
      )
    );
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
        <List
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}
export default Dashboard;
