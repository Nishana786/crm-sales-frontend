import { Lead } from "../modules/leads/store/LeadsContext";

export const initialLeads: Lead[] = [
  {
    id: "1",
    name: "Rahul",
    course: "10th",
    phone: "9876543210",
    status: "closed",
    amount: 5000,
    paymentStatus: "paid",
     createdAt: new Date().toISOString()

  },
  {
    id: "2",
    name: "Aisha",
    course: "+2",
    phone: "9123456780",
    status: "interested",
    paymentStatus: "pending",
     createdAt: new Date().toISOString()
  },
  {
    id: "3",
    name: "Arjun",
    course: "Crash Course",
    phone: "9012345678",
    status: "follow-up",
    paymentStatus: "pending",
     createdAt: new Date().toISOString()
  },
];