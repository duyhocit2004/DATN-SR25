import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { cloneDeep } from "lodash";
import adminApi from "@/api/adminApi";
import { HttpCodeString } from "@/utils/constants";

interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  gender: string;
  userImage: string | null;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string, userData?: any) => void;
  logout: () => void;
  refreshUserInfo: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );
  const [user, setUser] = useState<User | null>(null);

  const fetchUserInfo = async (email: string) => {
    try {
      const response = await adminApi.getUserByEmail({ email });
      if (response?.status === HttpCodeString.SUCCESS) {
        const userData = response.data;
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          role: userData.role,
          gender: userData.gender,
          userImage: userData.userImage,
        });
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const refreshUserInfo = async () => {
    if (user?.email) {
      await fetchUserInfo(user.email);
    }
  };

  useEffect(() => {
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        // Set basic user info from token
        setUser({
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          phoneNumber: decoded.phoneNumber,
          role: decoded.role,
          gender: decoded.gender,
          userImage: decoded.userImage,
        });

        // Fetch complete user info
        fetchUserInfo(decoded.email);

        // Set token expiration
        const expiresIn = decoded.exp * 1000 - Date.now();
        setTimeout(() => {
          logout();
        }, expiresIn);
      } catch (error) {
        console.error("Token không hợp lệ", error);
        logout();
      }
    }
  }, [token]);

  const login = (newToken: string, userData?: any) => {
    localStorage.setItem("access_token", newToken);
    setToken(newToken);
    
    if (userData) {
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phone_number,
        role: userData.role,
        gender: userData.gender,
        userImage: userData.userImage,
      });
    }
  };

  const logout = () => {
    const userData = cloneDeep(user);
    localStorage.removeItem("access_token");
    setToken(null);
    setUser(null);
    if (userData?.role === "admin") {
      window.location.href = "/";
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, refreshUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth phải dùng trong AuthProvider!");
  return context;
};
