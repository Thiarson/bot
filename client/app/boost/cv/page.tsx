import { DashboardSkeleton } from '@/components/boost/skeleton';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boost CV',
};

export default function Home() {
  return (
    <DashboardSkeleton/>
  );
}
