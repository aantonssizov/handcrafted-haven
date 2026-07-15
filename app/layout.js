import './globals.css';

export const metadata = {
  title: 'Handcrafted Haven',
  description: 'A Next.js starter app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
