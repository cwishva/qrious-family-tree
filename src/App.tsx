import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from '@utils/theme';
import RootRouter from '@routers/RootRouter';
import { AxiosProvider } from '@contexts/AxiosContext';

function App() {
  const queryClient = new QueryClient();
  return (
    <AxiosProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RootRouter />
        </ThemeProvider>
      </QueryClientProvider>
    </AxiosProvider>
  );
}

export default App;
