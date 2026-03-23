import { Stack } from "expo-router";
import { LeadsProvider } from "../context/LeadsContext";

export default function RootLayout() {
  return (
    <LeadsProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </LeadsProvider>
  );
}