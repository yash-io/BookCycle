import { create } from 'zustand';
import axios from 'axios';
export const useAuthDetails = create((set) => ({
  user: null,

  createUser: async (email, name, password) => {
    if (!email || !name || !password) {
      return { success: false, message: 'Please fill all fields' };
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', 
        { email, password, name }, 
        { withCredentials: true } // Include cookies
      );

      const data = response.data;

      if (response.status >= 200 && response.status < 300) {
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message || 'Signup failed' };
    } catch (error) {
      return { success: false, message: 'Failed to create user' };
    }
  },

  loginUser: async (email, password) => {
    if (!email || !password) {
      return { success: false, message: 'Please fill all fields' };
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', 
        { email, password }, 
        { withCredentials: true } // Include cookies
      );

      const data = response.data;
      if (response.status >= 200 && response.status < 300) {
        set({ user: data.user });
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message || 'Login failed' };
    } catch (error) {
      return { success: false, message: 'Failed to log in' };
    }
  },

  logoutUser: async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      set({ user: null });
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },
  fetchUser: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/user", { withCredentials: true });
      set({ user: response.data.user });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  },
  isLoggedIn: (state) => !!state.user,
}));

export default useAuthDetails;
