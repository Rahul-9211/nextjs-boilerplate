// app/layout.js or app/layout.tsx
import { ReactNode } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import 'react-loading-skeleton/dist/skeleton.css'
import 'rodal/lib/rodal.css';
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'

const inter = Inter({
  subsets: ['latin'],
});

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title:"Buyer's Dashboard",
  // description: 'My App Description',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children } : RootLayoutProps) {
  return (
    <html lang="en">
       {/* <link rel="icon" href="/logo.png" /> */}
       {/* <link rel="icon" href="/logo.ico" /> */}
       <link rel="icon" href="/logo.png" type="image/png" />
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
