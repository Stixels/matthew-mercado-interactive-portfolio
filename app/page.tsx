'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BootSequence from '@/components/BootSequence';

export default function Home() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('booted') === 'true') {
      router.replace('/hub');
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) return <div className="h-screen bg-background" />;
  return <BootSequence />;
}
