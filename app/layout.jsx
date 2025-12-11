import './globals.css';
import { Baloo_2, Nunito } from 'next/font/google';

const headingFont = Baloo_2({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
});

const bodyFont = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});

export const metadata = {
  title: 'Alejandro De La Mora | AI Solutions Architect',
  description: 'AI Solutions Architect portfolio built from FusionHit resume.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
