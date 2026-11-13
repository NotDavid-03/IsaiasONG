import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://casaisaias.org'),
  title: 'Casa Isaías | Tú eres mi Inspiración - ONG',
  description: 'Organización sin fines de lucro dedicada a brindar nutrición, educación, salud y esperanza a niños y familias en situación de vulnerabilidad.',
  keywords: ['ONG', 'Casa Isaías', 'Donaciones', 'Voluntariado', 'Nutrición infantil', 'Educación', 'Tú eres mi Inspiración'],
  authors: [{ name: 'Fundación Casa Isaías' }],
  openGraph: {
    title: 'Casa Isaías | Tú eres mi Inspiración - ONG',
    description: 'Transformamos vidas vulnerables a través de la nutrición, el refuerzo escolar, la salud y el amor al prójimo. ¡Súmate hoy!',
    url: 'https://casaisaias.org',
    siteName: 'Casa Isaías ONG',
    images: [
      {
        url: '/logo.jpg',
        width: 800,
        height: 400,
        alt: 'Casa Isaías Logo',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  icons: {
    icon: '/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
