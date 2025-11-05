"use client";

import { ArrowUp, ArrowDown } from "lucide-react";

export default function ContentSection() {
  return (
    <div className="w-full p-6">
      {/* ---------- HEADER ---------- */}
      <h2 className="text-white text-lg font-semibold mb-6">Content</h2>

      {/* ---------- BRAND SAFETY ---------- */}
      <div className="mb-8">
        <p className="text-[12px] font-medium text-white mb-1">
          Brand Safety Analysis
        </p>
        <p className="text-[16px] font-semibold text-white mb-1">NA</p>
        <p className="text-[12px] text-gray-500">
          Content cannot be analyzed in terms of brand safety due to a lack of
          data.
        </p>
      </div>

      {/* ---------- SENTIMENT ANALYSIS ---------- */}
      <div className="mb-8">
        <p className="text-[12px] font-medium text-white mb-1">
          Sentiment analysis of posts comment
        </p>
        <p className="text-[12px] text-gray-500 mb-4">
          We have analyzed the sentiment of 138 comments across 5 posts.
        </p>

        <div className="flex flex-wrap pb-6">
          {/* Positive */}
          <div className="flex flex-col pr-8 border-r border-[#222]">
            <p className="text-[16px] font-semibold text-white mb-[2px]">
              79.99%
            </p>
            <div className="flex items-center gap-1">
              <span className="text-[12px] text-green-400 font-medium">
                109
              </span>
              <ArrowUp size={12} className="text-green-400" />
            </div>
            <p className="text-[12px] text-gray-400 mt-1">Positive</p>
          </div>

          {/* Negative */}
          <div className="flex flex-col px-8 border-r border-[#222]">
            <p className="text-[16px] font-semibold text-white mb-[2px]">
              0.99%
            </p>
            <div className="flex items-center gap-1">
              <span className="text-[12px] text-red-400 font-medium">72</span>
              <ArrowDown size={12} className="text-red-400" />
            </div>
            <p className="text-[12px] text-gray-400 mt-1">Negative</p>
          </div>

          {/* Neutral */}
          <div className="flex flex-col pl-8">
            <p className="text-[16px] font-semibold text-white mb-[2px]">
              20.29%
            </p>
            <div className="flex items-center gap-1">
              <span className="text-[12px] text-gray-400 font-medium">33</span>
            </div>
            <p className="text-[12px] text-gray-400 mt-1">Neutral</p>
          </div>
        </div>
      </div>

      {/* ---------- HASHTAGS ---------- */}
      <div>
        <p className="text-[12px] font-medium text-white mb-1">
          Hashtags over past 30 days
        </p>
        <p className="text-[12px] text-gray-500">
          No hashtags for selected period
        </p>
      </div>
    </div>
  );
}
