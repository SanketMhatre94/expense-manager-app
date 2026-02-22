import type { VendorTotal } from "../types";

const fmt = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

export default function TopVendors({ data }: { data: VendorTotal[] }) {
  const max = data[0]?.total ?? 1;

  return (
    <div className="card">
      <p className="card-title">Top Vendors</p>
      {data.length === 0 ? (
        <p className="empty-state">No data yet</p>
      ) : (
        data.map((v, i) => (
          <div className="vendor-row" key={v.vendor}>
            <span className="vendor-rank">#{i + 1}</span>
            <span className="vendor-name">{v.vendor}</span>
            <div className="vendor-bar-wrap">
              <div className="vendor-bar" style={{ width: `${(v.total / max) * 100}%` }} />
            </div>
            <span className="vendor-amount">{fmt(v.total)}</span>
          </div>
        ))
      )}
    </div>
  );
}