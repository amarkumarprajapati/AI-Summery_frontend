
"use client"

import React, { useState } from "react";

const UrlInput = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-2">
      <input
        type="text"
        placeholder="Paste a URL here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow p-3 rounded-l border border-gray-300 shadow focus:outline-none"
      />
      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-r hover:bg-indigo-700 transition">
        Summarize
      </button>
    </form>
  );
};

export default UrlInput;
