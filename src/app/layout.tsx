import type { Metadata } from 'next'
import './globals.css'
import StoreProvider from '../store/storeProvider'

export const metadata: Metadata = {
  title: 'React App',
  description: 'Web site created with Next.js.',
}
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <div id="root">{children}</div>
        </StoreProvider>
      </body>
    </html>
  )
}