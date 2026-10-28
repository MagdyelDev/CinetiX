import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CinetixLogo } from "../../componentes/CinetixLogo";
import { PrimaryButton } from "../../componentes/PrimaryButton";
import { TextField } from "../../componentes/TextField";
import { styles } from "../login/styles";

type Account = { name: string; email: string; password: string };

type RegisterPageProps = {
  onRegister: (account: Account) => void;
  onBackToLogin: () => void;
};

export default function RegisterPage({ onRegister, onBackToLogin }: RegisterPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  function handleRegister() {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password) {
      Alert.alert("Campos obrigatórios", "Preencha nome, e-mail e senha.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      Alert.alert("E-mail inválido", "Confira o endereço informado.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Senha curta", "Use pelo menos 6 caracteres.");
      return;
    }

    onRegister({ name: cleanName, email: cleanEmail, password });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#18569B" />
      <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.header}><CinetixLogo /></View>
        <ScrollView style={styles.form} contentContainerStyle={styles.formContent} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Crie sua conta</Text>
          <Text style={styles.subtitle}>Preencha os dados para começar.</Text>
          <View style={styles.fields}>
            <TextField label="Nome" placeholder="Seu nome" value={name} onChangeText={setName} icon="mail" autoComplete="name" textContentType="name" />
            <TextField label="E-mail" placeholder="seuemail@exemplo.com" value={email} onChangeText={setEmail} icon="mail" keyboardType="email-address" autoComplete="email" textContentType="emailAddress" />
            <TextField
              label="Senha"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChangeText={setPassword}
              icon="lock"
              secureTextEntry={!passwordVisible}
              autoComplete="new-password"
              textContentType="newPassword"
              trailingAction={<TouchableOpacity onPress={() => setPasswordVisible((visible) => !visible)}><Text style={styles.togglePassword}>{passwordVisible ? "Ocultar" : "Mostrar"}</Text></TouchableOpacity>}
            />
          </View>
          <View style={{ marginTop: 24 }}><PrimaryButton title="Cadastrar" onPress={handleRegister} /></View>
          <Text style={styles.signupPrompt}>Já tem conta? <Text style={styles.link} onPress={onBackToLogin}>Entrar</Text></Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
