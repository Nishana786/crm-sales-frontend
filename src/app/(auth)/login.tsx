import { COLORS } from "@/src/theme/colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert, // 
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../modules/auth/context/AuthContext";
import { BASE_URL } from "@/src/services/api";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
  try {
    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password.trim(),
      }),
    });

    const data = await res.json();
    console.log("LOGIN RESPONSE:", data);

    if (!res.ok) {
      Alert.alert("Login Failed", data.message);
      return;
    }

    // ✅ SAVE USER + TOKEN
    await login(
      {
        id: data.data.user._id,
        role: data.data.user.role,
        name: data.data.user.name,
        email: data.data.user.email,
      },
      data.data.token
    );

    console.log("TOKEN:", data.data.token);

    router.replace("/(tabs)");
  } catch (e) {
    console.log(e);
    Alert.alert("Error", "Login failed");
  }
};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.logo}> SalesFlow</Text>
            <Text style={styles.tagline}>
              Manage leads. Close deals faster.
            </Text>
          </View>

          {/* CARD */}
          <View style={styles.card}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            {/* EMAIL */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="admin@gmail.com"
              placeholderTextColor="#9ca3af"
              autoCapitalize="none"
              style={styles.input}
            />

            {/* PASSWORD */}
            <Text style={styles.label}>Password</Text>
            <TextInput
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#9ca3af"
              style={styles.input}
            />

            {/* BUTTON */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            {/* DEMO */}
            <View style={styles.demoBox}>
              <Text style={styles.demoText}>
                Admin: nishana@superhhero.com / Superhhero123
              </Text>
              <Text style={styles.demoText}>
                Agent: agent@gmail.com / 1234
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: "center", 
  },

  container: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: "center",
  },

  header: {
    marginBottom: 20,
  },

  logo: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.primary,
  },

  tagline: {
    color: COLORS.subText,
    marginTop: 5,
  },

  card: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
  },

  subtitle: {
    color: COLORS.subText,
    marginBottom: 15,
  },

  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "600",
    color: COLORS.text,
  },

  input: {
    backgroundColor: "#f1f5f9",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  demoBox: {
    marginTop: 15,
    backgroundColor: "#f1f5f9",
    padding: 10,
    borderRadius: 10,
  },

  demoText: {
    fontSize: 12,
    color: COLORS.subText,
    textAlign: "center",
  },
});