import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/authContext";// Importa o AuthProvider
import AppRoutes from "./routes/Router";

export default function App() {
  return (
    <AuthProvider>
      <Router basename="/">
        <div className="page sm">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}
