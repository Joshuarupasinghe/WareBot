import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';

import QRPage from './pages/QrGenerator';

import InventoryManagement from './components/InventoryManagement';
import ExpirationAlert from './components/ExpirationAlert';
import OverstockAlert from './components/OverstockAlert';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Dashboard />} />

        <Route path="/Qrpage"element={<QRPage/>}/>

        <Route path="/inventory-management" element={<InventoryManagement />} />
        <Route path='/expirationalert' element={<ExpirationAlert />} />
        
        <Route path='/overstockalert' element={<OverstockAlert />} />

        
      </Routes>
    </Layout>
  );
}

export default App;