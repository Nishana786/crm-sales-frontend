import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  leadId: string;
  currentStatus?: string;
  updateStatus: (id: string, status: any) => void;
};

export default function StatusChanger({
  leadId,
  currentStatus,
  updateStatus,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Status</Text>

      <View style={styles.row}>
        
        <StatusBtn
          label="New"
          color="#2563eb"
          active={currentStatus === "new"}
          onPress={() => updateStatus(leadId, "new")}
        />

        <StatusBtn
          label="Interested"
          color="#10b981"
          active={currentStatus === "interested"}
          onPress={() => updateStatus(leadId, "interested")}
        />

        <StatusBtn
          label="Follow-up"
          color="#f59e0b"
          active={currentStatus === "follow-up"}
          onPress={() => updateStatus(leadId, "follow-up")}
        />

        <StatusBtn
          label="Closed"
          color="#ef4444"
          active={currentStatus === "closed"}
          onPress={() => updateStatus(leadId, "closed")}
        />

      </View>
    </View>
  );
}

/* 🔥 Button */
function StatusBtn({ label, color, onPress, active }: any) {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        { backgroundColor: active ? color : "#e5e7eb" },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.btnText,
          { color: active ? "#fff" : "#111" },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* 🎨 styles */
const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },

  title: {
    fontWeight: "600",
    marginBottom: 8,
    fontSize: 14,
  },

  // ✅ FIXED (NO MORE GAP ISSUE)
  row: {
    flexDirection: "row",
    flexWrap: "wrap", // small screen support
    gap: 8,
  },

  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  btnText: {
    fontSize: 12,
    fontWeight: "600",
  },
});