import { ScrollView, View, Text } from "react-native"; 
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { useLeads } from "../../modules/leads/context/LeadsContext";

import LeadHeader from "../../modules/leads/components/LeadHeader";
import LeadInfoCard from "../../modules/leads/components/LeadInfoCard";
import ReadyToCall from "../../modules/leads/components/ReadyToCall";
import Tabs from "../../modules/leads/components/Tabs";
import NotesTab from "../../modules/leads/components/NotesTab";
import CallsTab from "../../modules/leads/components/CallsTab";
import PaymentsTab from "../../modules/leads/components/PaymentsTab";
import StatusChanger from "../../modules/leads/components/StatusChanger";

export default function LeadDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { leads, addNote, addPayment, updateStatus } = useLeads();

  const lead = leads.find(
    (l) => String(l._id) === String(id)
  );

  const [tab, setTab] = useState("calls");

  
  if (!lead) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 16 }}>
      <LeadHeader name={lead.name} onBack={() => router.back()} />

      <LeadInfoCard lead={lead} />

      <StatusChanger
        leadId={lead._id!}
        currentStatus={lead.status}
        updateStatus={updateStatus}
      />

      <ReadyToCall phone={lead.phone} lead={lead} />

      <Tabs tab={tab} setTab={setTab} />

      {tab === "calls" && <CallsTab lead={lead} />}
      {tab === "notes" && (
        <NotesTab lead={lead} addNote={addNote} />
      )}
      {tab === "payments" && (
        <PaymentsTab lead={lead} addPayment={addPayment} />
      )}
    </ScrollView>
  );
}