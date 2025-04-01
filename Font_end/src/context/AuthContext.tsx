import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { cloneDeep } from "lodash";

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
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser({
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          phoneNumber: decoded.phoneNumber,
          role: decoded.role,
          gender: decoded.gender,
          userImage: decoded.userImage,
        });

        // Tính thời gian hết hạn token
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

  // Hàm đăng nhập
  const login = (newToken: string) => {
    localStorage.setItem("access_token", newToken);
    setToken(newToken);
  };

  // Hàm đăng xuất
  const logout = () => {
    const userData = cloneDeep(user);
    localStorage.removeItem("access_token");
    setToken(null);
    setUser(null);
    if (userData?.role === "admin") {
      window.location.href = "/"; // Chuyển về trang login
    } else {
      window.location.href = "/login"; // Chuyển về trang login
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth phải dùng trong AuthProvider!");
  return context;
};
