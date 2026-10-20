import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
};

export function PrimaryButton({ title, onPress }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
    >
      <Text style={styles.buttonTitle}>{title}</Text>
      <Text style={styles.buttonArrow} accessibilityElementsHidden>
        →
      </Text>
    </TouchableOpacity>
  );
}
