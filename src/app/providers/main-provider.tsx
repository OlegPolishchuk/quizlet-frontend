import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RoutesProvider } from '@/app/providers/router-provider.tsx';
import { ThemeProvider } from '@/app/providers/theme-provider.tsx';

const queryClient = new QueryClient();

export const MainProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RoutesProvider />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
