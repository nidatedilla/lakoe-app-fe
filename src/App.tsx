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
import LandingPage from './pages/landing-page';
import { Toaster } from 'react-hot-toast';
import SettingShipping from './pages/setting-shipping';
import SettingPaymentMethod from './pages/setting-payment-method';
import ProfilePage from './pages/profile';
import ShopPage from './pages/buyer-page/shop-page';
import ProductDetail from './pages/buyer-page/product-detail';
import Layout from './pages/buyer-page/layout';
import PrivateRoute from './routes/private-route';
import CartPage from './pages/buyer-page/cart-page';
import CheckoutPage from './pages/buyer-page/checkout-page';
import './index.css'


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
      path: '/',
      Component: PrivateRoute,
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
          path: '/payment-method',
          Component: SettingPaymentMethod,
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
          path: '/lakoe-app/product-detail/:id',
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
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
