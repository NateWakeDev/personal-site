import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer'; // Import Footer

export const metadata = {
  title: 'My Portfolio',
  description: 'Showcasing my projects and skills',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer /> {/* Include Footer here */}
      </body>
    </html>
  );
}