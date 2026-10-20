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
import { styles } from "./styles";

type LoginPageProps = {
  onLoginSuccess: () => void;
};

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  function handleLogin() {
    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password) {
      Alert.alert("Campos obrigatórios", "Preencha seu e-mail e sua senha.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      Alert.alert("E-mail inválido", "Confira o endereço de e-mail informado.");
      return;
    }

    onLoginSuccess();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#18569B" />
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <CinetixLogo />
        </View>

        <ScrollView
          style={styles.form}
          contentContainerStyle={styles.formContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Bom ter você aqui!</Text>
          <Text style={styles.subtitle}>Entre na sua conta para continuar.</Text>

          <View style={styles.fields}>
            <TextField
              label="E-mail"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChangeText={setEmail}
              icon="mail"
              keyboardType="email-address"
              autoComplete="email"
              textContentType="emailAddress"
            />
            <TextField
              label="Senha"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              icon="lock"
              secureTextEntry={!passwordVisible}
              autoComplete="current-password"
              textContentType="password"
              trailingAction={
                <TouchableOpacity
                  onPress={() => setPasswordVisible((visible) => !visible)}
                  accessibilityRole="button"
                  accessibilityLabel={
                    passwordVisible ? "Ocultar senha" : "Mostrar senha"
                  }
                  hitSlop={8}
                >
                  <Text style={styles.togglePassword}>
                    {passwordVisible ? "Ocultar" : "Mostrar"}
                  </Text>
                </TouchableOpacity>
              }
            />
          </View>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() =>
              Alert.alert(
                "Recuperar senha",
                "A recuperação por e-mail ficará disponível após conectar a autenticação."
              )
            }
            accessibilityRole="button"
          >
            <Text style={styles.link}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <PrimaryButton title="Entrar" onPress={handleLogin} />

          <Text style={styles.signupPrompt}>
            Ainda não tem conta?{" "}
            <Text
              style={styles.link}
              onPress={() =>
                Alert.alert(
                  "Cadastro",
                  "A tela de cadastro será adicionada em breve."
                )
              }
              accessibilityRole="link"
            >
              Cadastre-se
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}