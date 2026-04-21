import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../../theme/colors";
import { useAuth } from "../../modules/auth/context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  return (
    <ScrollView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Image style={styles.avatar} />

        <Text style={styles.name}>{user?.name || "User"}</Text>
        <Text style={styles.info}>{user?.phone || "-"}</Text>
        <Text style={styles.info}>{user?.email || "-"}</Text>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>TOTAL CALLS</Text>
          <Text style={styles.statValue}>1240</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>CONV. RATE</Text>
          <Text style={styles.statValue}>15.4%</Text>
        </View>
      </View>

      {/* MENU */}
      <View style={styles.menuCard}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/profile/edit")}
        >
          <Text style={styles.menuText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/profile/payments")}
        >
          <Text style={styles.menuText}>Payment History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/profile/settings")}
        >
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // ✅ fixed consistency
  },

  header: {
    backgroundColor: COLORS.primary, // ✅ fixed
    alignItems: "center",
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#e5e7eb", // placeholder
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  info: {
    fontSize: 13,
    color: "#e5e7eb",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -30,
    paddingHorizontal: 16,
  },

  statCard: {
    backgroundColor: COLORS.card,
    flex: 1,
    marginHorizontal: 5,
    padding: 16,
    borderRadius: 14,
    elevation: 3,
  },

  statLabel: {
    fontSize: 12,
    color: COLORS.subText,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },

  menuCard: {
    backgroundColor: COLORS.card,
    margin: 16,
    borderRadius: 14,
    overflow: "hidden",
  },

  menuItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  menuText: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.text,
  },

  logoutBtn: {
    backgroundColor: "#ef4444",
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});