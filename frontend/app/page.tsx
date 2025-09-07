import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Welcome to MyInvoice SaaS</h2>
      <p className="text-gray-600">
        This is a simple invoicing app. Go to your dashboard:
      </p>
      <Link
        href="/invoices"
        className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        View Invoices
      </Link>
    </div>
  );
}
