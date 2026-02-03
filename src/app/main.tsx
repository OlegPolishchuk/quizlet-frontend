import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { MainProvider } from '@/app/providers/main-provider.tsx';

import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainProvider />
  </StrictMode>,
);
