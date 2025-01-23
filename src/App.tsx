import Fallback from './components/fallback';
import DetailOrder from './components/detail-order';

import Order from './pages/order';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Product from './pages/product';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import PrivateLayout from './layouts/privateLayout';
import { Toaster } from 'react-hot-toast';

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
      <RouterProvider router={router}  />
      <Toaster />
    </div>
  );
}

export default App;
