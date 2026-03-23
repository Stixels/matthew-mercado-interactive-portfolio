import type {Metadata} from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'The Locked System | Interactive Portfolio',
  description: 'An interactive developer portfolio presented as a secured system.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-background text-gray-200 antialiased selection:bg-neon-blue/30 selection:text-white">
        <div className="noise" />
        <div className="scanlines" />
        {children}
      </body>
    </html>
  );
}
