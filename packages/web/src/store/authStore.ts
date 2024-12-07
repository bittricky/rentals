import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Viewer {
  id?: string;
  token?: string;
  avatar?: string;
  name?: string;
  didRequest: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  setViewer: (viewer: Viewer) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  
  setUser: (user) => set({ user, isAuthenticated: Boolean(user)}),
  
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    set({ token });
  },
  
  login: (token, user) => {
    localStorage.setItem('token', token);
    set({ token, user, isAuthenticated: true });
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },
  
  updateUser: (data) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    })),

  setViewer: (viewer) => {
    if (viewer.token) {
      localStorage.setItem('token', viewer.token);
      set({
        token: viewer.token,
        user: viewer.name ? {
          id: viewer.id!,
          name: viewer.name,
          email: viewer.email || '',
          avatar: viewer.avatar,
        } : null,
        isAuthenticated: Boolean(viewer.name)
      });
    } else {
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false });
    }
  }
}));

export default useAuthStore;