import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from '../services/api';
import * as auth from "../services/auth";
import md5 from 'md5';

interface User {
  name: string,
  cpf: string,
  password: string,
  email: string,
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    signIn(): Promise<void>;
    signOut(): void;
  }

  const AuthContext = createContext<AuthContextData>({} as AuthContextData); 

export const AuthProvider: React.FC = ({children}) => {
   const [user, setUser] = useState<User | null>(null); 
   const [loading, setLoaing] = useState(true);

   //Para deixar logado
   useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

       // simular uma lentidão para mostar o loading.
      //await new Promise((resolve) => setTimeout(resolve, 2000));

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        setLoaing(false);

        api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
      }
    }

    loadStorageData();
  });
  
   async function signIn(cpf: any, password: any){
     const response = await auth.signIn();

     if((cpf === response.user.cpf) && (md5(password) === response.user.password)){
      
       //console.log(cpf);
       //console.log(password);
      //console.log(response.user.name);
      //console.log(response.user.email);
      setUser(response.user);

      api.defaults.headers.Authorization = `Baerer ${response.token}`;

      //Para deixar logado
      await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
      await AsyncStorage.setItem('@RNAuth:token', response.token);
      }
      else{
        alert("Usuario invalido");
        return false;
      }
   }

   function signOut(){
       AsyncStorage.clear().then(() => {
         setUser(null);
        // setLoaing(false);
       });
   };

    return(
    <AuthContext.Provider value={{signed: !!user, user, loading, signIn, signOut}}>
        {children}
    </AuthContext.Provider>
    );
};

export function useAuth(){
  const context = useContext(AuthContext);

  return context;
}