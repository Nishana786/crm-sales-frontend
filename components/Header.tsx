import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";

export default function Header() {
  const router = useRouter();
  const path = usePathname();

  const tabs = [
    { name: "Leads", route: "/(tabs)" },
    { name: "Stats", route: "/(tabs)/stats" },
    { name: "Analytics", route: "/(tabs)/analytics" },
    { name: "Profile", route: "/(tabs)/profile" },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity key={tab.name} onPress={() => router.push(tab.route)}>
          <Text style={[styles.text, path === tab.route && styles.active]}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  active: {
    color: "#6366f1",
    fontWeight: "bold",
  },
});