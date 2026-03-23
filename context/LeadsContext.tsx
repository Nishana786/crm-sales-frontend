import React, { createContext, useContext, useState } from "react";
import { initialLeads } from "../data/leads";

/* TYPES */
export type LeadStatus = "new" | "interested" | "follow-up" | "closed";

export type Lead = {
  id: string;
  name: string;
  company: string;
  phone: string;
  status: LeadStatus;
};

type LeadsContextType = {
  leads: Lead[];
  addLead: (lead: Lead) => void;
  updateStatus: (id: string, status: LeadStatus) => void;
};

const LeadsContext = createContext<LeadsContextType | undefined>(
  undefined
);

export const LeadsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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

  return (
    <LeadsContext.Provider value={{ leads, addLead, updateStatus }}>
      {children}
    </LeadsContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadsContext);
  if (!context) throw new Error("Wrap app with LeadsProvider");
  return context;
};