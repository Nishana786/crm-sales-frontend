import { Stack, Redirect } from "expo-router";
import { AuthProvider, useAuth } from "../modules/auth/context/AuthContext";
import { LeadsProvider } from "../modules/leads/context/LeadsContext";
import { View, ActivityIndicator } from "react-native";

function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }


  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  // ✅ LOGGED IN
  return <Redirect href="/(tabs)" />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <LeadsProvider>
        <RootNavigator />
        <Stack screenOptions={{ headerShown: false }} />
      </LeadsProvider>
    </AuthProvider>
  );
}