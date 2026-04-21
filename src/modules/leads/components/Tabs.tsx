import { View, Text, TouchableOpacity } from "react-native";

export default function Tabs({ tab, setTab }: any) {
  const tabs = ["calls", "notes", "payments"];

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      {tabs.map((t) => (
        <TouchableOpacity key={t} onPress={() => setTab(t)}>
          <Text style={{ color: tab === t ? "#2563eb" : "#999" }}>
            {t.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}