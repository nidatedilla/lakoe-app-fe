import Fallback from './components/fallback';
import DetailOrder from './components/detail-order';
import PrivateLayout from './layouts/privateLayout';
import Order from './pages/order';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Produk from './pages/product';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      Component: PrivateLayout,
      HydrateFallback: Fallback,
      children: [
        {
          path: '/product',
          Component: Produk,
          HydrateFallback: Fallback,
        },
        {
          path: '/order',
          Component: Order,
          HydrateFallback: Fallback,
        },
        {
          path: '/detail-order/:orderId',
          Component: DetailOrder,
          HydrateFallback: Fallback,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
