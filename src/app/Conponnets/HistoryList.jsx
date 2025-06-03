"use client"

import React from "react";
import { FaClipboard, FaCheck } from "react-icons/fa";

const HistoryList = ({ history, onClick, copiedUrl, copyToClipboard }) => (
  <div className="flex flex-col gap-2 overflow-y-auto max-h-[180px]">
    {history.map((item, index) => (
      <div
        key={index}
        onClick={() => onClick(item)}
        className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 flex justify-between items-center"
      >
        <span className="truncate text-sm text-gray-700">{item.url}</span>
        <button onClick={(e) => { e.stopPropagation(); copyToClipboard(item.url); }}>
          {copiedUrl === item.url ? <FaCheck className="text-green-500" /> : <FaClipboard />}
        </button>
      </div>
    ))}
  </div>
);

export default HistoryList;
