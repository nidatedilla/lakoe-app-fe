import Fallback from './components/fallback';
import DetailOrder from './components/detail-order';
import PrivateLayout from './layouts/private-layout';
import Order from './pages/order';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Product from './pages/product';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';

function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      Component: LoginPage,
      HydrateFallback: Fallback,
    },
    {
      path: '/register',
      Component: RegisterPage,
      HydrateFallback: Fallback,
    },
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
