import '../styles/globals.css';
import Header from './Header';
import Providers from './Providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="bg-gray-100 dark:bg-zinc-900 transition-colors duration-700 text-zinc-900 dark:text-gray-100">
        <Providers>
          <Header />
          <div className="max-w-6xl mx-auto">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
