import PrivateLayout from './layouts/privateLayout';
import Pesanan from './pages/pesanan';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PrivateLayout />}>
          <Route path="/pesanan" element={<Pesanan />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
