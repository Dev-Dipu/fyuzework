"use client";

import { ChevronDown } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";

// Audience demographics bar chart data
const demographicData = [
  { age: "13-17", male: 5, female: 4 },
  { age: "18-24", male: 15, female: 18 },
  { age: "25-34", male: 20, female: 25 },
  { age: "35-44", male: 10, female: 12 },
  { age: "45-54", male: 6, female: 7 },
  { age: "55-64", male: 4, female: 5 },
  { age: "65+", male: 3, female: 4 },
];

export default function AudienceSection() {
  return (
    <div className="bg-[#0f0f0f] rounded-3xl w-full p-6">
      {/* ================== AUDIENCE HEADER ================== */}
      <h2 className="text-white text-xl font-semibold mb-6">Audience</h2>

      {/* ================== TOP SUMMARY ROW ================== */}
      <div className="flex flex-wrap items-start border-b border-[#E5E9EB] pb-5">
  {/* -------- Quality Audience -------- */}
  <div className="flex flex-col pr-8 border-r border-[#E5E9EB]">
    <p className="text-[12px] text-white mb-1">Quality Audience</p>
    <div className="flex items-baseline gap-1">
      <p className="text-[16px] font-semibold text-white leading-none">98%</p>
      <p className="text-[11px] text-[#8F8F8F] leading-none">628.7k</p>
    </div>
  </div>

  {/* -------- Top Country -------- */}
  <div className="flex flex-col px-8 border-r border-[#E5E9EB]">
    <p className="text-[12px] text-white mb-1">Top Country</p>
    <p className="text-[16px] font-semibold text-white leading-none whitespace-nowrap">
      United States of America
    </p>
  </div>

  {/* -------- Top Gender -------- */}
  <div className="flex flex-col px-8 border-r border-[#E5E9EB]">
    <p className="text-[12px] text-white mb-1">Top Gender</p>
    <div className="flex items-baseline gap-1">
      <p className="text-[16px] font-semibold text-white leading-none">Female</p>
      <p className="text-[11px] text-[#8F8F8F] leading-none">78%</p>
    </div>
  </div>

  {/* -------- Top Age -------- */}
  <div className="flex flex-col pl-8">
    <p className="text-[12px] text-white mb-1">Top Age</p>
    <div className="flex items-baseline gap-1">
      <p className="text-[16px] font-semibold text-white leading-none">25–34</p>
      <p className="text-[11px] text-[#8F8F8F] leading-none">78%</p>
    </div>
  </div>
</div>


      {/* ================== GEO / DEMO / TYPE ================== */}
      <div className="grid md:grid-cols-3 gap-6 mb-8 mt-6 pb-6 border-b border-[#E5E9EB]">
        {/* Audience Geo */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <p className="text-white text-sm font-medium">Audience Geo</p>
            <div className="flex items-center gap-1 text-white text-xs">
              Country <ChevronDown size={12} />
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: "United States of America", value: 80 },
              { label: "Brazil", value: 75 },
              { label: "India", value: 30 },
              { label: "United Kingdom", value: 20 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs text-white mb-1">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-[5px] bg-[#222] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF7A18] to-[#FF3D00] rounded-full"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Demographics */}
        <div className="flex flex-col px-4 border-x-[1px]">
          <div className="flex justify-between items-center mb-4">
            <p className="text-white text-sm font-medium">
              Audience Demographics
            </p>
            <div className="flex items-center gap-1 text-white text-xs">
              Age & Gender <ChevronDown size={12} />
            </div>
          </div>
          <div className="w-full h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demographicData} barSize={10}>
                <XAxis
                  dataKey="age"
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
                  width={30}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "6px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="male" fill="#FF7A18" radius={[4, 4, 0, 0]} />
                <Bar dataKey="female" fill="#FF3D00" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Audience Type */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <p className="text-white text-sm font-medium">Audience Type</p>
          </div>
          <div className="space-y-3">
            {[
              { label: "Real People", value: 80 },
              { label: "Influencers", value: 75 },
              { label: "Mass Followers", value: 30 },
              { label: "Suspicious Accounts", value: 20 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs text-white mb-1">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-[5px] bg-[#222] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF7A18] to-[#FF3D00] rounded-full"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom small badges */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[
          { label: "Male", value: "65%" },
          { label: "Female", value: "20%" },
          { label: "Adults", value: "15%" },
        ].map((stat, i) => (
          <div
            key={i}
            className="text-xs text-gray-300 border border-white rounded-full px-3 py-[3px]"
          >
            {stat.label}:{" "}
            <span className="text-white font-medium">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-between items-stretch pb-6">
  {/* -------- Estimated Reach -------- */}
  <div className="flex flex-col pr-8 border-r border-[#D0D5DD]">
    <p className="text-[12px] text-white mb-1">Estimated Reach</p>
    <div className="flex items-baseline gap-2 text-white">
      <p className="text-[16px] font-semibold">17.1M–51.3M</p>
      <span className="text-[12px] text-gray-400">Post</span>
      <span className="text-gray-500">·</span>
      <p className="text-[16px] font-semibold">17.1M–51.3M</p>
      <span className="text-[12px] text-gray-400">Story</span>
    </div>
  </div>

  {/* -------- Estimated Impressions -------- */}
  <div className="flex flex-col px-8 border-r border-[#D0D5DD]">
    <p className="text-[12px] text-white mb-1">Estimated Impressions</p>
    <p className="text-[16px] font-semibold text-white">21.2M</p>
  </div>

  {/* -------- Audience Reachability -------- */}
  <div className="flex flex-col px-8 border-r border-[#D0D5DD] max-w-[260px]">
    <p className="text-[12px] text-white mb-1">Audience Reachability</p>
    <div className="flex items-center gap-2 mb-1">
      <span className="text-[11px] text-green-400 font-medium px-2 py-1 border border-green-500 rounded-full leading-none">
        Good
      </span>
    </div>
    <p className="text-[12px] text-gray-400 leading-snug">
      87.6% of audience have less than 1,500 followings, similar accounts have 84.99% on average
    </p>
  </div>

  {/* -------- Estimated Authenticity -------- */}
  <div className="flex flex-col pl-8 max-w-[260px]">
    <p className="text-[12px] text-white mb-1">Estimated Authenticity</p>
    <div className="flex items-center gap-2 mb-1">
      <span className="text-[11px] text-green-400 font-medium px-2 py-1 border border-green-500 rounded-full leading-none">
        Good
      </span>
    </div>
    <p className="text-[12px] text-gray-400 leading-snug">
      75.59% of audience look authentic, similar accounts have 71.53% of
      authentic audience on average
    </p>
  </div>
</div>


      {/* ================== EDUCATION + BRAND ================== */}
      <div className="grid md:grid-cols-2 gap-8 pt-8 mb-8">
        {/* Education Level */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-white text-sm font-medium">
              Audience Education Level
            </p>
            <div className="flex items-center gap-1 text-white text-xs">
              Education Level <ChevronDown size={12} />
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: "No Education", value: 80 },
              { label: "Incomplete Primary", value: 75 },
              { label: "Primary", value: 30 },
              { label: "Lower Secondary", value: 20 },
              { label: "Upper Secondary", value: 75 },
              { label: "Post Secondary", value: 20 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs text-white mb-1">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-[5px] bg-[#222] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF7A18] to-[#FF3D00] rounded-full"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Affinity */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-white text-sm font-medium">Brand Affinity</p>
            <p className="text-xs text-[#FF6B3A] cursor-pointer">VIEW ALL</p>
          </div>
          <div className="grid grid-cols-3 gap-y-4 text-gray-500 text-sm">
            <p>Layers</p>
            <p>Sisyphus</p>
            <p>Circooles</p>
            <p>Catalog</p>
            <p>Quotient</p>
            <p>Layers</p>
            <p>Sisyphus</p>
            <p>Circooles</p>
          </div>
        </div>
      </div>

      {/* ================== NOTABLE AUDIENCE ================== */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-white text-sm font-medium">Notable Audience</p>
          <p className="text-xs text-[#FF6B3A] cursor-pointer">VIEW ALL</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              username: "@phoenix",
              name: "Phoenix Baker",
              followers: "346M",
              img: "/assets/profile.png",
            },
            {
              username: "@LANAS",
              name: "Lana Steiner",
              followers: "1.7M",
              img: "/assets/profile.png",
            },
            {
              username: "@Cano_Drew",
              name: "Drew Cano",
              followers: "82M",
              img: "/assets/profile.png",
            },
            {
              username: "@Kate",
              name: "Kate Morrison",
              followers: "628.7K",
              img: "/assets/profile.png",
            },
          ].map((user, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={user.img}
                    alt={user.username}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-white text-sm font-medium">
                    {user.username}
                  </p>
                  <Image
                              src="/assets/ig-white.svg"
                              width={14}
                              height={14}
                              alt="Instagram"
                              className="opacity-80"
                            />
                            <Image
                              src="/sealCheck.svg"
                              width={14}
                              height={14}
                              alt="Instagram"
                              className="opacity-80"
                            />
                  </div>
                  <p className="text-xs text-gray-400">{user.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-gray-400">Followers</p>
                <p className="text-sm text-white font-semibold">
                  {user.followers}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
