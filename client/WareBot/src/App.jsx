import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import SignUp from './pages/Signup';
import QRPage from './pages/QrGenerator';
import SignIn from './pages/SignIn';
import InventoryManagement from './components/InventoryManagement';
import ExpirationAlert from './components/ExpirationAlert';
import OverstockAlert from './components/OverstockAlert';
import StockMovementComponent from './components/mostInOutstocks';
import RobotStatus from './pages/RobotStatus';


function App() {
  return (
    <Routes>
    {/*Pages with layout*/}
      <Route element={<Layout />}>
        <Route path='/' element={<Dashboard />} />
        <Route path="/Qrpage" element={<QRPage />} />
        
        <Route path="/inventory-management" element={<InventoryManagement />} />
        <Route path='/expirationalert' element={<ExpirationAlert />} />
        <Route path='/overstockalert' element={<OverstockAlert />} />
        <Route path='/most-in-out-stocks' element={<StockMovementComponent />} />
        <Route path='/status&tasks' element={<RobotStatus />} />
      </Route>

    {/*Pages without layout*/}
    <Route path='/signin' element={<SignIn />} />
    <Route path='/signup' element={<SignUp />} />
    </Routes>
  );
}

export default App;