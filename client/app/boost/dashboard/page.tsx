import Dashboard from '@/components/boost/dashboard';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boost Dashboard',
};

export default function Home() {
  return (
    <Dashboard/>
  );
}
