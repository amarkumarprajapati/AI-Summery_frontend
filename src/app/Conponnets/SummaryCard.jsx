"use client"

import React from "react";
import { motion } from "framer-motion";

const SummaryCard = ({ summary, loading, error }) => {
  if (loading) return <div className="text-center text-blue-500 font-semibold">Fetching summary...</div>;
  if (error) return <div className="text-red-600 text-center">⚠️ {error}</div>;

  return (
    summary && (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 rounded shadow-md border border-gray-200"
      >
        <h2 className="text-lg font-bold text-indigo-600 mb-2">Summary</h2>
        <p className="text-gray-700 text-sm">{summary}</p>
      </motion.div>
    )
  );
};

export default SummaryCard;
