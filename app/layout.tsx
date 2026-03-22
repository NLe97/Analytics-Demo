import './globals.css';
import type { Metadata } from 'next';

import type { ReactNode } from 'react';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Minimal Website',
  description: 'A minimal website with Contentful personalization',
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
