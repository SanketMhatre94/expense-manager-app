// import { useEffect, useState } from "react";
// import { api } from "../api/client";
// import type { DashboardSummary } from "../types";
// import CategoryTotals from "../components/CategoryTotals";
// import TopVendors     from "../components/TopVendors";
// import AnomalyList    from "../components/AnomalyList";

// const fmt = (n: number) =>
//   "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2 });

// export default function Dashboard() {
//   const [summary, setSummary] = useState<DashboardSummary | null>(null);
//   const [error,   setError]   = useState<string | null>(null);

//   useEffect(() => {
//     api.getDashboard()
//       .then(res => setSummary(res.data))
//       .catch(e  => setError(e.message));
//   }, []);

//   if (error)    return <div className="page-content"><p className="alert alert-error">{error}</p></div>;
//   if (!summary) return <div className="page-content"><div className="spinner" /></div>;

//   const totalSpend    = summary.categoryTotals.reduce((s, c) => s + c.total, 0);
//   const totalAnomalies = summary.anomalies.length;

//   return (
//     <div className="page-content">
//       <div className="page-header">
//         <h1>Dashboard</h1>
//         <p>Overview of your expenses</p>
//       </div>

//       {/* Stat tiles */}
//       <div className="grid-3" style={{ marginBottom: 20 }}>
//         <div className="card stat-tile">
//           <p className="label">Total Spend</p>
//           <p className="value">{fmt(totalSpend)}</p>
//         </div>
//         <div className="card stat-tile">
//           <p className="label">Categories</p>
//           <p className="value">{summary.categoryTotals.length}</p>
//         </div>
//         <div className="card stat-tile">
//           <p className="label">Anomalies</p>
//           <p className="value" style={{ color: totalAnomalies > 0 ? "var(--red-600)" : undefined }}>
//             {totalAnomalies}
//           </p>
//         </div>
//       </div>

//       <div className="grid-2">
//         <CategoryTotals data={summary.categoryTotals} />
//         <TopVendors     data={summary.topVendors} />
//       </div>

//       <AnomalyList data={summary.anomalies} />
//     </div>
//   );
// }

import { useEffect, useState, useCallback } from "react";
import { api } from "../api/client";
import type { DashboardSummary } from "../types";
import CategoryTotals from "../components/CategoryTotals";
import TopVendors     from "../components/TopVendors";
import AnomalyList    from "../components/AnomalyList";

const fmt = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2 });

export default function Dashboard() {
  const [summary,     setSummary]     = useState<DashboardSummary | null>(null);
  const [error,       setError]       = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [refreshing,  setRefreshing]  = useState(false);

  const load = useCallback((isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    api.getDashboard()
      .then(res => {
        setSummary(res.data);
        setLastUpdated(new Date().toLocaleTimeString());
        setError(null);
      })
      .catch(e => setError(e.message))
      .finally(() => setRefreshing(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  if (error)    return <div className="page-content"><p className="alert alert-error">{error}</p></div>;
  if (!summary) return <div className="page-content"><div className="spinner" /></div>;

  const totalSpend     = summary.categoryTotals.reduce((s, c) => s + c.total, 0);
  const totalAnomalies = summary.anomalies.length;

  return (
    <div className="page-content">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your expenses{lastUpdated && ` · updated at ${lastUpdated}`}</p>
        </div>
        <button
          className="btn btn-outline"
          onClick={() => load(true)}
          disabled={refreshing}
          style={{ marginTop: 4 }}
        >
          {refreshing ? "Refreshing…" : "↻ Refresh"}
        </button>
      </div>

      <div className="grid-3" style={{ marginBottom: 20 }}>
        <div className="card stat-tile">
          <p className="label">Total Spend</p>
          <p className="value">{fmt(totalSpend)}</p>
        </div>
        <div className="card stat-tile">
          <p className="label">Categories</p>
          <p className="value">{summary.categoryTotals.length}</p>
        </div>
        <div className="card stat-tile">
          <p className="label">Anomalies</p>
          <p className="value" style={{ color: totalAnomalies > 0 ? "var(--red-600)" : undefined }}>
            {totalAnomalies}
          </p>
        </div>
      </div>

      <div className="grid-2">
        <CategoryTotals data={summary.categoryTotals} />
        <TopVendors     data={summary.topVendors} />
      </div>

      <AnomalyList data={summary.anomalies} />
    </div>
  );
}