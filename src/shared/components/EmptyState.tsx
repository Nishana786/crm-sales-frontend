import { View, Text } from "react-native";

export default function EmptyState({ message }: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 40 }}>📭</Text>
      <Text style={{ marginTop: 10 }}>{message}</Text>
      <Text style={{ color: "#9ca3af", fontSize: 12 }}>
        Add new leads to get started
      </Text>
    </View>
  );
}