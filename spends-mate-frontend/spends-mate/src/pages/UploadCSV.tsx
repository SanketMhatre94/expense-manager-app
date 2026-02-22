import { useRef, useState } from "react";
import { api } from "../api/client";
import type { CsvUploadResult } from "../types";

export default function UploadCSV() {
  const [file,    setFile]    = useState<File | null>(null);
  const [result,  setResult]  = useState<CsvUploadResult | null>(null);
  const [error,   setError]   = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await api.uploadCsv(file);
      setResult(res.data);
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const savedPct = result
    ? Math.round((result.saved / (result.saved + result.skipped || 1)) * 100)
    : 0;

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Upload CSV</h1>
        <p>Bulk import expenses from a CSV file</p>
      </div>

      <div className="card" style={{ maxWidth: 480 }}>
        {/* Format hint */}
        <div className="alert alert-amber" style={{ marginBottom: 20, marginTop: 0 }}>
          Expected columns: <strong>date, amount, vendor, description</strong><br />
          <span style={{ fontSize: 12 }}>e.g. 2026-02-01, 300, Swiggy, Lunch</span>
        </div>

        {/* Drop zone */}
        <div
          className={`upload-zone ${file ? "has-file" : ""}`}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={e => { setFile(e.target.files?.[0] ?? null); setResult(null); setError(null); }}
          />
          {file ? (
            <>
              <div>📄</div>
              <div className="file-name">{file.name}</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>
                {(file.size / 1024).toFixed(1)} KB — click to change
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 24 }}>📂</div>
              <div style={{ marginTop: 8 }}>Click to select a CSV file</div>
            </>
          )}
        </div>

        <button
          className="btn btn-primary btn-full"
          style={{ marginTop: 16 }}
          onClick={handleUpload}
          disabled={!file || loading}
        >
          {loading ? "Uploading…" : "Upload"}
        </button>

        {/* Result */}
        {result && (
          <div className="alert alert-success" style={{ marginTop: 16 }}>
            <strong>✓ Done</strong> — {result.saved} saved, {result.skipped} skipped
            <div className="progress-bar-wrap">
              <div className="progress-bar" style={{ width: `${savedPct}%` }} />
            </div>
            {result.errors.length > 0 && (
              <ul style={{ marginTop: 10, paddingLeft: 16, fontSize: 13 }}>
                {result.errors.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            )}
          </div>
        )}
        {error && <div className="alert alert-error">{error}</div>}
      </div>
    </div>
  );
}