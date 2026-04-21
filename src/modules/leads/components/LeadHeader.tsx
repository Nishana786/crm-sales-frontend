import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LeadHeader({ name, onBack }: any) {
  return (
    <View style={styles.container}>
      
      {/* LEFT: BACK */}
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={22} color="#111" />
      </TouchableOpacity>

      {/* TITLE */}
      <Text style={styles.title} numberOfLines={1}>
        {name}
      </Text>

      {/* RIGHT ICON */}
      <View style={styles.iconBox}>
        <Ionicons name="person-outline" size={18} color="#fff" />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginBottom: 12,
  },

  backBtn: {
    padding: 6,
  },

  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
    color: "#111",
  },

  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
  },
});