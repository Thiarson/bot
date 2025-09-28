import CVBuilder from '@/components/boost/cv-builder';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boost CV',
};

export default function Home() {
  return (
    <CVBuilder/>
  );
}
