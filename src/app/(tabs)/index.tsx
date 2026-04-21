import { useRouter } from "expo-router";
import { useMemo, useRef, useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../../theme/colors";
import { useAuth } from "../../modules/auth/context/AuthContext";
import FilterTabs from "../../modules/leads/components/FilterTabs";
import LeadCard from "../../modules/leads/components/LeadCard";
import SearchBar from "../../modules/leads/components/SearchBar";
import { useLeads } from "../../modules/leads/context/LeadsContext";
import EmptyState from "../../shared/components/EmptyState";

export default function Home() {
  const { leads, fetchLeads } = useLeads();
  const { user } = useAuth();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  const listRef = useRef<any>(null);

  const role = (user?.role || "").toLowerCase().trim();

  useEffect(() => {
    fetchLeads();
  }, []);

  /* 🔥 FINAL FIX (DB BASED) */
  const filteredLeads = useMemo(() => {
    if (!Array.isArray(leads)) return [];

    return leads.filter((lead) => {
      const name = (lead?.name || "").toLowerCase();
      const status = (lead?.status || "").toLowerCase();

      const matchSearch = name.includes(search.toLowerCase());
      const matchFilter =
        filter === "all" ? true : status === filter.toLowerCase();

      /* 🔥 IMPORTANT FIX */
      const assignedId =
        typeof lead?.assignedTo === "object"
          ? lead.assignedTo?._id
          : lead?.assignedTo;

      const matchUser =
        role === "admin"
          ? true
          : String(assignedId) === String(user?.id);

      return matchSearch && matchFilter && matchUser;
    });
  }, [leads, search, filter, user, role]);

  const getEmptyMessage = () => {
    if (search) return "No results found";
    if (filter !== "all") return "No leads in this category";
    return "No leads available";
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {role === "admin" ? "All Leads" : "My Leads"}
        </Text>

        {role === "admin" && (
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => router.push("/add")}
          >
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        )}
      </View>

      <SearchBar value={search} onChange={setSearch} />

      <View style={{ marginBottom: 10 }}>
        <FilterTabs
          selected={filter}
          onChange={(val) => {
            setFilter(val);
            listRef.current?.scrollToOffset({
              offset: 0,
              animated: true,
            });
          }}
        />
      </View>

      <View style={{ flex: 1 }}>
        {filteredLeads.length === 0 ? (
          <EmptyState message={getEmptyMessage()} />
        ) : (
          <FlatList
            ref={listRef}
            data={filteredLeads}
            keyExtractor={(item, index) =>
              item?._id?.toString() || index.toString()
            }
            renderItem={({ item }) => (
              <LeadCard lead={item} isAdmin={role === "admin"} />
            )}
            contentContainerStyle={{
              paddingTop: 5,
              paddingBottom: 100,
            }}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await fetchLeads();
              setRefreshing(false);
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.text,
  },
  addBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  addText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});