import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LeadInfoCard({ lead }: any) {
  return (
    <View style={styles.card}>
      
      {/* TOP SECTION */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.status}>{lead.status?.toUpperCase()}</Text>
          <Text style={styles.name}>{lead.name}</Text>
          <Text style={styles.phone}>{lead.phone}</Text>
        </View>

        <View style={styles.avatar}>
          <Ionicons name="person" size={20} color="#fff" />
        </View>
      </View>

      {/* DIVIDER */}
      <View style={styles.divider} />

      {/* INFO GRID */}
      <View style={styles.grid}>
        
        <View style={styles.item}>
          <Ionicons name="school-outline" size={16} color="#888" />
          <View>
            <Text style={styles.label}>COURSE</Text>
            <Text style={styles.value}>{lead.course}</Text>
          </View>
        </View>

        <View style={styles.item}>
          <Ionicons name="location-outline" size={16} color="#888" />
          <View>
            <Text style={styles.label}>LOCATION</Text>
            <Text style={styles.value}>{lead.location || "-"}</Text>
          </View>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
  },

  status: {
    fontSize: 11,
    color: "#2563eb",
    fontWeight: "600",
    marginBottom: 2,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },

  phone: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "#f1f5f9",
    marginVertical: 14,
  },

  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  item: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  label: {
    fontSize: 10,
    color: "#999",
    fontWeight: "600",
  },

  value: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
});