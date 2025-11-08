'use client';

import { useEffect, useState } from 'react';

type Ping = { ok: boolean; service: string; version: number };

export default function DiagnosticsPage() {
  const [data, setData] = useState<Ping | null>(null);
  const [error, setError] = useState<string | null>(null);
  const apiBase = process.env.NEXT_PUBLIC_API_BASE || '';

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${apiBase}/api/ping`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as Ping;
        setData(json);
      } catch (e: any) {
        setError(e?.message ?? String(e));
      }
    };
    run();
  }, [apiBase]);

  return (
    <main style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', padding: 24 }}>
      <div style={{ maxWidth: 640, width: '100%', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24 }}>
        <h1 style={{ margin: 0, marginBottom: 8 }}>Diagnostics</h1>
        <p style={{ marginTop: 0, color: '#6b7280' }}>
          API base:&nbsp;<code>{apiBase || '(env mancante)'}</code>
        </p>

        {data && (
          <pre style={{ background: '#f9fafb', padding: 12, borderRadius: 8, overflow: 'auto' }}>
{JSON.stringify(data, null, 2)}
          </pre>
        )}

        {error && (
          <p style={{ color: '#b91c1c', fontWeight: 600 }}>
            Errore: {error}
          </p>
        )}
      </div>
    </main>
  );
}
