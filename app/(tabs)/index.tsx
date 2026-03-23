import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";

import { useLeads } from "../../context/LeadsContext";
import LeadCard from "../../components/LeadCard";
import SearchBar from "../../components/SearchBar";
import FilterTabs from "../../components/FilterTabs";

export default function Home() {
  const { leads } = useLeads();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredLeads = leads.filter((lead) => {
    const matchSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "all" ? true : lead.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <View style={styles.container}>
      {/* PAGE HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>My Leads</Text>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.push("/add-lead")}
        >
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      <SearchBar value={search} onChange={setSearch} />
      <FilterTabs selected={filter} onChange={setFilter} />

      <FlatList
        data={filteredLeads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LeadCard lead={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f6fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});