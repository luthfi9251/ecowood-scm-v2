import { Nunito } from 'next/font/google';
import './globals.css';
import NextUiProvider from '@/providers/NextUIProviders';

const nunitoSans = Nunito({
  subsets: ['latin'],
});

export const metadata = {
  title: 'Ecowood - Supply Chain Management',
  description: 'SCM for wood traceability',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.className} antialiased`}>
        <NextUiProvider>{children}</NextUiProvider>
      </body>
    </html>
  );
}
