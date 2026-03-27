import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLeads } from "../modules/leads/store/LeadsContext";

type LeadStatus = "new" | "interested" | "follow-up" | "closed";

export default function AddLead() {
  const router = useRouter();
  const { addLead } = useLeads();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("10th");
  const [status, setStatus] = useState<LeadStatus>("new");
  const [notes, setNotes] = useState("");
 
  const statusOptions: LeadStatus[] = [
    "new",
    "interested",
    "follow-up",
    "closed",
  ];

  const handleSave = () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert("Error", "Name & Phone required");
      return;
    }

    addLead({
      id: Date.now().toString(),
      name,
      phone,
      course,
      status,
      notes,
      createdAt: new Date().toISOString(),
    });

    router.back();
  };
 

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={styles.header}>Add Lead</Text>

      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} />
      <TextInput style={styles.input} placeholder="Course" value={course} onChangeText={setCourse} />

      <Text style={styles.label}>Status</Text>
      <View style={styles.statusContainer}>
        {statusOptions.map((s) => (
          <TouchableOpacity
            key={s}
            onPress={() => setStatus(s)}
            style={[styles.statusBtn, status === s && styles.activeStatus]}
          >
            <Text style={{ color: status === s ? "#fff" : "#000" }}>
              {s}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput style={styles.input} placeholder="Notes" value={notes} onChangeText={setNotes} />

      <TouchableOpacity style={styles.btn} onPress={handleSave}>
        <Text style={{ color: "#fff" }}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: { backgroundColor: "#eee", padding: 12, marginBottom: 12, borderRadius: 10 },
  label: { fontWeight: "600", marginBottom: 8 },
  statusContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 15 },
  statusBtn: { padding: 10, borderRadius: 10, backgroundColor: "#e5e7eb" },
  activeStatus: { backgroundColor: "#2563eb" },
  btn: { backgroundColor: "blue", padding: 15, borderRadius: 10, alignItems: "center" },
});