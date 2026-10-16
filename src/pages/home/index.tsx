import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type HomePageProps = {
  onBackToLogin: () => void;
};

export default function HomePage({ onBackToLogin }: HomePageProps) {
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFEFA" />
      <Text style={styles.title}>Bem-vindo ao CinetiX</Text>
      <Text style={styles.message}>
        Esta tela inicial esta pronta para receber os recursos do app.
      </Text>
      <Text style={styles.notice}>
        O login e demonstrativo; a autenticacao ainda nao esta conectada.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={onBackToLogin}
        accessibilityRole="button"
      >
        <Text style={styles.buttonTitle}>Voltar ao login</Text>
      </TouchableOpacity>
    </View>
  );
}
