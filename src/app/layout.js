import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer'; // Import Footer

export const metadata = {
  title: 'Portfolio | Nate Wakefield',
  description: 'Showcasing my projects and skills as a software developer.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="section">{children}</main>
        <Footer />
      </body>
      
    </html>
  );
}