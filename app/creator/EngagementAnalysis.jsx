"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
} from "recharts";
import { Circle, CheckCircle, ArrowDown } from "lucide-react";
import Image from "next/image";

export default function EngagementAnalysis() {
  const engagementRateData = [
    { range: "12.3 – 13.4", value: 5 },
    { range: "10.0 – 11.1", value: 10 },
    { range: "7.8 – 8.9", value: 15 },
    { range: "5.6 – 6.7", value: 22 },
    { range: "3.3 – 4.5", value: 28 },
    { range: "1.1 – 2.2", value: 45 },
  ];

  const engagementHistoryData = [
    { date: "Jan 2018", value: 1 },
    { date: "Jan 2019", value: 8 },
    { date: "Jan 2020", value: 4 },
    { date: "Jan 2021", value: 2 },
    { date: "Jan 2022", value: 9 },
    { date: "Jan 2023", value: 5 },
    { date: "Jan 2024", value: 7 },
    { date: "Jan 2025", value: 8 },
  ];

  const likesSpreadData = [
    { x: 0.5, y: 5 },
    { x: 1.0, y: 10 },
    { x: 1.5, y: 12 },
    { x: 2.0, y: 15 },
    { x: 2.5, y: 8 },
    { x: 3.0, y: 18 },
    { x: 3.5, y: 20 },
    { x: 4.0, y: 10 },
  ];

  return (
    <div className=" w-full p-6">
      {/* ---------------- HEADER ---------------- */}
      <div className="flex items-center gap-2 mb-1">
        <Image
                    src="/assets/ig-white.svg"
                    width={20}
                    height={20}
                    alt="Instagram"
                    className="opacity-80"
                  />
        <h2 className="text-white text-lg font-semibold">
          Engagement Analysis
        </h2>
      </div>
      <p className="text-xs text-gray-500 mb-6">
        Compared to average values for similar accounts (by number of followers)
      </p>

      {/* ---------------- TOP STATS ---------------- */}
      <div className="flex flex-wrap gap-8 mb-8">
        <div>
          <p className="text-[12px] text-white">Average Likes</p>
          <div className="flex items-center gap-1">
            <p className="text-white font-semibold text-[16px]">917K</p>
            <ArrowDown size={12} className="text-[#F76659] mt-[2px]" />
          </div>
        </div>
        <div>
          <p className="text-[12px] text-white">Average Comments</p>
          <p className="text-white font-semibold text-[16px]">318K</p>
        </div>
      </div>

      {/* ---------------- ENGAGEMENT RATE ---------------- */}
      <div className="border-b border-[#222] pb-8 mb-8">
        <p className="text-[12px] text-white mb-1">Engagement Rate</p>
        <p className="text-xl font-medium text-white mb-1">
          0.21%{" "}
          <span className="text-white">
            Average, compared to other 1M+ followers accounts
          </span>
        </p>
        <p className="text-[12px] text-gray-500 mb-4">
          Better than 36% of influencers of similar account size
        </p>

        <div className="w-full h-[130px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={engagementRateData}
              layout="vertical"
              margin={{ left: 20, right: 20, top: 0, bottom: 0 }}
            >
              <YAxis
                dataKey="range"
                type="category"
                stroke="#666"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={70}
              />
              <XAxis
                type="number"
                stroke="#666"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              />
              <defs>
                <linearGradient id="orangeBar" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FF7A18" />
                  <stop offset="100%" stopColor="#FF3D00" />
                </linearGradient>
              </defs>
              <Bar
                dataKey="value"
                fill="url(#orangeBar)"
                radius={[0, 4, 4, 0]}
                barSize={8}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ---------------- COMPARISON + HISTORY ---------------- */}
      <div className="grid md:grid-cols-2 gap-8 pb-8 mb-8">
        {/* ---- Engagement Rate Comparison ---- */}
        <div>
          <p className="text-white text-sm font-medium mb-2">
            Engagement Rate Comparison
          </p>
          <p className="text-xs text-gray-400 mb-4">
            Phoenix Baker outperforms most influencers in these categories
          </p>

          <div className="flex items-center gap-3 mb-4">
            <p className="text-xs text-white border-b border-white pb-[2px]">
              Influencer Categories
            </p>
            <span className="text-white">•</span>
            <p className="text-xs text-gray-500">Audience Countries</p>
          </div>

          <div className="grid grid-cols-2 text-xs text-gray-400">
            <p className="font-medium text-gray-300 mb-2">Category</p>
            <p className="font-medium text-gray-300 mb-2">Influencer</p>

            {[
              "Entertainment",
              "Pop Art",
              "Singer",
              "Artist",
              "Funny Videos",
              "Explainer Videos",
              "Fashion",
            ].map((cat, i) => (
              <>
                <div
                  key={`cat-${i}`}
                  className="flex items-center justify-between border-b border-[#222] py-2"
                >
                  <p>{cat}</p>
                </div>
                <div
                  key={`val-${i}`}
                  className="flex items-center justify-between border-b border-[#222] py-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-[6px] h-[6px] rounded-full bg-yellow-400"></span>
                    <p className="text-yellow-400">Average</p>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>

        {/* ---- Engagement Rate History ---- */}
        <div>
          <p className="text-white text-sm font-medium mb-3">
            Engagement Rate History
          </p>
          <div className="w-full h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementHistoryData}>
                <defs>
                  <linearGradient id="orangeGradient3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF7A18" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#FF3D00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  stroke="#666"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#666"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "6px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#FF7A18"
                  fill="url(#orangeGradient3)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6">
            <p className="text-[12px] text-gray-400 mb-1">
              Comment Rate{" "}
              <span className="text-green-400 font-medium">(Good)</span>
            </p>
            <p className="text-[12px] text-gray-500 mb-3">
              Good comments activity
            </p>

            <p className="text-[12px] text-gray-400 mb-1">
              Like – Comment Ratio{" "}
              <span className="text-[#F76659] font-medium">Low ↓</span>
            </p>
            <p className="text-[12px] text-gray-500 leading-snug">
              0.11 comments per 100 likes, similar accounts receive 1.31 comments per 100 likes.
            </p>
          </div>
        </div>
      </div>

      {/* ---------------- LIKES SPREAD ---------------- */}
      <div>
        <p className="text-[12px] text-white mb-1">Likes Spread</p>
        <div className="flex items-center gap-1 text-green-400 text-[12px] mb-3">
          <CheckCircle size={12} /> Good
        </div>
        <p className="text-[12px] w-1/4 text-gray-500 mb-3 leading-snug">
          Spread in likes between posts is 149%, similar accounts have 158.7%. 12 most recent posts likes/comments.
        </p>

        <div className="w-full h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <XAxis
                dataKey="x"
                name="Likes"
                stroke="#666"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                dataKey="y"
                name="Comments"
                stroke="#666"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              />
              <Scatter
                name="Likes vs Comments"
                data={likesSpreadData}
                fill="#FF7A18"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
