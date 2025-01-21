import Pesanan from './pages/pesanan';
import Produk from './pages/produk';
import PrivateLayout from './layouts/privateLayout';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PrivateLayout />}>
          <Route path="/pesanan" element={<Pesanan />} />
          <Route path="/produk" element={<Produk />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
