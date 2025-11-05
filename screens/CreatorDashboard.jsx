import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
  ScatterChart,
  Scatter,
} from "recharts";

// Single-file React component for Next.js + Tailwind.
// Tailwind should be configured in the app. Recharts is used for charts.

const headerStats = [
  { label: "Audience Quality Score", value: "78" },
  { label: "Global Rank", value: "#24" },
  { label: "Country Rank", value: "#2" },
  { label: "Categories", value: "Design | Music | Fitness" },
];

const audienceBars = [
  { label: "United States of America", value: 62 },
  { label: "India", value: 10 },
  { label: "Brazil", value: 6 },
  { label: "Other", value: 22 },
];

const growthArea = [
  { date: "Jan'20", value: 200 },
  { date: "Apr'20", value: 450 },
  { date: "Jul'20", value: 320 },
  { date: "Oct'20", value: 560 },
  { date: "Jan'21", value: 700 },
  { date: "Apr'21", value: 820 },
  { date: "Jul'21", value: 960 },
  { date: "Oct'21", value: 1200 },
  { date: "Jan'22", value: 1380 },
  { date: "Apr'22", value: 1600 },
  { date: "Jul'22", value: 1800 },
  { date: "Oct'22", value: 1950 },
  { date: "Jan'23", value: 2100 },
];

const engagementLine = [
  { date: "Jan'20", e: 0.5 },
  { date: "Apr'20", e: 0.8 },
  { date: "Jul'20", e: 0.6 },
  { date: "Oct'20", e: 1.2 },
  { date: "Jan'21", e: 1.6 },
  { date: "Apr'21", e: 1.3 },
  { date: "Jul'21", e: 1.9 },
  { date: "Oct'21", e: 2.3 },
  { date: "Jan'22", e: 2.7 },
  { date: "Apr'22", e: 2.1 },
  { date: "Jul'22", e: 2.9 },
  { date: "Oct'22", e: 3.3 },
  { date: "Jan'23", e: 3.8 },
];

const engagementBars = [
  { name: "Video", val: 45 },
  { name: "Reels", val: 30 },
  { name: "Images", val: 12 },
  { name: "Stories", val: 8 },
  { name: "Live", val: 5 },
];

const valueMetrics = [
  { label: "Estimated Price", value: "$552,000 - $1,000,000" },
  { label: "Estimated CPMs", value: "$25,000 - $80,000" },
  { label: "Estimated Reach", value: "900,000 - 3,000,000" },
];

