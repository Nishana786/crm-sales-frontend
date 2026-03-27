import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar({ value, onChange }: any) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search leads..."
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});