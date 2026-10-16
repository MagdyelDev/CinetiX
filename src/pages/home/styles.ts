import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#FFFEFA",
  },
  title: {
    color: "#092C52",
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
  },
  message: {
    color: "#6E84A0",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
    textAlign: "center",
  },
  notice: {
    color: "#6E84A0",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 20,
    textAlign: "center",
  },
  button: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    borderRadius: 8,
    backgroundColor: "#18569B",
    marginTop: 28,
    paddingHorizontal: 16,
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
