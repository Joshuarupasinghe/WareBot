import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import AddUser from './pages/AddUser';
import QRPage from './pages/QrGenerator';
import SignIn from './pages/SignIn';
import InventoryManagement from './pages/InventoryManagement';
import ExpirationAlert from './components/ExpirationAlert';
import OverstockAlert from './components/OverstockAlert';
import StockMovementComponent from './components/mostInOutstocks';
import RobotStatus from './pages/RobotStatus';
import SettingsAndConfiguration from './pages/settings&configuration';
// import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      {/* Protected Routes */}
      {/* <Route element={<PrivateRoute />}> */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Qrpage" element={<QRPage />} />
          <Route path="/inventory-management" element={<InventoryManagement />} />
          <Route path="/expirationalert" element={<ExpirationAlert />} />
          <Route path="/overstockalert" element={<OverstockAlert />} />
          <Route path="/most-in-out-stocks" element={<StockMovementComponent />} />
          <Route path="/status&tasks" element={<RobotStatus />} />
          <Route path="/settings&configuration" element={<SettingsAndConfiguration />} />
          <Route path="/addUser" element={<AddUser />} />
        </Route>
      {/* </Route> */}

      {/* Public Routes */}
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
