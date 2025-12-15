import { StyleSheet } from "react-native";

export const inputStyleSheet = StyleSheet.create({
  container: {
    marginBottom: 14,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },

  label: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 6,
    color: "#333",
  },

  input: {
    borderWidth: 1,
    borderColor: "#d0d0d0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  inputFocused: {
    borderColor: "#2563eb", // blue
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4, // Android shadow
  },

  inputError: {
    borderColor: "#dc2626",
  },

  error: {
    color: "#dc2626",
    marginTop: 4,
    fontSize: 13,
  },
});
