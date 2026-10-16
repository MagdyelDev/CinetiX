import type { ReactNode } from "react";
import {
  KeyboardTypeOptions,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { styles } from "./styles";

type TextFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  icon: "mail" | "lock";
  keyboardType?: KeyboardTypeOptions;
  trailingAction?: ReactNode;
} & Pick<
  TextInputProps,
  "secureTextEntry" | "autoComplete" | "textContentType"
>;

export function TextField({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  keyboardType,
  trailingAction,
  secureTextEntry,
  autoComplete,
  textContentType,
}: TextFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {icon === "mail" ? (
          <View style={styles.mailIcon}>
            <View style={styles.mailFlapLeft} />
            <View style={styles.mailFlapRight} />
          </View>
        ) : (
          <View style={styles.lockIcon}>
            <View style={styles.lockShackle} />
            <View style={styles.lockBody}>
              <View style={styles.lockKeyhole} />
            </View>
          </View>
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#8195AC"
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoComplete={autoComplete}
          textContentType={textContentType}
          accessibilityLabel={label}
          returnKeyType={icon === "mail" ? "next" : "done"}
        />
        {trailingAction}
      </View>
    </View>
  );
}
