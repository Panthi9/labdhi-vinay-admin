
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DashboardScreen from './screens/dashbord/dashboardScreen';
import LoginScreen from './screens/authentication/loginScreen';
import OrderScreen from './screens/order/orderScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/order" element={<OrderScreen />} />
        <Route path="/home" element={<DashboardScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;