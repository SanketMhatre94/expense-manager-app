import type { Expense } from "../types";

const fmt = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function AnomalyList({ data }: { data: Expense[] }) {
  return (
    <div className="card" style={{ marginTop: 20 }}>
      <p className="card-title">⚠ Anomalies</p>
      {data.length === 0 ? (
        <p className="empty-state">No anomalies detected</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Date</th><th>Vendor</th><th>Category</th><th style={{ textAlign: "right" }}>Amount</th></tr>
            </thead>
            <tbody>
              {data.map(e => (
                <tr key={e.id}>
                  <td>{e.date}</td>
                  <td>{e.vendor}</td>
                  <td><span className="badge badge-amber">{e.category}</span></td>
                  <td style={{ textAlign: "right", fontWeight: 600, color: "var(--red-600)" }}>
                    {fmt(e.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}