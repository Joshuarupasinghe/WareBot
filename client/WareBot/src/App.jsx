import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import InventoryManagement from './components/InventoryManagement';
import ExpirationAlert from './components/ExpirationAlert';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path="/inventory-management" element={<InventoryManagement />} />
        <Route path='/expirationalert' element={<ExpirationAlert />} />
      </Routes>
    </Layout>
  );
}

export default App;