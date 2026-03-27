import { Stack } from "expo-router";
import { LeadsProvider } from "../modules/leads/store/LeadsContext";

export default function RootLayout() {
  return (
    <LeadsProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </LeadsProvider>
  );
}