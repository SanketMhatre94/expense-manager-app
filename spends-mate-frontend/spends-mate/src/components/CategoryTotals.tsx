import type { CategoryTotal } from "../types";

const fmt = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const COLORS: Record<string, string> = {
  Food:          "badge-green",
  Travel:        "badge-blue",
  Shopping:      "badge-blue",
  Entertainment: "badge-amber",
  Utilities:     "badge-amber",
  Other:         "badge-amber",
};

export default function CategoryTotals({ data }: { data: CategoryTotal[] }) {
  return (
    <div className="card">
      <p className="card-title">Spending by Category</p>
      {data.length === 0 ? (
        <p className="empty-state">No data yet</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Category</th><th style={{ textAlign: "right" }}>Total</th></tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr key={row.category}>
                  <td>
                    <span className={`badge ${COLORS[row.category] ?? "badge-blue"}`}>
                      {row.category}
                    </span>
                  </td>
                  <td style={{ textAlign: "right", fontWeight: 600 }}>{fmt(row.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}