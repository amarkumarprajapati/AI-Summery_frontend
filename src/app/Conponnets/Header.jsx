
"use client"
import React from "react";

const Header = () => (
  <header className="w-full flex justify-between items-center p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold">URL Summarizer</h1>
    <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
      <button className="bg-white text-indigo-600 px-4 py-2 rounded shadow font-semibold hover:bg-gray-100">GitHub</button>
    </a>
  </header>
);

export default Header;
