export let currentUser = {
  id: "",
  role: "" as "admin" | "agent",
};

export const setUser = (user: typeof currentUser) => {
  currentUser.id = user.id;
  currentUser.role = user.role;
};