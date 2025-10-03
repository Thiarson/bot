import { DashboardSkeleton } from '@/components/boost/skeleton';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boost Setting',
};

export default function Page() {
  return (
    <DashboardSkeleton/>
  );
}
