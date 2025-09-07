import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MyInvoice SaaS',
  description: 'Simple invoicing SaaS built with Next.js + NestJS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <div className="min-h-screen flex flex-col">
          <header className="bg-white shadow px-6 py-4">
            <h1 className="text-xl font-bold">MyInvoice SaaS</h1>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
