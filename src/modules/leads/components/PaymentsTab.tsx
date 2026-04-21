import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function PaymentsTab({ lead, addPayment }: any) {
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <View style={styles.container}>

      {/* INPUT */}
      <View style={styles.inputRow}>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="Amount"
          style={styles.input}
        />

        <TextInput
          value={desc}
          onChangeText={setDesc}
          placeholder="Description"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            if (!amount) return;
addPayment(lead._id, {
  amount: Number(amount),
  createdAt: new Date().toISOString(),
});

            setAmount("");
            setDesc("");
          }}
        >
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* LIST */}
      {lead.payments?.map((p: any, i: number) => (
        <View key={i} style={styles.card}>
         <Text>₹{p.amount}</Text>
<Text>{new Date(p.createdAt).toLocaleString()}</Text>
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
    gap: 6,
    marginBottom: 12,
  },

  input: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 10,
    borderRadius: 10,
  },

  addBtn: {
    backgroundColor: "#059669",
    padding: 10,
    borderRadius: 10,
  },

  card: {
    backgroundColor: "#ecfdf5",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  amount: {
    fontWeight: "700",
    color: "#059669",
  },

  desc: {
    color: "#444",
  },
});