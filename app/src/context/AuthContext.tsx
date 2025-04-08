import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Tipagem do usuário autenticado
interface User {
  cpf: string;
  email: string;
  tipo: number; // Adicionado
}

interface AuthContextType {
  user: User | null;
  login: (token: string, tipo: number) => void; // Ajustado para incluir tipo
  logout: () => void;
  isAuthenticated: () => boolean;
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
        setUser({ cpf: payload.cpf, email: payload.email, tipo: payload.tipo }); // Ajustado para incluir tipo
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        logout();
      }
    }
  }, []);

  // Função para login
  const login = async (token: string, tipo: number) => { // Ajustado para incluir tipo
    try {
      localStorage.setItem("token", token);
      const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica o token JWT
      console.log("Login bem-sucedido. Token armazenado:", payload);
      setUser({ cpf: payload.cpf, email: payload.email, tipo }); // Armazena o tipo no estado do usuário

      // Redireciona o usuário com base no tipo retornado pela API
      if (tipo === 2) {
        window.location.href = "/pagina-teste"; // Redireciona para a página 'teste'
      } else if (tipo === 1) {
        window.location.href = "/pagina-principal"; // Redireciona para a página principal
      }
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

  // Função para verificar se o usuário está autenticado
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Nenhum token encontrado no localStorage.");
      return false;
    }

    try {
      const { exp } = JSON.parse(atob(token.split(".")[1]));
      const isValid = Date.now() < exp * 1000;
      console.log("Token válido:", isValid);
      return isValid; // Verifica se o token não expirou
    } catch (error) {
      console.error("Erro ao validar o token:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
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
