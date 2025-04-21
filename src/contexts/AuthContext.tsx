import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { env } from '@/config/env';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<string>;
  verifyOTP: (userId: string, otp: string) => Promise<void>;
  resendOTP: (userId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize auth state only once on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    setLoading(false);
  }, []);

  // Memoize functions to prevent unnecessary re-renders
  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await axios.post(`${env.API_URL}/login`, {
        email,
        password
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setIsAuthenticated(true);
      setUser(user);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<string> => {
    try {
      const response = await axios.post(`${env.API_URL}/register`, {
        name,
        email,
        password
      });
      return response.data.userId;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }, []);

  const verifyOTP = useCallback(async (userId: string, otp: string) => {
    try {
      await axios.post(`${env.API_URL}/verify-otp`, {
        userId,
        otp
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'OTP verification failed');
    }
  }, []);

  const resendOTP = useCallback(async (userId: string) => {
    try {
      await axios.post(`${env.API_URL}/resend-otp`, {
        userId
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to resend OTP');
    }
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => ({
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    register,
    verifyOTP,
    resendOTP
  }), [isAuthenticated, user, loading, login, logout, register, verifyOTP, resendOTP]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 