import { create } from "zustand";
import axios from "axios";

const useAuth = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/user", { withCredentials: true });
      set({ user: response.data.user });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  },
}));

export default useAuth;