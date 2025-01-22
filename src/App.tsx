import PrivateLayout from './layouts/privateLayout';
import Pesanan from './pages/pesanan';
import Produk from './pages/produk';
import Login from './pages/login';
import Register from './pages/register';
import ForgotPass from './pages/forgot-pass';
import ResetPass from './pages/reset-pass';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        {/* Route Login (tanpa PrivateLayout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset-password" element={<ResetPass />} />

        {/* Routes dengan PrivateLayout */}
        <Route path="/" element={<PrivateLayout />}>
          <Route path="/pesanan" element={<Pesanan />} />
          <Route path="/produk" element={<Produk />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
