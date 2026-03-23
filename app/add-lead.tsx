import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useLeads } from "../context/LeadsContext";

/* OPTIONS */
const courses = ["Plus One", "Plus Two", "Crash Course"];
const sources = ["YouTube", "WhatsApp", "Instagram", "Referral"];
const agents = ["Rahul", "Akhil", "Nisha"];

export default function AddLead() {
  const router = useRouter();
  const { addLead } = useLeads();

  /* REQUIRED */
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  /* IMPORTANT */
  const [course, setCourse] = useState(courses[0]);
  const [source, setSource] = useState(sources[0]);
  const [agent, setAgent] = useState(agents[0]);

  /* CRM CORE */
  const [followUpDate, setFollowUpDate] = useState("");
  const [notes, setNotes] = useState("");

  /* SAVE */
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
      source,
      agent,
      status: "new", // ✅ auto set
      followUpDate,
      notes,
    });

    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Lead</Text>

      <View style={styles.card}>
        {/* NAME */}
        <TextInput
          style={styles.input}
          placeholder="Name *"
          value={name}
          onChangeText={setName}
        />

        {/* PHONE */}
        <TextInput
          style={styles.input}
          placeholder="Phone *"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        {/* COURSE */}
        <Text style={styles.label}>Course</Text>
        <TextInput
          style={styles.input}
          value={course}
          onChangeText={setCourse}
        />

        {/* SOURCE */}
        <Text style={styles.label}>Source</Text>
        <TextInput
          style={styles.input}
          value={source}
          onChangeText={setSource}
        />

        {/* AGENT */}
        <Text style={styles.label}>Agent</Text>
        <TextInput
          style={styles.input}
          value={agent}
          onChangeText={setAgent}
        />

        {/* FOLLOW-UP DATE */}
        <Text style={styles.label}>Follow-up Date</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={followUpDate}
          onChangeText={setFollowUpDate}
        />

        {/* NOTES */}
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Notes"
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        {/* SAVE */}
        <TouchableOpacity style={styles.btn} onPress={handleSave}>
          <Text style={styles.btnText}>Save Lead</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 15,
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    elevation: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: "#fafafa",
  },

  label: {
    fontWeight: "600",
    marginBottom: 5,
  },

  btn: {
    backgroundColor: "#6366f1",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});