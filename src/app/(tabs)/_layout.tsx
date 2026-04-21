import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../../modules/auth/context/AuthContext";

export default function TabsLayout() {
  const { user, loading } = useAuth();

  // 🔄 Loading state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

 
  if (!user) return null;

  const role = (user?.role || "").toLowerCase().trim();
  const isAdmin = role === "admin";

  return (
    <Tabs
      key={role}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4f46e5",
      }}
    >
      {/* 🔹 LEADS */}
      <Tabs.Screen
        name="index"
        options={{
          title: isAdmin ? "All Leads" : "My Leads",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 🔹 ANALYTICS (ADMIN ONLY) */}
      {isAdmin && (
        <Tabs.Screen
          name="analytics"
          options={{
            title: "Analytics",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bar-chart-outline" size={size} color={color} />
            ),
          }}
        />
      )}

      {/* 🔹 CALL STATS */}
      <Tabs.Screen
        name="call-stats"
        options={{
          title: "Call Stats",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 🔹 PROFILE */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 🔹 HIDDEN */}
      <Tabs.Screen name="add" options={{ href: null }} />
    </Tabs>
  );
}