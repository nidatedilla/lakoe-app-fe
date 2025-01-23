import Fallback from './components/fallback';
import DetailOrder from './components/detail-order';
import PrivateLayout from './layouts/privateLayout';


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

    </div>
  );
}

export default App;
