import Fallback from './components/fallback';
import DetailOrder from './features/order/components/detail-order';
import PrivateLayout from './layouts/privateLayout';
import Order from './pages/order';
import Product from './pages/product';
import { createBrowserRouter, RouterProvider } from 'react-router';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      Component: PrivateLayout,
      HydrateFallback: Fallback,
      children: [
        {
          path: '/product',
          Component: Product,
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
