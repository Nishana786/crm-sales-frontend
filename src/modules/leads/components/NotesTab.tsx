import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function NotesTab({ lead, addNote }: any) {
  const [note, setNote] = useState("");

  return (
    <View style={styles.container}>

      {/* INPUT */}
      <View style={styles.inputRow}>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Add a note..."
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            if (!note) return;

            addNote(lead._id, {
              text: note,
              createdAt: new Date().toISOString(),
              createdBy: "me",
            });

            setNote("");
          }}
        >
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* NOTES LIST */}
      {lead.notes?.map((n: any, i: number) => (
        <View key={i} style={styles.noteCard}>
          <Text style={styles.noteText}>{n.text}</Text>
          <Text style={styles.date}>
            {new Date(n.createdAt).toLocaleString()}
          </Text>
        </View>
      ))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  input: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 10,
    borderRadius: 10,
  },

  addBtn: {
    marginLeft: 8,
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 10,
  },

  noteCard: {
    backgroundColor: "#f8fafc",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  noteText: {
    fontSize: 14,
    color: "#111",
  },

  date: {
    fontSize: 11,
    color: "#888",
    marginTop: 4,
  },
});