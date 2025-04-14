import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";// Importa o AuthProvider
import AppRoutes from "./routes/Router";
import { MedidasProvider } from './context/MedidasContext';

export default function App() {
  return (
    <MedidasProvider>
    <AuthProvider>
      <Router basename="/">
        <div className="page sm">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
    </MedidasProvider>
  );
}
