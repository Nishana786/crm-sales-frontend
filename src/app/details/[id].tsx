import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLeads } from "../../modules/leads/store/LeadsContext";

type LeadStatus = "new" | "interested" | "follow-up" | "closed";

export default function DetailPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { leads, updateStatus, updateLead } = useLeads();

  const lead = leads.find((l) => String(l.id) === String(id));

  const [status, setStatus] = useState<LeadStatus>(
    (lead?.status as LeadStatus) || "new"
  );
  const [notes, setNotes] = useState("");

  const [showStatus, setShowStatus] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  if (!lead) return <Text>Not found</Text>;

  const handleCall = () => Linking.openURL(`tel:${lead.phone}`);
  const handleWhatsApp = () =>
    Linking.openURL(`https://wa.me/${lead.phone}`);

  const handleSave = () => {
    updateStatus(lead.id, status); // ✅ FIXED
    alert("Updated");
  };

  const updatePayment = (paymentStatus: "paid" | "pending") => {
    updateLead(lead.id, { paymentStatus });
  };

  const statusOptions: LeadStatus[] = [
    "new",
    "interested",
    "follow-up",
    "closed",
  ];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Lead Detail</Text>

        <View style={{ width: 20 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* PROFILE */}
        <View style={styles.card}>
          <View>
            <Text style={styles.name}>{lead.name}</Text>
            <Text style={styles.phone}>{lead.phone}</Text>

            <View style={styles.badgeRow}>
              <Text style={styles.classBadge}>10th</Text>
              <Text style={styles.statusBadge}>{lead.status}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
            <Text style={{ color: "#fff", fontSize: 18 }}>📞</Text>
          </TouchableOpacity>
        </View>

        {/* INTERACTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Log New Interaction</Text>

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Duration</Text>
              <TextInput value="02:30" style={styles.input} />
            </View>

            {/* STATUS */}
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.label}>Status</Text>

              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowStatus((prev) => !prev)}
              >
                <Text>{status}</Text>
                <Text>▼</Text>
              </TouchableOpacity>

              {showStatus && (
                <View style={styles.dropdownList}>
                  {statusOptions.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setStatus(item); // ✅ FIXED
                        setShowStatus(false);
                      }}
                    >
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          <Text style={styles.label}>Notes</Text>
          <TextInput
            placeholder="What happened on the call?"
            value={notes}
            onChangeText={setNotes}
            style={[styles.input, { height: 60 }]}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.updateBtn} onPress={handleSave}>
              <Text style={styles.btnText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.whatsappBtn}
              onPress={handleWhatsApp}
            >
              <Text style={styles.btnText}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* PAYMENT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Status</Text>

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowPayment((prev) => !prev)}
          >
            <Text>{lead.paymentStatus || "pending"}</Text>
            <Text>▼</Text>
          </TouchableOpacity>

          {showPayment && (
            <View style={styles.dropdownList}>
              {["paid", "pending"].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.dropdownItem}
                  onPress={() => {
                    updatePayment(item as "paid" | "pending");
                    setShowPayment(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9" },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
  },
  back: { fontSize: 22 },
  headerTitle: { fontWeight: "600" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: { fontSize: 18, fontWeight: "bold" },
  phone: { color: "#64748b" },
  badgeRow: { flexDirection: "row", marginTop: 8 },
  classBadge: {
    backgroundColor: "#dbeafe",
    padding: 6,
    borderRadius: 8,
    marginRight: 6,
  },
  statusBadge: {
    backgroundColor: "#e0e7ff",
    padding: 6,
    borderRadius: 8,
  },
  callBtn: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 14,
  },
  section: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginTop: 12,
  },
  sectionTitle: { fontWeight: "bold", marginBottom: 10 },
  label: { fontSize: 12, color: "#64748b" },
  input: {
    backgroundColor: "#f1f5f9",
    padding: 10,
    borderRadius: 10,
  },
  row: { flexDirection: "row", marginBottom: 10 },
  buttonRow: { flexDirection: "row", marginTop: 12 },
  updateBtn: {
    flex: 1,
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 12,
    marginRight: 8,
    alignItems: "center",
  },
  whatsappBtn: {
    flex: 1,
    backgroundColor: "#22c55e",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "600" },
  dropdown: {
    backgroundColor: "#f1f5f9",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  dropdownList: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 4,
    padding: 6,
  },
  dropdownItem: {
    padding: 10,
  },
});