import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import AppHeader from "../../shared/components/AppHeader";

export default function Profile() {
  return (
    <ScrollView style={styles.container}>
      <AppHeader title="Profile" />

      <View style={styles.card}>
        <View style={styles.headerBg} />

        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            }}
            style={styles.avatar}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.name}>John Agent</Text>
          <Text style={styles.info}>📞 +91 9999988888</Text>
          <Text style={styles.info}>✉ john.agent@prosales.com</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>TOTAL CALLS</Text>
          <Text style={styles.statValue}>1240</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>CONV. RATE</Text>
          <Text style={[styles.statValue, { color: "#2563eb" }]}>
            15.4%
          </Text>
        </View>
      </View>

      <View style={styles.menuCard}>
        <MenuItem title="Edit Profile" />
        <MenuItem title="Payment History" />
        <MenuItem title="Settings" />
      </View>
    </ScrollView>
  );
}

function MenuItem({ title }: any) {
  return (
    <View style={styles.menuItem}>
      <Text style={styles.menuText}>{title}</Text>
      <Text style={styles.arrow}>›</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,

    ...(Platform.OS === "web"
      ? { boxShadow: "0px 2px 8px rgba(0,0,0,0.1)" }
      : { elevation: 4 }),
  },

  headerBg: {
    height: 100,
    backgroundColor: "#2563eb",
  },

  avatarWrapper: {
    position: "absolute",
    top: 50,
    left: "50%",
    transform: [{ translateX: -45 }],
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#fff",
  },

  content: {
    alignItems: "center",
    marginTop: 50,
    paddingBottom: 16,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },

  info: {
    color: "gray",
    marginBottom: 4,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  statCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    width: "48%",

    ...(Platform.OS === "web"
      ? { boxShadow: "0px 2px 8px rgba(0,0,0,0.1)" }
      : { elevation: 3 }),
  },

  statLabel: {
    fontSize: 12,
    color: "gray",
  },

  statValue: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 4,
  },

  menuCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",

    ...(Platform.OS === "web"
      ? { boxShadow: "0px 2px 8px rgba(0,0,0,0.1)" }
      : { elevation: 3 }),
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 0.5,
    borderColor: "#e5e7eb",
  },

  menuText: {
    fontSize: 15,
  },

  arrow: {
    color: "gray",
  },
});