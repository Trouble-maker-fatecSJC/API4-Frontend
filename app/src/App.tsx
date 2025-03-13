import {BrowserRouter as Router } from 'react-router-dom'
// import Home from "./pages/home";
import AppRoutes from './routes/Router';
// import Login from "./pages/login";

export default function App() {
  
  return (
  
    <Router basename='/'>
      <div className="page sm">    
        <AppRoutes /> 
      </div>
    </Router>

  )
}



{/* <Login /> */}
      // <Home />
{/* <Router basename='/'> */}
      {/* <div className="page sm"> */}
        {/* <Header />   */}
          {/* <AppRoutes />  */}
        {/* <Footer /> */}
      {/* </div> */}
    {/* </Router> */}