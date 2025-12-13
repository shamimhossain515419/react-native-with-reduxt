import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../../redux/slices/authSlice";

const HomeScreen = () => {
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout()); // redux state clear
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome 👋</Text>

      {user ? (
        <View style={styles.card}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user.name}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>

          <Text style={styles.label}>Role</Text>
          <Text style={styles.value}>{user.role || "User"}</Text>

          <Text style={styles.label}>Balance</Text>
          <Text style={styles.value}>{user.balance ?? 0} BDT</Text>
        </View>
      ) : (
        <Text style={styles.noUser}>No user data found</Text>
      )}

         {/* Go to Settings */}
      <View style={{marginTop:10}}>
        <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Settings")}
      >
        <Text style={styles.btnText}>Go to Settings ⚙️</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout 🔐</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 4,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 10,
    color: "#555",
  },
  value: {
    fontSize: 17,
    fontWeight: "700",
    color: "#000",
  },
  noUser: {
    fontSize: 16,
    color: "red",
    marginTop: 40,
  },
 
  btn: {
    backgroundColor: "#3b82f6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    padding: 15,
    borderRadius: 10,
  },
  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
});
