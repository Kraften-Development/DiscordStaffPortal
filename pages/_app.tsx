import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import type { AppProps } from 'next/app';
import { SessionProvider, useSession } from 'next-auth/react';

import {
  DocumentIcon,
  CheckBadgeIcon,
  Cog8ToothIcon,
  HomeIcon,
  ChevronDoubleRightIcon,
  XCircleIcon,
  BoltIcon,
} from '@heroicons/react/24/solid';
import { Badge, Typography } from '@mui/material';
import Link from 'next/link';
import Navigation from '../components/Navigation';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Navigation />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
