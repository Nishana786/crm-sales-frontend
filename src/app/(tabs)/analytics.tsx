import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "@/src/theme/colors";

import { useAuth } from "../../modules/auth/context/AuthContext";
import { useLeads } from "../../modules/leads/context/LeadsContext";

const INTERACTION_THRESHOLD = 60;

export default function Analytics() {
  const { callLogs } = useLeads();
  const { user } = useAuth();

  const role = user?.role?.toLowerCase()?.trim();

  // 🔥 HARD BLOCK (agent cannot access at all)
  if (!user || role !== "admin") return null;

  const totalCalls = callLogs.length;
  const connectedCalls = callLogs.filter(c => c.duration > 0).length;
  const interactedCalls = callLogs.filter(
    c => c.duration > INTERACTION_THRESHOLD
  ).length;

  const totalDuration = callLogs.reduce((sum, c) => sum + c.duration, 0);

  const avgDuration =
    totalCalls > 0 ? Math.floor(totalDuration / totalCalls) : 0;

  const interactionRate =
    totalCalls > 0
      ? Math.floor((interactedCalls / totalCalls) * 100)
      : 0;

  return (
    <ScrollView style={styles.container}>
      {totalCalls === 0 && (
        <Text style={styles.empty}>No analytics data yet</Text>
      )}

      <View style={styles.row}>
        <StatCard label="Total Calls" value={totalCalls} />
        <StatCard label="Connected" value={connectedCalls} />
      </View>

      <View style={styles.row}>
        <StatCard label="Interacted" value={interactedCalls} />
        <StatCard label="Interaction %" value={`${interactionRate}%`} />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Avg Duration</Text>
        <Text style={styles.value}>
          {Math.floor(avgDuration / 60)}m {avgDuration % 60}s
        </Text>
      </View>
    </ScrollView>
  );
}

/* 🔹 CARD */
function StatCard({ label, value }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: COLORS.subText,
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },

  card: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 12,
  },

  label: {
    color: COLORS.subText,
    fontSize: 12,
  },

  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: 5,
  },
});