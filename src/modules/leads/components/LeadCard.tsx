import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
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
        return { bg: "#dbeafe", text: "#2563eb" };
      case "interested":
        return { bg: "#dcfce7", text: "#16a34a" };
      case "follow-up":
        return { bg: "#fef3c7", text: "#d97706" };
      case "closed":
        return { bg: "#fee2e2", text: "#dc2626" };
      default:
        return { bg: "#e5e7eb", text: "#374151" };
    }
  };

  const statusStyle = getStatusStyle(lead.status);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.name}>
            {lead.name}{" "}
            <Text style={styles.classText}>({lead.class})</Text>
          </Text>

          <Text style={styles.phone}>{lead.phone}</Text>
        </View>

        <TouchableOpacity onPress={() => router.push(`/details/${lead.id}`)}>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomRow}>
        <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
          <Text style={[styles.badgeText, { color: statusStyle.text }]}>
            {lead.status}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={handleCall} style={styles.iconBtn}>
            <Text>📞</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push(`/details/${lead.id}`)}
            style={styles.iconBtn}
          >
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,

    ...(Platform.OS === "web"
      ? { boxShadow: "0px 2px 8px rgba(0,0,0,0.1)" }
      : {
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 3,
        }),
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  classText: {
    fontSize: 12,
    color: "#64748b",
  },
  phone: {
    marginTop: 4,
    color: "#64748b",
  },
  arrow: {
    fontSize: 22,
    color: "#94a3b8",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  actions: {
    flexDirection: "row",
  },
  iconBtn: {
    marginLeft: 10,
    backgroundColor: "#f1f5f9",
    padding: 8,
    borderRadius: 10,
  },
});