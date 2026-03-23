import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useLeads, LeadStatus } from "../../context/LeadsContext";

export default function DetailPage() {
  const { id } = useLocalSearchParams();
  const { leads, updateStatus } = useLeads();

  const leadId = Array.isArray(id) ? id[0] : id;

  const lead = leads.find((item) => item.id === leadId);

  if (!lead) {
    return <Text>Lead not found</Text>;
  }

  const handleCall = async () => {
    const url = `tel:${lead.phone}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔙 Close */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.close}>Close</Text>
      </TouchableOpacity>

      {/* 👤 Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {lead.name.charAt(0)}
        </Text>
      </View>

      {/* 👤 Name */}
      <Text style={styles.name}>{lead.name}</Text>
      <Text style={styles.company}>{lead.company}</Text>

      {/* 📞 CONTACT */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CONTACT INFORMATION</Text>

        <View style={styles.contactBox}>
          {/* PHONE */}
          <View style={styles.contactRow}>
            <View style={styles.iconBox}>
              <Text>📞</Text>
            </View>
            <View>
              <Text style={styles.label}>PHONE</Text>
              <Text style={styles.value}>{lead.phone}</Text>
            </View>
          </View>

          {/* EMAIL */}
          <View style={styles.contactRow}>
            <View style={styles.iconBox}>
              <Text>✉️</Text>
            </View>
            <View>
              <Text style={styles.label}>EMAIL</Text>
              <Text style={styles.value}>john@tech.com</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 🔄 STATUS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>UPDATE STATUS</Text>

        <View style={styles.statusRow}>
          {["new", "interested", "follow-up", "closed"].map(
            (status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusBtn,
                  lead.status === status && styles.activeStatus,
                ]}
                onPress={() =>
                  updateStatus(leadId, status as LeadStatus)
                }
              >
                <Text
                  style={{
                    color:
                      lead.status === status ? "#fff" : "#333",
                    fontWeight: "600",
                  }}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>

      {/* 📞 CALL BUTTON */}
      <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
        <Text style={styles.callText}>Call Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f6fa",
  },

  close: {
    color: "#4f46e5",
    marginBottom: 10,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 25,
    backgroundColor: "#e0e7ff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  avatarText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4f46e5",
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
  },

  company: {
    textAlign: "center",
    color: "#777",
    marginBottom: 20,
  },

  section: {
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 12,
    color: "#888",
    marginBottom: 10,
  },

  /* CONTACT BOX */
  contactBox: {
    backgroundColor: "#eef2f7",
    borderRadius: 16,
    padding: 15,
  },

  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  label: {
    fontSize: 10,
    color: "#888",
  },

  value: {
    fontSize: 16,
    fontWeight: "500",
  },

  /* STATUS */
  statusRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  statusBtn: {
    width: "48%",
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    marginBottom: 10,
  },

  activeStatus: {
    backgroundColor: "#4f46e5",
  },

  /* CALL BUTTON */
  callBtn: {
    marginTop: 30,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#4f46e5",
    alignItems: "center",
  },

  callText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});