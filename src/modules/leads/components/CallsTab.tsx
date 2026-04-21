import { View, Text, StyleSheet } from "react-native";

export default function CallsTab({ lead }: any) {
  return (
    <View style={{ marginTop: 10 }}>
      {lead.calls?.length === 0 && (
        <Text style={{ textAlign: "center", color: "#888" }}>
          No call history
        </Text>
      )}

      {lead.calls?.map((c: any, i: number) => (
        <View key={i} style={styles.card}>
          <Text style={styles.duration}>{c.duration}s</Text>
         <Text>
  {new Date(c.createdAt || c.time).toLocaleString()}
</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f1f5f9",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  duration: {
    fontWeight: "bold",
    fontSize: 16,
  },
  time: {
    fontSize: 12,
    color: "#666",
  },
});