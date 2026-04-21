import { COLORS } from "@/src/theme/colors";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuth } from "../../modules/auth/context/AuthContext";
import { useLeads } from "../../modules/leads/context/LeadsContext";

const INTERACTION_THRESHOLD = 60;

export default function CallStats() {
  const { callLogs } = useLeads();

  const { user, agents } = useAuth(); 

  const [dateFilter, setDateFilter] = useState("today");
  const [timeFilter, setTimeFilter] = useState("full");
  const [sortBy, setSortBy] = useState("name");

  const filteredLogs = callLogs.filter((log) => {
    const logDate = new Date(log.createdAt);
    const now = new Date();

    if (user?.role === "agent" && log.agentId !== user.id) {
      return false;
    }

    if (dateFilter === "today") {
      if (logDate.toDateString() !== now.toDateString()) return false;
    }

    if (dateFilter === "yesterday") {
      const y = new Date();
      y.setDate(y.getDate() - 1);
      if (logDate.toDateString() !== y.toDateString()) return false;
    }

    if (timeFilter === "morning") {
      const h = logDate.getHours();
      if (h < 9 || h > 12) return false;
    }

    return true;
  });

  const agentStats: any = {};

  filteredLogs.forEach((c) => {
    if (!c.agentId) return;

    if (!agentStats[c.agentId]) {
      agentStats[c.agentId] = {
        total: 0,
        connected: 0,
        interacted: 0,
        duration: 0,
      };
    }

    agentStats[c.agentId].total += 1;
    agentStats[c.agentId].duration += c.duration;

    if (c.duration > 0) agentStats[c.agentId].connected += 1;
    if (c.duration > INTERACTION_THRESHOLD)
      agentStats[c.agentId].interacted += 1;
  });

  let agentList = Object.keys(agentStats).map((id) => {
    const agent = agents.find((a) => String(a.id) === String(id)); // ✅ small safe fix
    const data = agentStats[id];

    return {
      id,
      name: agent?.name || id,
      total: data.total,
      connected: data.connected,
      interacted: data.interacted,
      avg: data.total > 0 ? Math.floor(data.duration / data.total) : 0,
    };
  });

  if (user?.role === "agent") {
    agentList = agentList.filter((a) => a.id === user.id);
  }

  const sortedList = [...agentList].sort((a, b) => {
    if (sortBy === "calls") return b.total - a.total;
    if (sortBy === "duration") return b.avg - a.avg;
    return a.name.localeCompare(b.name);
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.filterRow}>
        <TouchableOpacity onPress={() => setDateFilter("today")}>
          <Text style={styles.filter}>Today</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setDateFilter("yesterday")}>
          <Text style={styles.filter}>Yesterday</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setTimeFilter("morning")}>
          <Text style={styles.filter}>Morning</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSortBy("calls")}>
          <Text style={styles.filter}>Sort Calls</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSortBy("duration")}>
          <Text style={styles.filter}>Sort Duration</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>
        {user?.role === "admin" ? "All Agents Stats" : "My Performance"}
      </Text>

      <View style={styles.tableHeader}>
        <Text style={styles.head}>Name</Text>
        <Text style={styles.head}>Calls</Text>
        <Text style={styles.head}>Interacted</Text>
        <Text style={styles.head}>Avg</Text>
      </View>

      {sortedList.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No Data Available
        </Text>
      )}

      {sortedList.map((a, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.cell}>{a.name}</Text>

          <Text style={styles.cell}>
            {a.total} ({a.connected})
          </Text>

          <Text style={styles.cell}>{a.interacted}</Text>

          <Text style={styles.cell}>
            {Math.floor(a.avg / 60)}m {a.avg % 60}s
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 15,
  },
  filter: {
    backgroundColor: "#e5e7eb",
    padding: 8,
    borderRadius: 8,
    fontSize: 12,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 8,
  },
  head: {
    fontWeight: "bold",
    fontSize: 12,
    width: "25%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  cell: {
    width: "25%",
    fontSize: 12,
  },
});