import { create } from 'zustand';

export const useAuthDetails = create((set) => ({
  user: null,

  createUser: async (email, name, password) => {
    if (!email || !name || !password) {
      return { success: false, message: 'Please fill all fields' };
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
        credentials: 'include', // Include cookies
      });

      const data = await response.json();

      if (response.ok) {
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
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include cookies
      });

      const data = await response.json();

      if (response.ok) {
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
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies
      });

      if (response.ok) {
        set({ user: null });
        console.log('Logged out successfully');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },

  fetchUser: async () => {
    try {
      const response = await fetch('/api/auth/user', {
        method: 'GET',
        credentials: 'include', // Include cookies
      });

      if (response.ok) {
        const data = await response.json();
        set({ user: data.user });
      } else {
        console.error('Error fetching user');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  },

  isLoggedIn: (state) => !!state.user,
}));

export default useAuthDetails;