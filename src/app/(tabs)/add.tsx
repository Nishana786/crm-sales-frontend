import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuth } from "../../modules/auth/context/AuthContext";
import { useLeads } from "../../modules/leads/context/LeadsContext";
import { COLORS } from "../../theme/colors";
import { getUsers } from "../../services/api";

export default function AddLead() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const id = params?.id; 
  const isEdit = id && id !== "undefined"; 

  const { addLead, leads, updateLead } = useLeads();
  const { user } = useAuth();

  const role = (user?.role || "").toLowerCase().trim();
  const isAdmin = role === "admin";

  const [users, setUsers] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [location, setLocation] = useState("");
  const [assignedTo, setAssignedTo] = useState<string | null>(null);
  const [showAgents, setShowAgents] = useState(false);

  /* 🔥 LOAD USERS */
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data.filter((u: any) => u.role === "user"));
      } catch (e) {
        console.log("USER LOAD ERROR:", e);
      }
    };

    loadUsers();
  }, []);

  /* 🔥 EDIT / ADD FIX */
  useEffect(() => {
    if (isEdit) {
      const lead = leads.find((l) => String(l._id) === String(id));

      if (lead) {
        setName(lead.name || "");
        setPhone(lead.phone || "");
        setCourse(lead.course || "");
        setLocation(lead.location || "");
        setAssignedTo(
          typeof lead.assignedTo === "object"
            ? lead.assignedTo?._id
            : lead.assignedTo || null
        );
      }
    } else {
      // ✅ IMPORTANT FIX (EMPTY FORM)
      setName("");
      setPhone("");
      setCourse("");
      setLocation("");
      setAssignedTo(null);
    }
  }, [id, leads]);

  /* 🔥 SAVE */
  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name required");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone.trim())) {
      Alert.alert("Error", "Invalid phone");
      return;
    }

    const formattedName = name
      .trim()
      .split(" ")
      .map(
        (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
      )
      .join(" ");

    if (isEdit) {
      await updateLead(id as string, {
        name: formattedName,
        phone: phone.trim(),
        course,
        location,
        assignedTo,
      });
    } else {
      await addLead({
        name: formattedName,
        phone: phone.trim(),
        course,
        location,
        status: "new",
        assignedTo,
        createdBy: user?._id, 
      } as any);
    }

    router.replace("/");
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {isEdit ? "Edit Lead" : "Add Lead"}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Course</Text>
          <TextInput style={styles.input} value={course} onChangeText={setCourse} />

          <Text style={styles.label}>Location</Text>
          <TextInput style={styles.input} value={location} onChangeText={setLocation} />

          {/* 🔥 ASSIGN AGENT */}
          {isAdmin && (
            <>
              <Text style={styles.label}>Assign Agent</Text>

              <TouchableOpacity
                style={styles.selectBox}
                onPress={() => setShowAgents(!showAgents)}
              >
                <Text>
                  {assignedTo
                    ? users.find((u) => u._id === assignedTo)?.name
                    : "Select Agent"}
                </Text>
              </TouchableOpacity>

              {showAgents && (
                <View style={styles.dropdown}>
                  {users.map((u) => (
                    <TouchableOpacity
                      key={u._id}
                      style={styles.agentItem}
                      onPress={() => {
                        setAssignedTo(u._id);
                        setShowAgents(false);
                      }}
                    >
                      <Text>{u.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>
            {isEdit ? "Update Lead" : "Create Lead"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* 🔹 STYLES */
const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { flexDirection: "row", alignItems: "center", padding: 16 },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
    color: COLORS.text,
  },
  card: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  label: { marginTop: 10, marginBottom: 5, fontWeight: "600" },
  input: {
    backgroundColor: "#f1f5f9",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  selectBox: {
    backgroundColor: "#f1f5f9",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  agentItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});