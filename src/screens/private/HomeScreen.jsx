import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../../redux/slices/authSlice";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = () => {
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout()); // redux state clear
  };
  // demo data (api thaka ashle ekhane replace korba)
  const income = {
    total: 15000,
    category: "Salary",
  };

  const expense = {
    total: 5200,
    category: "Food",
  }

    // demo totals (api diye replace korba)
  const totals = {
    income: 25000,
    expense: 13200,
    incomeCategory: 6,
    expenseCategory: 9,
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
      
      {/* ===== Income & Expense Summary Box ===== */}
      {/* ===== 4 Clickable Boxes ===== */}
      <View style={styles.grid}>
        {/* Income */}
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("NativeSelector")}
        >
          <Ionicons name="cash-outline" size={30} color="#16a34a" />
          <Text style={styles.boxTitle}>Income</Text>
          <Text style={styles.boxValue}>৳ {totals.income}</Text>
        </TouchableOpacity>

        {/* Income Category */}
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("IncomeCategory")}
        >
          <Ionicons name="grid-outline" size={30} color="#2563eb" />
          <Text style={styles.boxTitle}>Income Category</Text>
          <Text style={styles.boxValue}>
            {totals.incomeCategory} Items
          </Text>
        </TouchableOpacity>

        {/* Expense */}
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("Expense")}
        >
          <Ionicons name="card-outline" size={30} color="#dc2626" />
          <Text style={styles.boxTitle}>Expense</Text>
          <Text style={styles.boxValue}>৳ {totals.expense}</Text>
        </TouchableOpacity>

        {/* Expense Category */}
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("ExpenseCategory")}
        >
          <Ionicons name="list-outline" size={30} color="#7c3aed" />
          <Text style={styles.boxTitle}>Expense Category</Text>
          <Text style={styles.boxValue}>
            {totals.expenseCategory} Items
          </Text>
        </TouchableOpacity>
      </View>



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

  summaryBox: {
  backgroundColor: "#fff",
  borderRadius: 14,
  padding: 16,
  marginTop: 20,
  elevation: 4,
},

grid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  marginTop: 20,
},

box: {
  width: "48%",
  backgroundColor: "#fff",
  padding: 16,
  borderRadius: 14,
  marginBottom: 15,
  elevation: 4,
  alignItems: "center",
},

boxTitle: {
  marginTop: 8,
  fontSize: 15,
  fontWeight: "600",
  textAlign: "center",
},

boxValue: {
  marginTop: 4,
  fontSize: 16,
  fontWeight: "700",
  color: "#111827",
},

balance: {
  marginTop: 8,
  fontWeight: "700",
  fontSize: 16,
},

});
