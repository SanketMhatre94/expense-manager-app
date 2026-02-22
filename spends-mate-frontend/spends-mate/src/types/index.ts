export interface Expense {
  id: number;
  date: string;
  amount: number;
  vendor: string;
  description: string;
  category: string;
  isAnomaly: boolean;
}

export interface CategoryTotal {
  category: string;
  total: number;
}

export interface VendorTotal {
  vendor: string;
  total: number;
}

export interface DashboardSummary {
  categoryTotals: CategoryTotal[];
  topVendors:     VendorTotal[];
  anomalies:      Expense[];
}

export interface CsvUploadResult {
  saved:   number;
  skipped: number;
  errors:  string[];
}

export interface ApiResponse<T> {
  status:  number;
  message: string;
  data:    T;
}