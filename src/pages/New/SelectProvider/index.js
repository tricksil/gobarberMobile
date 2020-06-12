import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, ProvidersList, Provider, Avatar, Name } from './styles';

const SelectProvider = ({ navigation }) => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('providers');
      const data = response.data.map((provider) => {
        if (provider.avatar) {
          return {
            ...provider,
            avatar: {
              url:
                provider.avatar && __DEV__
                  ? provider.avatar.url.replace(
                      'http://localhost:3333',
                      api.defaults.baseURL
                    )
                  : provider.avatar.url,
            },
          };
        }

        return provider;
      });
      setProviders(data);
    }

    loadProviders();
  }, []);

  return (
    <Background>
      <Container>
        <ProvidersList
          data={providers}
          keyExtractor={(provider) => String(provider.id)}
          renderItem={({ item: provider }) => (
            <Provider
              onPress={() =>
                navigation.navigate('SelectDateTime', { provider })
              }
            >
              <Avatar
                source={{
                  uri: provider.avatar
                    ? provider.avatar.url
                    : `https://api.adorable.io/avatar/50/${provider.name}.png`,
                }}
              />
              <Name>{provider.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
};

SelectProvider.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default SelectProvider;
