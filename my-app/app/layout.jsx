import './styles/globals.css'
import { Gothic_A1 } from 'next/font/google'
import Nav from './nav'
import Foo from './footer'


const font = Gothic_A1({ subsets: ['latin'], weight:'900' })

export const metadata = {
  title: "cybersecurity products analysis",
  description: "comparison of different cybersecurity products",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className} suppressHydrationWarning={true}>
        <Nav></Nav>
        {children}
        <Foo></Foo>
        </body>
    </html>
  )
}
