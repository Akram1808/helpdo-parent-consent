"use client";

import { useEffect, useState } from "react";

export default function ParentConsentPage({ searchParams }: { searchParams: { token?: string } }) {
  const [message, setMessage] = useState("Überprüfe Link...");

  useEffect(() => {
    const token = searchParams.token;
    if (!token) {
      setMessage("Ungültiger Link.");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_URL}/confirm-parent-consent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ token })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMessage("Sie haben Ihrem Kind den Zugang zur App genehmigt. Sie können diese Seite jetzt schließen.");
        } else {
          setMessage("Ungültiger oder abgelaufener Link.");
        }
      })
      .catch(() => {
        setMessage("Fehler beim Bestätigen. Bitte später erneut versuchen.");
      });
  }, [searchParams.token]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f5f5f5" }}>
      <div style={{ background: "#fff", padding: 32, borderRadius: 12, maxWidth: 420, textAlign: "center" }}>
        <h1>HelpDo</h1>
        <p>{message}</p>
      </div>
    </div>
  );
}

