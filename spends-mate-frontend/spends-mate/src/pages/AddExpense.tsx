import { useState } from "react";
import { api } from "../api/client";
import type { Expense } from "../types";

interface Form { date: string; amount: string; vendor: string; description: string; }
const today = new Date().toISOString().split("T")[0];
const empty: Form = { date: today, amount: "", vendor: "", description: "" };

export default function AddExpense() {
  const [form,    setForm]    = useState<Form>(empty);
  const [result,  setResult]  = useState<Expense | null>(null);
  const [error,   setError]   = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  

  const set = (field: keyof Form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await api.addExpense({ ...form, amount: parseFloat(form.amount) });
      setResult(res.data);
      setForm(empty);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Add Expense</h1>
        <p>Fill in the details and the category is assigned automatically</p>
      </div>

      <div className="card" style={{ maxWidth: 480 }}>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date</label>
            <input type="date" required value={form.date} onChange={set("date")} />
          </div>
          <div className="form-group">
            <label>Amount (₹)</label>
            <input type="number" step="0.01" min="0.01" required
              placeholder="0.00" value={form.amount} onChange={set("amount")} />
          </div>
          <div className="form-group">
            <label>Vendor</label>
            <input type="text" required placeholder="e.g. Swiggy, Amazon"
              value={form.vendor} onChange={set("vendor")} />
          </div>
          <div className="form-group">
            <label>Description <span style={{ color: "var(--gray-400)", fontWeight: 400 }}>(optional)</span></label>
            <input type="text" placeholder="e.g. Team lunch"
              value={form.description} onChange={set("description")} />
          </div>
          <button className="btn btn-primary btn-full" type="submit" disabled={loading}>
            {loading ? "Saving…" : "Save Expense"}
          </button>
        </form>

        {result && (
          <div className={`alert ${result.isAnomaly ? "alert-amber" : "alert-success"}`}>
            {result.isAnomaly
              ? `⚠ Saved as ${result.category} — anomaly detected (unusually high amount)`
              : `✓ Saved as ${result.category}`}
          </div>
        )}
        {error && <div className="alert alert-error">{error}</div>}
      </div>
    </div>
  );
}