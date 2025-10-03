import { DashboardSkeleton } from '@/components/boost/skeleton';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boost Job',
};

export default function Page() {
  return (
    <DashboardSkeleton/>
  );
}
