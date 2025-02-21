import Fallback from './components/fallback';
import DetailOrder from './components/detail-order';
import Order from './pages/order';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import Product from './pages/product';
import ProductPage from './pages/create-product';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import Dashboard from './pages/dashboard';
import SettingStore from './pages/setting-store';
import { Toaster } from 'react-hot-toast';
import SettingShipping from './pages/setting-shipping';
import ProfilePage from './pages/profile';
import ShopPage from './pages/buyer-page/shop-page';
import ProductDetail from './pages/buyer-page/product-detail';
import Layout from './pages/buyer-page/layout';
import PrivateRoute from './routes/private-route';
import CartPage from './pages/buyer-page/cart-page';
import CheckoutPage from './pages/buyer-page/checkout-page';
import StatusPaymentPage from './pages/buyer-page/status-payment-page';
import NewLandingPage from './pages/new-landing-page';
import './index.css';
import { DashboardAdminPage } from './pages/dasboard-admin';
import { useGetMe } from './hooks/use-find-me';

function App() {
  const router = createBrowserRouter([
    {
      path: '/landing-page',
      Component: NewLandingPage,
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
      path: '/',
      Component: PrivateRoute,
      HydrateFallback: Fallback,
      children: [
        {
          path: '/',
          Component: () => {
            const { User } = useGetMe();
            if (User?.role === 'ADMIN') {
              return <Navigate to="/dashboard-admin" replace />;
            }
            if (User?.role === 'Seller')
              return <Navigate to="/dashboard" replace />;
          },
        },
        {
          path: '/dashboard',
          Component: Dashboard,
          HydrateFallback: Fallback,
        },
        {
          path: '/dashboard-admin',
          Component: DashboardAdminPage,
          HydrateFallback: Fallback,
        },
        {
          path: '/product',
          Component: Product,
          HydrateFallback: Fallback,
        },
        {
          path: '/create-product',
          Component: ProductPage,
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
        {
          path: '/setting-store',
          Component: SettingStore,
          HydrateFallback: Fallback,
        },
        {
          path: '/setting-shipping',
          Component: SettingShipping,
          HydrateFallback: Fallback,
        },
        {
          path: '/profile',
          Component: ProfilePage,
          HydrateFallback: Fallback,
        },
      ],
    },
    {
      path: '/lakoe-app',
      Component: Layout,
      HydrateFallback: Fallback,
      children: [
        {
          path: '/lakoe-app',
          Component: () => <Navigate to="/lakoe-app/:domain" />,
        },
        {
          path: '/lakoe-app/:domain',
          Component: ShopPage,
          HydrateFallback: Fallback,
        },
        {
          path: '/lakoe-app/:domain/:id',
          Component: ProductDetail,
          HydrateFallback: Fallback,
        },
        {
          path: '/lakoe-app/cart-page',
          Component: CartPage,
          HydrateFallback: Fallback,
        },
      ],
    },
    {
      path: '/lakoe-app/checkout-page',
      Component: CheckoutPage,
      HydrateFallback: Fallback,
    },
    {
      path: '/lakoe-app/status-payment-page/:orderId',
      Component: StatusPaymentPage,
      HydrateFallback: Fallback,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
