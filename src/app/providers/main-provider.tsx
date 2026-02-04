import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RoutesProvider } from '@/app/providers/router-provider.tsx';
import { ThemeProvider } from '@/app/providers/theme-provider.tsx';
import { Toaster } from '@/components/ui/sonner.tsx';

const queryClient = new QueryClient();

export const MainProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Toaster />
        <RoutesProvider />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