export default function CreatorDashboard() {
  return (
    <div className="min-h-screen bg-[#050405] text-slate-100 p-8 font-sans">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold">Creator Profile</h1>
            <p className="text-sm text-slate-400 mt-1">Detailed account & forecast overview</p>
          </div>

          <div className="flex gap-4 items-center">
            {headerStats.map((s) => (
              <div key={s.label} className="bg-[#0f0e10] px-4 py-3 rounded-2xl shadow-sm w-[220px]">
                <div className="text-xs text-slate-400">{s.label}</div>
                <div className="mt-1 font-bold text-lg text-orange-400">{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Profile card */}
        <div className="mt-6 bg-[#0b0b0c] rounded-3xl p-6 shadow-lg border border-[#151314]">
          <div className="flex gap-6 items-center">
            <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-orange-600 to-orange-800 flex items-center justify-center text-2xl font-bold">
              KP
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold">@phoenix</div>
                  <div className="text-sm text-slate-400">Producer • Design • Motion</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Followers</div>
                  <div className="font-bold text-xl">678k</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-4">
                <div className="p-3 bg-[#0f0e10] rounded-xl">
                  <div className="text-xs text-slate-400">Engagement</div>
                  <div className="text-white font-semibold">4.9%</div>
                </div>
                <div className="p-3 bg-[#0f0e10] rounded-xl">
                  <div className="text-xs text-slate-400">Audience Quality</div>
                  <div className="text-white font-semibold">88%</div>
                </div>
                <div className="p-3 bg-[#0f0e10] rounded-xl">
                  <div className="text-xs text-slate-400">Top Content</div>
                  <div className="text-white font-semibold">Fitness</div>
                </div>
                <div className="p-3 bg-[#0f0e10] rounded-xl">
                  <div className="text-xs text-slate-400">Avg Views</div>
                  <div className="text-white font-semibold">87k</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Audience Section */}
        <section className="mt-6 bg-[#070708] rounded-3xl p-6 shadow-inner border border-[#151314]">
          <h2 className="text-lg font-semibold mb-4">Audience</h2>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-[#0b0b0c] rounded-2xl p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-slate-400">Country</div>
                  <div className="font-semibold">United States of America</div>
                </div>
                <div className="text-sm text-slate-400">Top Age: 25-34</div>
              </div>

              <div className="mt-4">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={audienceBars} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#0f0f10" />
                    <XAxis dataKey="label" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                    <Tooltip wrapperStyle={{ background: '#0b0b0c', borderRadius: 6 }} />
                    <Bar dataKey="value" radius={[8,8,8,8]}>
                      {audienceBars.map((entry, index) => (
                        <cell key={`cell-${index}`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="p-3 bg-[#0f0e10] rounded-lg">
                  <div className="text-xs text-slate-400">Active Hours</div>
                  <div className="font-bold">12:00PM - 5:30PM</div>
                </div>
                <div className="p-3 bg-[#0f0e10] rounded-lg">
                  <div className="text-xs text-slate-400">Est. Impressions</div>
                  <div className="font-bold">2.1M</div>
                </div>
                <div className="p-3 bg-[#0f0e10] rounded-lg">
                  <div className="text-xs text-slate-400">Audience Reachability</div>
                  <div className="font-bold">68%</div>
                </div>
              </div>
            </div>

            <div className="col-span-1 bg-[#0b0b0c] rounded-2xl p-4">
              <div className="text-sm text-slate-400">Audience Type</div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Real People</span>
                  <span>82%</span>
                </div>
                <div className="w-full bg-[#111] h-2 rounded-full mt-2 overflow-hidden">
                  <div className="h-2 bg-orange-500 rounded-full" style={{ width: '82%' }} />
                </div>

                <div className="flex justify-between text-xs text-slate-400 mt-3">
                  <span>Brand Followers</span>
                  <span>8%</span>
                </div>
                <div className="w-full bg-[#111] h-2 rounded-full mt-2 overflow-hidden">
                  <div className="h-2 bg-orange-600 rounded-full" style={{ width: '8%' }} />
                </div>

                <div className="flex justify-between text-xs text-slate-400 mt-3">
                  <span>Other</span>
                  <span>10%</span>
                </div>
                <div className="w-full bg-[#111] h-2 rounded-full mt-2 overflow-hidden">
                  <div className="h-2 bg-orange-700 rounded-full" style={{ width: '10%' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Growth Analysis */}
        <section className="mt-6 bg-[#070708] rounded-3xl p-6">
          <h2 className="text-lg font-semibold mb-4">Growth Analysis</h2>

          <div className="bg-[#0b0b0c] rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">Followers growth</div>
              <div className="text-xs text-slate-400">Insight: Negative trend more than 12 months ago</div>
            </div>

            <div style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={growthArea} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff7a18" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#220601" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="gradStroke" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ff7a18" stopOpacity={1} />
                      <stop offset="100%" stopColor="#ff3d00" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fill: "#9CA3AF" }} />
                  <YAxis tick={{ fill: "#9CA3AF" }} />
                  <Tooltip wrapperStyle={{ background: '#0b0b0c', borderRadius: 6 }} />
                  <Area type="monotone" dataKey="value" stroke="url(#gradStroke)" fill="url(#grad1)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="p-3 bg-[#0f0e10] rounded-lg">
                <div className="text-xs text-slate-400">Net Growth</div>
                <div className="font-bold">8.2%</div>
              </div>
              <div className="p-3 bg-[#0f0e10] rounded-lg">
                <div className="text-xs text-slate-400">Follower churn</div>
                <div className="font-bold">-0.6%</div>
              </div>
              <div className="p-3 bg-[#0f0e10] rounded-lg">
                <div className="text-xs text-slate-400">Active Campaigns</div>
                <div className="font-bold">3</div>
              </div>
            </div>
          </div>
        </section>

        {/* Engagement Analysis */}
        <section className="mt-6 bg-[#070708] rounded-3xl p-6">
          <h2 className="text-lg font-semibold mb-4">Engagement Analysis</h2>

          <div className="bg-[#0b0b0c] rounded-2xl p-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-slate-400">Engagement by content type</div>
                <div style={{ width: '100%', height: 160 }} className="mt-2">
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={engagementBars} layout="vertical" margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" tick={{ fill: '#9CA3AF' }} />
                      <Tooltip wrapperStyle={{ background: '#0b0b0c', borderRadius: 6 }} />
                      <Bar dataKey="val" radius={[6,6,6,6]} fill="#ff7a18" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <div className="text-sm text-slate-400">Engagement over time</div>
                <div style={{ width: '100%', height: 160 }} className="mt-2">
                  <ResponsiveContainer width="100%" height={160}>
                    <LineChart data={engagementLine} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <XAxis dataKey="date" tick={{ fill: '#9CA3AF' }} />
                      <YAxis tick={{ fill: '#9CA3AF' }} />
                      <Tooltip wrapperStyle={{ background: '#0b0b0c', borderRadius: 6 }} />
                      <Line type="monotone" dataKey="e" stroke="#ff7a18" strokeWidth={2} dot={{ r: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm text-slate-400">Engagement Rate</div>
              <div className="mt-2 w-full bg-[#111] h-3 rounded-full overflow-hidden">
                <div className="h-3 bg-orange-500" style={{ width: '2.1%' }} />
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm text-slate-400">Post Scatter (likes vs comments)</div>
              <div style={{ width: '100%', height: 140 }} className="mt-2">
                <ResponsiveContainer width="100%" height={140}>
                  <ScatterChart margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <XAxis dataKey="x" type="number" tick={{ fill: '#9CA3AF' }} />
                    <YAxis dataKey="y" type="number" tick={{ fill: '#9CA3AF' }} />
                    <Tooltip wrapperStyle={{ background: '#0b0b0c', borderRadius: 6 }} />
                    <Scatter data={[{ x: 10, y: 5 }, { x: 40, y: 20 }, { x: 80, y: 45 }, { x: 130, y: 80 }]} fill="#ff7a18" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Value & Content */}
        <section className="mt-6 grid grid-cols-2 gap-6">
          <div className="bg-[#0b0b0c] rounded-2xl p-4">
            <h3 className="text-sm text-slate-400">Value</h3>
            <div className="mt-4 grid gap-3">
              {valueMetrics.map((v) => (
                <div key={v.label} className="flex justify-between items-center p-3 bg-[#0f0e10] rounded-lg">
                  <div className="text-sm text-slate-300">{v.label}</div>
                  <div className="font-bold">{v.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0b0b0c] rounded-2xl p-4">
            <h3 className="text-sm text-slate-400">Content</h3>
            <div className="mt-4 text-sm text-slate-300">Top performing category: Fitness • Avg sentiment: Positive</div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="p-2 bg-[#0f0e10] rounded-lg text-center">Reach</div>
              <div className="p-2 bg-[#0f0e10] rounded-lg text-center">Engagement</div>
              <div className="p-2 bg-[#0f0e10] rounded-lg text-center">CTR</div>
            </div>
          </div>
        </section>

        {/* Brand Mention & Similar Accounts */}
        <section className="mt-6 bg-[#070708] rounded-3xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Brand Mention</h2>
            <div className="text-sm text-slate-400">View all</div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-[#0b0b0c] rounded-lg">@brand_one</div>
            <div className="p-3 bg-[#0b0b0c] rounded-lg">@brand_two</div>
            <div className="p-3 bg-[#0b0b0c] rounded-lg">@brand_three</div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Similar Accounts</h3>
            <div className="mt-3 grid grid-cols-4 gap-3">
              <div className="p-3 bg-[#0b0b0c] rounded-lg">@similar_1</div>
              <div className="p-3 bg-[#0b0b0c] rounded-lg">@similar_2</div>
              <div className="p-3 bg-[#0b0b0c] rounded-lg">@similar_3</div>
              <div className="p-3 bg-[#0b0b0c] rounded-lg">@similar_4</div>
            </div>
          </div>
        </section>

        <div className="h-24" />
      </div>
    </div>
  );
}
