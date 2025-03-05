import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import API from "@/data";
import { User } from "@/interfaces";

interface AuthContextType {
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  setAuthenticated: (auth: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  onLogin: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      window.addEventListener("storage", syncLogout);
      const token = Cookies.get("token");
      if (token) {
        try {
          const currentUserResponse = await API.get("users/me?populate=role");
          setUser(currentUserResponse);
          setAuthenticated(true);
        } catch (e) {
          console.error("Error al recuperar usuario", e);
          setAuthenticated(false);
        }
      }
      setIsCheckingAuth(false);
    };

    initializeAuth();

    return () => {
      console.log("Removing storage event");
      window.removeEventListener("storage", syncLogout);
      window.localStorage.removeItem("login");
    };
  }, []);

  const syncLogout = (event: StorageEvent) => {
    if (event.key === "login") {
      window.location.reload();
    }
  };

  const onLogin = async (token: string) => {
    Cookies.set("token", token);
    window.localStorage.setItem("login", "true");
    await refresh();
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setAuthenticated(false);
    window.localStorage.setItem("login", "logout");
    window.location.href = "/";
  };

  const refresh = async () => {
    const token = Cookies.get("token");
    if (!token) return logout();
    try {
      const currentUserResponse = await API.get("users/me?populate=role");
      setUser(currentUserResponse);
      setAuthenticated(true);
    } catch (e) {
      console.error("Error al recuperar usuario", e);
      setAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isCheckingAuth,
        setAuthenticated,
        user,
        setUser,
        logout,
        onLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
