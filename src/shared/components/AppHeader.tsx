import { COLORS } from "@/src/theme/colors";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AppHeader({
  title,
  showBack = false,
  showSearch = false,
}: any) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      {/* TOP */}
      <View style={styles.headerRow}>
        {showBack ? (
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 20 }} />
        )}

        <Text style={styles.title}>{title}</Text>

        <View style={{ width: 20 }} />
      </View>

      {/* SEARCH */}
      {showSearch && (
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#9ca3af"
          style={styles.search}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 12,
  },

  back: {
    fontSize: 22,
    color: COLORS.primary, // 🔵 FIX
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  search: {
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },
});