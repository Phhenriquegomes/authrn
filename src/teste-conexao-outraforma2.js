import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

import api from './services/api';

const teste = () => {
  const [dataUser, setdataUser] = useState(null);

  async function handleVerifyUser(user, pass) {
    const response = await api.post('', {
      user,
      pass,
    });

    setdataUser(response.data);
    console.log(dataUser.user.usu_nome);
  }

  handleVerifyUser('', '');

  return (
    <View>
      <Text />
    </View>
  );
};

export default teste;
