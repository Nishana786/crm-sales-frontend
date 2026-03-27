import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

type LeadStatus = "new" | "interested" | "follow-up" | "closed";
type FilterType = "all" | LeadStatus;

const tabs: FilterType[] = ["all", "new", "interested", "follow-up", "closed"];

type Props = {
  selected: FilterType;
  onChange: (value: FilterType) => void;
};

export default function FilterTabs({ selected, onChange }: Props) {
  return (
    <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{ paddingHorizontal: 10 }}
>
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    {tabs.map((tab) => {
      const isActive = selected === tab;

      return (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, isActive && styles.activeTab]}
          onPress={() => onChange(tab)}
          activeOpacity={0.8}
        >
          <Text style={[styles.text, isActive && styles.activeText]}>
            {tab.toUpperCase()}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",   // ✅ FIX
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  tab: {
    paddingHorizontal: 14,
  paddingVertical: 8,
  borderRadius: 20,
  backgroundColor: "#eee",
  marginRight: 10,
  alignSelf: "flex-start",
  },

  activeTab: {
    backgroundColor: "#4f46e5",
  },

  text: {
    color: "#333",
    fontWeight: "500",
  },

  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
});