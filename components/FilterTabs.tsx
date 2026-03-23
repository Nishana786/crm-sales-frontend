import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const tabs = ["all", "new", "interested", "follow-up", "closed"];

export default function FilterTabs({ selected, onChange }: any) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            selected === tab && styles.activeTab,
          ]}
          onPress={() => onChange(tab)}
        >
          <Text
            style={
              selected === tab ? styles.activeText : styles.text
            }
          >
            {tab.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#5f3dc4",
  },
  text: { color: "#333" },
  activeText: { color: "#fff" },
});