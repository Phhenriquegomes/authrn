import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

import api from './services/api';

const teste = () => {
  const [dataUser, setdataUser] = useState(null);

  useEffect(() => {
    async function logar() {
      let usuario = '';
      let pass = '';

      try {
        const {response} = await api.post('', {
          user: usuario,
          pass: pass,
        });
        setdataUser(response.data);
        console.log(dataUser.user.usu_nome);
      } catch (error) {
        console.log(error);
      }
    }

    logar();
  });

  return (
    <View>
      <Text />
    </View>
  );
};

export default teste;
