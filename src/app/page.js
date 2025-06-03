"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "./Conponnets/Header";
import UrlInput from "./Conponnets/UrlInput";
import HistoryList from "./Conponnets/HistoryList";
import SummaryCard from "./Conponnets/SummaryCard";

export default function Home() {
  const [summary, setSummary] = useState("");
  const [history, setHistory] = useState([]);
  const [copiedUrl, setCopiedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("urlHistory")) || [];
    setHistory(saved);
  }, []);

  const fetchSummary = async (url) => {
    const existing = history.find((item) => item.url === url);
    if (existing) {
      setSummary(existing.summary);
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const res = await fetch("https://api.example.com/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (data.summary) {
        setSummary(data.summary);
        const newEntry = { url, summary: data.summary };
        const updated = [newEntry, ...history];
        setHistory(updated);
        localStorage.setItem("urlHistory", JSON.stringify(updated));
      } else {
        setError("No summary returned.");
      }
    } catch (err) {
      setError("Failed to fetch summary.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(""), 2000);
  };
  return (
    <div className="h-screen w-full flex flex-col gap-4 p-6 bg-gray-50">
      <Header />
      <div className="grid grid-cols-3 gap-6 h-full">
        <div className="col-span-1 flex flex-col gap-4">
          <UrlInput onSubmit={fetchSummary} />
          <HistoryList
            history={history}
            onClick={(item) => setSummary(item.summary)}
            copiedUrl={copiedUrl}
            copyToClipboard={copyToClipboard}
          />
        </div>
        <div className="col-span-2">
          <SummaryCard summary={summary} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}
