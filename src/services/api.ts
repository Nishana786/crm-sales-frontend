import AsyncStorage from "@react-native-async-storage/async-storage";

export const BASE_URL = "http://10.214.102.7:5000";

/* 🔐 GET HEADERS */
const getHeaders = async () => {
  const token = await AsyncStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/* 🔥 COMMON RESPONSE HANDLER */
const handleResponse = async (res: Response) => {
  let data;

  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid server response");
  }

  if (!res.ok) {
    console.log("API ERROR:", data);
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

////////////////////////////////////////////////////////
//////////////////// AUTH / USERS //////////////////////
////////////////////////////////////////////////////////

/* 🔥 GET USERS (AGENTS FROM DB) */
export const getUsers = async () => {
  const headers = await getHeaders();

  const res = await fetch(`${BASE_URL}/api/auth/users`, {
    method: "GET",
    headers,
  });

  return handleResponse(res);
};

////////////////////////////////////////////////////////
//////////////////// LEADS //////////////////////////////
////////////////////////////////////////////////////////

/* 🔥 GET LEADS */
export const getLeads = async () => {
  const headers = await getHeaders();

  const res = await fetch(`${BASE_URL}/api/leads`, {
    method: "GET",
    headers,
  });

  return handleResponse(res);
};

/* 🔥 CREATE LEAD */
export const createLead = async (payload: any) => {
  const headers = await getHeaders();

  const res = await fetch(`${BASE_URL}/api/leads`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};

/* 🔥 UPDATE LEAD */
export const updateLeadApi = async (id: string, payload: any) => {
  const headers = await getHeaders();

  const res = await fetch(`${BASE_URL}/api/leads/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};

/* 🔥 DELETE LEAD */
export const deleteLeadApi = async (id: string) => {
  const headers = await getHeaders();

  const res = await fetch(`${BASE_URL}/api/leads/${id}`, {
    method: "DELETE",
    headers,
  });

  return handleResponse(res);
};

////////////////////////////////////////////////////////
//////////////////// SUB ACTIONS ///////////////////////
////////////////////////////////////////////////////////

/* 🔥 ADD NOTE */
export const addNoteApi = async (id: string, payload: any) => {
  const headers = await getHeaders();

  const res = await fetch(`${BASE_URL}/api/leads/${id}/note`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};

/* 🔥 ADD PAYMENT */
export const addPaymentApi = async (id: string, payload: any) => {
  const headers = await getHeaders();

  const res = await fetch(`${BASE_URL}/api/leads/${id}/payment`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};

/* 🔥 ADD CALL */
export const addCallApi = async (id: string, payload: any) => {
  const headers = await getHeaders();

  const res = await fetch(`${BASE_URL}/api/leads/${id}/call`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};