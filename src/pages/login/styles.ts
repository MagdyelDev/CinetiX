import { StyleSheet } from "react-native";

const BLUE = "#18569B";
const INK = "#092C52";
const PAPER = "#FFFEFA";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BLUE,
  },
  screen: {
    flex: 1,
  },
  header: {
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BLUE,
  },
  form: {
    flex: 1,
    backgroundColor: PAPER,
  },
  formContent: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 27,
    paddingBottom: 28,
  },
  title: {
    color: INK,
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 26,
  },
  subtitle: {
    color: "#6E84A0",
    fontSize: 11,
    marginTop: 11,
  },
  fields: {
    gap: 17,
    marginTop: 24,
  },
  forgotPassword: {
    alignItems: "flex-end",
    marginTop: 12,
    marginBottom: 20,
  },
  link: {
    color: BLUE,
    fontSize: 10,
    fontWeight: "700",
  },
  togglePassword: {
    color: "#537397",
    fontSize: 10,
    fontWeight: "600",
  },
  signupPrompt: {
    color: "#7186A0",
    fontSize: 10,
    textAlign: "center",
    marginTop: 20,
  },
});
