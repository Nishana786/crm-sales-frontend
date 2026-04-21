import { COLORS } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useLeads } from "../context/LeadsContext";

type Lead = {
  _id: string;
  name: string;
  phone: string;
  course: string;
  location?: string;
  status?: string;
  assignedTo?: any; 
};

type LeadCardProps = {
  lead: Lead;
  isAdmin?: boolean;
};

export default function LeadCard({ lead, isAdmin }: LeadCardProps) {
  const router = useRouter();
  const { deleteLead } = useLeads();

  if (!lead) return null;

  /* 🔥 FIXED (DB POPULATE SUPPORT) */
  const assignedName =
    typeof lead.assignedTo === "object"
      ? lead.assignedTo?.name
      : "Unassigned";

  const status = (lead.status || "new")
    .toLowerCase()
    .replace(/\s+/g, "-");

  const handleDelete = () => {
    if (!lead?._id) return;

    Alert.alert("Delete Lead", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteLead(lead._id),
      },
    ]);
  };

  const handleOpen = () => {
    if (!lead?._id) return;
    router.push(`/lead/${lead._id}`);
  };

  const handleEdit = () => {
    if (!lead?._id) return;
    router.push(`/add?id=${lead._id}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleOpen}>
      <View style={styles.topRow}>
        <Text style={styles.name}>{lead.name}</Text>

        <View
          style={[
            styles.statusBadge,
            statusStyles[status as keyof typeof statusStyles] ||
              statusStyles.new,
          ]}
        >
          <Text style={styles.statusText}>{status.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <Ionicons name="call-outline" size={14} color="#3b82f6" />
        <Text style={styles.metaText}>{lead.phone}</Text>
      </View>

      <View style={styles.metaRow}>
        <Ionicons name="school-outline" size={14} color="#6b7280" />
        <Text style={styles.metaText}>{lead.course}</Text>

        {lead.location && (
          <>
            <Ionicons
              name="location-outline"
              size={14}
              color="#6b7280"
              style={styles.metaIcon}
            />
            <Text style={styles.metaText}>{lead.location}</Text>
          </>
        )}
      </View>

      {/* 🔥 ASSIGNED */}
      {lead.assignedTo && (
        <View style={styles.assignedRow}>
          <Ionicons name="person-outline" size={14} color="#059669" />
          <Text style={styles.assignedText}>
            Assigned → {assignedName}
          </Text>
        </View>
      )}

      {isAdmin && (
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete}>
            <Text style={styles.delete}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontWeight: "700",
    fontSize: 16,
    color: COLORS.text,
  },
  statusBadge: {
    borderRadius: 999,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  statusText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  metaText: {
    marginLeft: 6,
    color: COLORS.subText,
    fontSize: 13,
  },
  metaIcon: {
    marginLeft: 14,
  },
  assignedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  assignedText: {
    marginLeft: 6,
    color: "#059669",
    fontWeight: "600",
    fontSize: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 15,
  },
  edit: {
    color: "#2563eb",
    fontWeight: "600",
  },
  delete: {
    color: "#dc2626",
    fontWeight: "600",
  },
});

const statusStyles = StyleSheet.create({
  new: { backgroundColor: "#2563eb" },
  interested: { backgroundColor: "#10b981" },
  "follow-up": { backgroundColor: "#f59e0b" },
  closed: { backgroundColor: "#ef4444" },
});