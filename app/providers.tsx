'use client';

import type { ReactNode } from 'react';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import {
  NinetailedProvider as NinetailedReactProvider,
  type NinetailedProviderInstantiationProps,
  useNinetailed,
} from '@ninetailed/experience.js-react';
import { NinetailedInsightsPlugin } from '@ninetailed/experience.js-plugin-insights';
import { usePathname, useSearchParams } from 'next/navigation';

interface ProvidersProps {
  children: ReactNode;
}

type ProviderPlugins = NonNullable<
  NinetailedProviderInstantiationProps['plugins']
>;

const AppRouterTracker = () => {
  const ninetailed = useNinetailed();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const search = searchParams?.toString() ?? '';
    const currentUrl = search ? `${pathname}?${search}` : pathname;

    if (lastTrackedUrlRef.current === currentUrl) {
      return;
    }

    void ninetailed.page();
    lastTrackedUrlRef.current = currentUrl;
  }, [pathname, searchParams, ninetailed]);

  return null;
};

const Providers = ({ children }: ProvidersProps) => {
  const plugins = useMemo<ProviderPlugins>(() => {
    // Cast ensures we satisfy the provider typing despite duplicated plugin declarations at build time.
    const insightsPlugin =
      new NinetailedInsightsPlugin() as unknown as ProviderPlugins[number];

    return [insightsPlugin];
  }, []);

  return (
    <NinetailedReactProvider
      clientId={process.env.NEXT_PUBLIC_NINETAILED_CLIENT_ID || ''}
      environment={process.env.NEXT_PUBLIC_NINETAILED_ENVIRONMENT || 'main'}
      plugins={plugins}
    >
      <Suspense fallback={null}>
        <AppRouterTracker />
      </Suspense>
      {children}
    </NinetailedReactProvider>
  );
};

export default Providers;
