import '@mantine/core/styles.css';
import './globals.css';
import type { Metadata } from 'next';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Fraunces, Work_Sans, JetBrains_Mono } from 'next/font/google';
import { theme } from './theme';
import { CartProvider } from '@/lib/cart/cartContext';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PACHA — Cocina peruana',
  description:
    'Cocina peruana contemporánea en Barranco, Lima. Ceviche, lomo saltado, causa limeña y más.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${workSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <CartProvider>{children}</CartProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
