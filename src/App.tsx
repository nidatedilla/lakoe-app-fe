import Fallback from './components/fallback';
import DetailOrder from './components/detail-order';

import Order from './pages/order';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import Product from './pages/product';
import CreateProduct from './pages/create-product';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';

function App() {
  const router = createBrowserRouter([
    {
      path: '/landing-page',
      Component: LandingPage,
      HydrateFallback: Fallback,
    },
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
          path: '/',
          Component: () => <Navigate to="/dashboard" />,
        },
        {
          path: '/dashboard',
          Component: Dashboard,
          HydrateFallback: Fallback,
        },
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
      <RouterProvider router={router}  />
      <Toaster />
    </div>
  );
}

export default App;
