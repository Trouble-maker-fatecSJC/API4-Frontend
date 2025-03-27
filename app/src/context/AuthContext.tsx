import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Tipagem do usuário autenticado
interface User {
  cpf: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

// Criando o contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provedor de autenticação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Verifica se há um token salvo no localStorage ao carregar o app
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica o token JWT
        console.log("Token encontrado no localStorage:", payload);
        setUser({ cpf: payload.cpf, email: payload.email });
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        logout();
      }
    }
  }, []);

  // Função para login
  const login = (token: string) => {
    try {
      localStorage.setItem("token", token);
      const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica o token JWT
      console.log("Login bem-sucedido. Token armazenado:", payload);
      setUser({ cpf: payload.cpf, email: payload.email });
    } catch (error) {
      console.error("Erro ao armazenar o token:", error);
    }
  };

  // Função para logout
  const logout = () => {
    console.log("Logout realizado. Removendo token...");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
