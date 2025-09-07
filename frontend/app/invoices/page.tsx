export default async function InvoicesPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices`, {
      cache: 'no-store', // pas de cache côté Next
    });
  
    if (!res.ok) {
      return <p className="text-red-600">Failed to load invoices.</p>;
    }
  
    const invoices = await res.json();
  
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Invoices</h2>
  
        {invoices.length === 0 ? (
          <p className="text-gray-500">No invoices yet.</p>
        ) : (
          <table className="w-full border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">#</th>
                <th className="p-2">Issue Date</th>
                <th className="p-2">Status</th>
                <th className="p-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv: any) => (
                <tr key={inv.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{inv.invoiceNumber}</td>
                  <td className="p-2">{inv.issueDate}</td>
                  <td className="p-2">{inv.status}</td>
                  <td className="p-2 text-right">
                    {inv.total} {inv.currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
  