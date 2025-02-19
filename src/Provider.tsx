import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from './components/ui/provider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();
const theme = createTheme({
  typography: {
    fontSize: 12.5, // Ukuran default untuk semua teks
  },
});

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Provider>{children}</Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
