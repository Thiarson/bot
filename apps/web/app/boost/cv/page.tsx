import CVBuilder from '@/components/cv/cv-builder';
import { getSavedCv } from '@/lib/cv/actions';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boost CV',
};

export default async function Page() {
  const cvData = await getSavedCv();
  
  return (
    <CVBuilder cvData={cvData}/>
  );
}
