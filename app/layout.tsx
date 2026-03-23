import type {Metadata} from 'next';
import { Orbitron, JetBrains_Mono, Share_Tech_Mono, Chakra_Petch } from 'next/font/google';
import './globals.css';

const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-chakra',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

const shareTech = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-share-tech',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-orbitron',
});

export const metadata: Metadata = {
  title: 'The Locked System | Interactive Portfolio',
  description: 'An interactive developer portfolio presented as a secured intelligence system.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className={`${chakra.variable} ${jetbrainsMono.variable} ${shareTech.variable} ${orbitron.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="bg-background text-zinc-300 antialiased">
        <div className="noise" />
        <div className="scanlines" />
        <div className="crt-vignette" />
        <div className="scan-beam" />
        {children}
      </body>
    </html>
  );
}
