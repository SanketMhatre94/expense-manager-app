import type { ApiResponse, CsvUploadResult, DashboardSummary, Expense } from "../types";

const BASE = "/api";

async function unwrap<T>(res: Response): Promise<ApiResponse<T>> {
  const body: ApiResponse<T> = await res.json();
  if (!res.ok) throw new Error(body.message ?? `Request failed: ${res.status}`);
  return body;
}

export const api = {
  addExpense: (payload: Omit<Expense, "id" | "category" | "isAnomaly">) =>
    fetch(`${BASE}/expenses`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    }).then(r => unwrap<Expense>(r)),

  uploadCsv: (file: File) => {
    const form = new FormData();
    form.append("file", file);
    return fetch(`${BASE}/expenses/upload`, { method: "POST", body: form })
      .then(r => unwrap<CsvUploadResult>(r));
  },

  getDashboard: () =>
    fetch(`${BASE}/dashboard/summary`).then(r => unwrap<DashboardSummary>(r)),
};