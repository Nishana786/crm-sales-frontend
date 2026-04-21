import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getLeads,
  createLead,
  deleteLeadApi,
  updateLeadApi,
  addNoteApi,
  addPaymentApi,
  addCallApi,
} from "@/src/services/api";
import { useAuth } from "@/src/modules/auth/context/AuthContext"; // ✅ ADD

/* TYPES */
export type LeadStatus = "new" | "interested" | "follow-up" | "closed";

type Note = {
  text: string;
  createdAt: string;
  createdBy: string;
};

type Call = {
  time: string;
  duration: number;
  createdBy: string;
};

type Payment = {
  amount: number;
  createdAt: string;
};

type CallLog = {
  id: string;
  agentId: string;
  leadId: string;
  duration: number;
  createdAt: string;
};

export type Lead = {
  _id?: string;
  name: string;
  phone: string;
  course: string;
  location?: string;
  status?: LeadStatus;
  createdAt?: string;
  createdBy?: string;
  assignedTo?: string | null;
  notes?: Note[];
  calls?: Call[];
  payments?: Payment[];
};

type LeadsContextType = {
  leads: Lead[];
  callLogs: CallLog[];
  loading: boolean;

  fetchLeads: () => Promise<void>;

  addLead: (lead: Lead) => Promise<void>;
  updateLead: (id: string, data: Partial<Lead>) => Promise<void>;
  updateStatus: (id: string, status: LeadStatus) => void;
  deleteLead: (id: string) => Promise<void>;

  addNote: (id: string, note: Note) => Promise<void>;
  addCallHistory: (id: string, call: Call) => Promise<void>;
  addCallLog: (call: CallLog) => void;
  addPayment: (id: string, payment: Payment) => Promise<void>;
};

const LeadsContext = createContext<LeadsContextType | null>(null);

export const LeadsProvider = ({ children }: any) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);

  const { token } = useAuth(); // ✅ GET TOKEN

  /* 🔥 FETCH */
  const fetchLeads = async () => {
    try {
      const res = await getLeads();
      setLeads(res.data || []);
    } catch (e) {
      console.log("FETCH ERROR:", e);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: token ഉണ്ടെങ്കിൽ മാത്രം fetch
  useEffect(() => {
    if (token) {
      fetchLeads();
    }
  }, [token]);

  /* 🔥 ADD */
  const addLead = async (lead: Lead) => {
    try {
      const res = await createLead(lead);
      setLeads((prev) => [res.data, ...prev]);
    } catch (e) {
      console.log("ADD ERROR:", e);
    }
  };

  /* 🔥 UPDATE */
  const updateLead = async (id: string, data: any) => {
    try {
      const res = await updateLeadApi(id, data);

      setLeads((prev) =>
        prev.map((l) =>
          String(l._id) === String(id)
            ? { ...l, ...res.data }
            : l
        )
      );
    } catch (e) {
      console.log("UPDATE ERROR:", e);
    }
  };

  /* 🔥 STATUS */
  const updateStatus = (id: string, status: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) =>
        String(l._id) === String(id) ? { ...l, status } : l
      )
    );
  };

  /* 🔥 DELETE */
  const deleteLead = async (id: string) => {
    try {
      await deleteLeadApi(id);

      setLeads((prev) =>
        prev.filter((l) => String(l._id) !== String(id))
      );
    } catch (e) {
      console.log("DELETE ERROR:", e);
    }
  };

  /* 🔥 NOTE */
  const addNote = async (id: string, note: Note) => {
    try {
      const res = await addNoteApi(id, note);

      setLeads((prev) =>
        prev.map((l) =>
          String(l._id) === String(id)
            ? { ...l, ...res.data }
            : l
        )
      );
    } catch (e) {
      console.log("NOTE ERROR:", e);
    }
  };

  /* 🔥 CALL */
  const addCallHistory = async (id: string, call: Call) => {
    try {
      const res = await addCallApi(id, call);

      setLeads((prev) =>
        prev.map((l) =>
          String(l._id) === String(id)
            ? { ...l, ...res.data }
            : l
        )
      );
    } catch (e) {
      console.log("CALL ERROR:", e);
    }
  };

  /* 🔥 CALL LOG */
  const addCallLog = (call: CallLog) => {
    setCallLogs((prev) => [...prev, call]);
  };

  /* 🔥 PAYMENT */
  const addPayment = async (id: string, payment: Payment) => {
    try {
      const res = await addPaymentApi(id, payment);

      setLeads((prev) =>
        prev.map((l) =>
          String(l._id) === String(id)
            ? { ...l, ...res.data }
            : l
        )
      );
    } catch (e) {
      console.log("PAYMENT ERROR:", e);
    }
  };

  return (
    <LeadsContext.Provider
      value={{
        leads,
        callLogs,
        loading,
        fetchLeads,
        addLead,
        updateLead,
        updateStatus,
        deleteLead,
        addNote,
        addCallHistory,
        addCallLog,
        addPayment,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
};

export const useLeads = () => {
  const ctx = useContext(LeadsContext);
  if (!ctx) throw new Error("useLeads must be used inside provider");
  return ctx;
};