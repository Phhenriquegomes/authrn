import React, {Component} from 'react';
import {View, FlatList} from 'react-native';

import api from './services/api';
import Filmes from './pages/filmes';

class PromotionsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filmes: [],
    };
  }

  async componentDidMount() {
    let usuario = '';
    let pass = '';

    try {
      const response = await api.post('', {
        user: usuario,
        pass: pass,
      });
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        filmes: response.data,
      });
      console.log(response.data.user.usu_nome);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.filmes}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <Filmes data={item} />}
        />
      </View>
    );
  }
}

export default PromotionsList;
