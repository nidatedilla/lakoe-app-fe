import Fallback from './components/fallback';
import DetailOrder from './components/detail-order';
import Order from './pages/order';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Product from './pages/product';
import CreateProduct from './pages/create-product';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ForgotpassPage from './pages/forgot-pass';
import ResetpassPage from './pages/reset-pass';
import PrivateLayout from './layouts/privateLayout';

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
      path: '/forgot-password',
      Component: ForgotpassPage,
      HydrateFallback: Fallback,
    },
    {
      path: '/reset-password',
      Component: ResetpassPage,
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
          path: '/create-product',
          Component: CreateProduct,
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
