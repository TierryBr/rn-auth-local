import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function verifyAvaiableAuthentication() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    console.log(compatible);

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log(types);
  }

  async function handleAuthentication() {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!isBiometricEnrolled) {
      return Alert.alert(
        'Login',
        'Nenhuma biometria cadastrada. Por favor cadastre.'
      );
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login com biometria',
      fallbackLabel: 'Biometria não reconhecida',
    });

    setIsAuthenticated(auth.success);
  }

  useEffect(() => {
    verifyAvaiableAuthentication();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Usuario conectado: {isAuthenticated ? 'Sim' : 'Não'}</Text>
      <Button title="Entrar" onPress={handleAuthentication} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
