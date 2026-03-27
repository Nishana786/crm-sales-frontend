import React, { createContext, useContext, useState } from "react";
import { initialLeads } from "../../../data/leads";

export type LeadStatus = "new" | "interested" | "follow-up" | "closed";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  course: string;
  status: LeadStatus;
  notes?: string;
  amount?: number;
  paymentStatus?: "paid" | "pending";
  createdAt: string;
};

type LeadsContextType = {
  leads: Lead[];
  addLead: (lead: Lead) => void;
  updateStatus: (id: string, status: LeadStatus) => void;
  updateLead: (id: string, data: Partial<Lead>) => void;
};

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export const LeadsProvider = ({ children }: { children: React.ReactNode }) => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  const addLead = (lead: Lead) => {
    setLeads((prev) => [...prev, lead]);
  };

  const updateStatus = (id: string, status: LeadStatus) => {
    setLeads((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };
  const updateLead = (id: string, updatedData: Partial<Lead>) => {
  setLeads((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, ...updatedData } : item
    )
  );
};

  return (
 <LeadsContext.Provider
  value={{
    leads,
    addLead,
    updateStatus,
    updateLead, // ✅ THIS LINE ADD ചെയ്യണം
  }}
>
      {children}
    </LeadsContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadsContext);
  if (!context) throw new Error("Wrap app with LeadsProvider");
  return context;
};