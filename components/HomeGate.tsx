'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BootSequence from '@/components/BootSequence';

export default function HomeGate() {
  const router = useRouter();

  useEffect(() => {
    if (window.sessionStorage.getItem('booted') === 'true') {
      router.replace('/hub');
    }
  }, [router]);

  return <BootSequence />;
}
