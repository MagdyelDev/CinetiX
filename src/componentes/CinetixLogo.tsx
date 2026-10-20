import { Text, View } from "react-native";
import { styles } from "./styles";

export function CinetixLogo() {
  return (
    <View style={styles.logo}>
      <View style={styles.atom}>
        <View style={[styles.orbit, styles.orbitFirst]} />
        <View style={[styles.orbit, styles.orbitSecond]} />
        <View style={[styles.orbit, styles.orbitThird]} />
        <View style={styles.atomNucleus} />
      </View>
      <Text style={styles.logoTitle}>CinetiX.</Text>
      <Text style={styles.logoSubtitle}>Explore. Experimente. Descubra.</Text>
    </View>
  );
}
