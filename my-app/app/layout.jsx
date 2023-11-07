import './styles/globals.css';
import { Comfortaa, Outfit, Inconsolata } from 'next/font/google';
import Nav from './nav';
import Foo from './footer';

const font = Inconsolata({ subsets: ['latin'], weight:"900", display: 'swap'});
const outfit = Outfit({ subsets: ['latin'], weight:"600", display: 'swap' })

export const metadata = {
  title: 'cybersecurity products analysis',
  description: 'comparison of different cybersecurity products'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className} suppressHydrationWarning={true}>
        <Nav></Nav>
        {children}
        <Foo></Foo>
      </body>
    </html>
  );
}
