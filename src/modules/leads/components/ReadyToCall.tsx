import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useState, useRef } from "react";
import { useLeads } from "@/src/modules/leads/context/LeadsContext";

export default function ReadyToCall({ phone, lead }: any) {
  const { addCallHistory } = useLeads();

  const [callStart, setCallStart] = useState<number | null>(null);
  const [timer, setTimer] = useState(0);

  const intervalRef = useRef<any>(null); 

  // 📞 START CALL
  const handleCall = () => {
    if (!phone) return;

    const start = Date.now();
    setCallStart(start);

    intervalRef.current = setInterval(() => {
      setTimer(Math.floor((Date.now() - start) / 1000));
    }, 1000);

    Linking.openURL(`tel:${phone}`);
  };

  // 🛑 END CALL + SAVE
  const handleEndCall = () => {
    if (!callStart) return;

    clearInterval(intervalRef.current); 

    const duration = Math.floor((Date.now() - callStart) / 1000);

    addCallHistory(lead._id, {
      duration,
      time: new Date().toISOString(),
      createdBy: "me",
    });

    setCallStart(null);
    setTimer(0);
  };

  // 💬 WHATSAPP
  const handleWhatsApp = () => {
    if (!phone) return;
    const clean = phone.replace(/\D/g, "");
    Linking.openURL(`https://wa.me/${clean}`);
  };

  return (
    <View style={styles.card}>
      
      {/* LEFT */}
      <View>
        <Text style={styles.title}>Ready to Call</Text>
        <Text style={styles.timer}>{timer}s</Text>
      </View>

      {/* RIGHT BUTTONS */}
      <View style={styles.actions}>
        
        {!callStart ? (
          <TouchableOpacity onPress={handleCall} style={styles.callBtn}>
            <Ionicons name="call" size={20} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleEndCall} style={styles.endBtn}>
            <Ionicons name="call" size={20} color="#fff" />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleWhatsApp} style={styles.whatsappBtn}>
          <Ionicons name="logo-whatsapp" size={20} color="#fff" />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2563eb",
    padding: 18,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  timer: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  callBtn: {
    backgroundColor: "#1e40af",
    padding: 12,
    borderRadius: 20,
  },

  endBtn: {
    backgroundColor: "#dc2626",
    padding: 12,
    borderRadius: 20,
  },

  whatsappBtn: {
    backgroundColor: "#16a34a",
    padding: 12,
    borderRadius: 20,
  },
});