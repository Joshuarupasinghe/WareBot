import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import QRPage from './pages/QrGenerator';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path="/Qrpage"element={<QRPage/>}/>
      </Routes>
    </Layout>
  );
}

export default App;