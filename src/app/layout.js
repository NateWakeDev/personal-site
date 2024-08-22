// src/app/layout.js
import './globals.css'
import Header from './components/Header'

export const metadata = {
  title: 'My Portfolio',
  description: 'Showcasing my projects and skills',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
