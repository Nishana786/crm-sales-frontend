import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";

export default function AppHeader({
  title,
  showBack = false,
  showSearch = false,
}: any) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      {/* TOP ROW */}
      <View style={styles.headerRow}>
        {showBack ? (
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.back}>‹</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 20 }} />
        )}

        {title && <Text style={styles.title}>{title}</Text>}

        <View style={{ width: 20 }} />
      </View>

      {/* SEARCH */}
      {showSearch && (
        <TextInput
          placeholder="Search leads..."
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
    marginBottom: 10,
  },

  back: {
    fontSize: 22,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
  },

  search: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
  },
});