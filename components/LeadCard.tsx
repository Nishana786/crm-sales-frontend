import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";

export default function LeadCard({ lead }: any) {
  const router = useRouter();

  const handleCall = async () => {
    const url = `tel:${lead.phone}`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      alert("Call not supported");
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "new":
        return { backgroundColor: "#e0f2fe" };
      case "interested":
        return { backgroundColor: "#dcfce7" };
      case "follow-up":
        return { backgroundColor: "#fef3c7" };
      case "closed":
        return { backgroundColor: "#e5e7eb" };
      default:
        return {};
    }
  };

  return (
    <View style={styles.card}>
      {/* 🔝 Top Row */}
      <View style={styles.row}>
        <View>
          <Text style={styles.name}>{lead.name}</Text>
          <Text style={styles.company}>{lead.company}</Text>
        </View>

        {/* ✅ STATUS BADGE */}
        <View style={[styles.badge, getStatusStyle(lead.status)]}>
          <Text style={styles.badgeText}>
            {lead.status.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* 🔽 Bottom Row (FIXED UI) */}
      <View style={styles.bottomRow}>
        {/* 📞 Call Button */}
        <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
          <Text style={styles.callText}>📞 Call Now</Text>
        </TouchableOpacity>

        {/* 👉 Navigation Arrow */}
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => router.push(`./details/${lead.id}`)}
        >
          <Text style={styles.navIcon}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontWeight: "bold",
    fontSize: 16,
  },

  company: {
    color: "#777",
    marginTop: 2,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#333",
  },

  /* ✅ NEW */
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  callBtn: {
    flex: 1, // 👈 MAIN FIX
    padding: 12,
    backgroundColor: "#eef2ff",
    borderRadius: 12,
    alignItems: "center",
    marginRight: 10,
  },

  callText: {
    color: "#4f46e5",
    fontWeight: "600",
  },

  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
  },

  navIcon: {
    fontSize: 18,
    color: "#555",
  },
});