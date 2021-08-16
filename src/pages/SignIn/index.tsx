import React, {useState} from 'react';
import {View, Text, Button, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {useAuth} from '../../contexts/auth';

const SignIn: React.FC = () => {
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const {signed, user, signIn} = useAuth();

    console.log(signed);
    console.log(user);

    const handleSignIn = async () =>{
        if(loading === false){
            setLoading(true);
          
          const ISloged = await signIn(cpf, password);
          if(ISloged === false){
            setLoading(false);
          }
        }
   
    }

   
    
    return (
    <View style={styles.container}>
      <TextInput
        //type={'cpf'}
        style={styles.input}
        placeholder="Usuário (CPF)"
        placeholderTextColor="#A0A0A0"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
        value={cpf}
        onChangeText={text => {
          setCpf(text);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Sua senha"
        placeholderTextColor="#A0A0A0"
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={text => {
          setPassword(text);
        }}
      />

        

        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={styles.buttonText}>
          {loading ? 'Carregando...' : 'Acessar'}
        </Text>
      </TouchableOpacity>
    </View>
    )
};

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
      },
    input: {
        backgroundColor: '#F1F5F4',
        color: '#009688',
        borderRadius: 10,
        width: '90%',
        paddingHorizontal: 20,
        fontSize: 18,
        height: 50,
        marginTop: 20,
      },
      button: {
        height: 50,
        width: '90%',
        backgroundColor: '#009688',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
      },
      buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
      },
});