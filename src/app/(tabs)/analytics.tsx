import { ScrollView, StyleSheet, Text, View, Platform } from "react-native";
import { useLeads } from "../../modules/leads/store/LeadsContext";
import AppHeader from "../../shared/components/AppHeader";

export default function Analytics() {
  const { leads } = useLeads();

  const total = leads.length;

  const closed = leads.filter((l) => l.status === "closed").length;

  const conversionRate =
    total === 0 ? 0 : Math.round((closed / total) * 100);

  const pendingFollowUps = leads.filter(
    (l) => l.status === "follow-up"
  ).length;

  const newCount = leads.filter((l) => l.status === "new").length;
  const interested = leads.filter((l) => l.status === "interested").length;
  const followUp = pendingFollowUps;
  const closedCount = closed;

  const totalRevenue = leads
    .filter((l) => l.paymentStatus === "paid")
    .reduce((sum, l) => sum + (l.amount ?? 0), 0);

  return (
    <ScrollView style={styles.container}>
      <AppHeader title="Analytics" />

      <Text style={styles.subtitle}>Performance overview</Text>

      <View style={styles.cardRow}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>TOTAL</Text>
          <Text style={[styles.cardValue, { color: "#2563eb" }]}>
            {total}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>CONVERSION</Text>
          <Text style={[styles.cardValue, { color: "#10b981" }]}>
            {conversionRate}%
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>FOLLOW-UPS</Text>
          <Text style={[styles.cardValue, { color: "#f59e0b" }]}>
            {pendingFollowUps}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Revenue Overview</Text>

        <View style={styles.revenueRow}>
          <View>
            <Text style={styles.label}>TOTAL REVENUE</Text>
            <Text style={styles.amount}>₹{totalRevenue}</Text>
          </View>

          <View>
            <Text style={styles.label}>TODAY</Text>
            <Text style={styles.amount}>₹{totalRevenue}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📈 Lead Distribution</Text>

        {total > 0 ? (
          <>
            <Bar label="New" value={newCount} total={total} color="#3b82f6" />
            <Bar label="Interested" value={interested} total={total} color="#10b981" />
            <Bar label="Follow-up" value={followUp} total={total} color="#f59e0b" />
            <Bar label="Closed" value={closedCount} total={total} color="#ef4444" />
          </>
        ) : (
          <Text style={{ color: "gray" }}>No data available</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Insights</Text>

        {pendingFollowUps > 0 && (
          <Text style={styles.warning}>
            ⚠ {pendingFollowUps} leads need follow-up
          </Text>
        )}

        {conversionRate < 30 && total > 0 && (
          <Text style={styles.danger}>
            📉 Low conversion rate ({conversionRate}%)
          </Text>
        )}

        {conversionRate >= 50 && (
          <Text style={styles.success}>
            🚀 Good conversion performance
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

function Bar({ label, value, total, color }: any) {
  const percent = total === 0 ? 0 : (value / total) * 100;

  return (
    <View style={styles.barRow}>
      <View style={styles.barHeader}>
        <Text style={{ fontWeight: "500" }}>{label}</Text>
        <Text style={{ color: "gray" }}>{value}</Text>
      </View>

      <View style={styles.barBg}>
        <View
          style={[
            styles.barFill,
            { width: `${percent}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#f1f5f9",
    flex: 1,
  },

  subtitle: {
    color: "gray",
    marginBottom: 12,
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  card: {
    backgroundColor: "#fff",
    paddingVertical: 18,
    borderRadius: 16,
    width: "30%",
    alignItems: "center",

    ...(Platform.OS === "web"
      ? { boxShadow: "0px 2px 8px rgba(0,0,0,0.1)" }
      : { elevation: 3 }),
  },

  cardTitle: {
    fontSize: 12,
    color: "gray",
    marginBottom: 4,
  },

  cardValue: {
    fontSize: 22,
    fontWeight: "700",
  },

  section: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,

    ...(Platform.OS === "web"
      ? { boxShadow: "0px 2px 8px rgba(0,0,0,0.1)" }
      : { elevation: 2 }),
  },

  sectionTitle: {
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 12,
  },

  revenueRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    fontSize: 12,
    color: "gray",
  },

  amount: {
    fontSize: 20,
    fontWeight: "700",
  },

  barRow: {
    marginBottom: 12,
  },

  barHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  barBg: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    marginTop: 6,
  },

  barFill: {
    height: 8,
    borderRadius: 10,
  },

  warning: {
    color: "#f59e0b",
    marginBottom: 6,
  },

  danger: {
    color: "#ef4444",
    marginBottom: 6,
  },

  success: {
    color: "#10b981",
  },
});