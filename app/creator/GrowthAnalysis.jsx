"use client";

import Image from "next/image";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowRight, ChevronRight } from "lucide-react";

const followerData = [
  { date: "Jan 2018", value: 200 },
  { date: "Jan 2019", value: 250 },
  { date: "Jan 2020", value: 400 },
  { date: "Jan 2021", value: 350 },
  { date: "Jan 2022", value: 450 },
  { date: "Jan 2023", value: 420 },
  { date: "Jan 2024", value: 480 },
  { date: "Jan 2025", value: 560 },
];

const followingData = [
  { date: "Jan 2018", value: 600 },
  { date: "Jan 2019", value: 800 },
  { date: "Jan 2020", value: 700 },
  { date: "Jan 2021", value: 500 },
  { date: "Jan 2022", value: 900 },
  { date: "Jan 2023", value: 1200 },
  { date: "Jan 2024", value: 850 },
  { date: "Jan 2025", value: 1000 },
];

export default function GrowthAnalysis() {
  return (
    <div className="w-full p-6">
      {/* ---------- HEADER ---------- */}
      <h2 className="text-white text-xl font-semibold mb-6 font-archivo">Growth Analysis</h2>

      {/* ---------- PROFILE ---------- */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src="/assets/profile.png"
            alt="phoenix"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-1">
            <p className="text-sm font-medium text-white flex items-center gap-1">
            @phoenix 
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
          <p className="text-xs text-gray-400">Phoenix Baker</p>
        </div>
      </div>

      {/* ---------- TOP METRICS ---------- */}
      <div className="flex border-b border-[#222] pb-6 mb-6">
        {/* Yearly Growth */}
        <div className="pr-8 border-r w-1/3 border-[#222]">
          <p className="text-[12px] text-white mb-1 font-archivo">Yearly Growth</p>
          <p className="leading-tight font-semibold text-white mb-1">9.8%</p>
          <p className="text-[12px] text-gray-400 leading-snug">
            @phoenix followers number declined by 3.3% followers in the last
            year. Accounts of similar size have a growth rate 19.1% per year.
          </p>
        </div>

        {/* Follower Growth */}
        <div className="pl-8 w-1/3">
          <p className="text-[12px] text-white mb-1 font-archivo">Follower Growth</p>
          <p className="font-semibold text-white mb-1 leading-tight">
            Negative trend more than 12 months ago
          </p>
          <p className="text-[12px] text-gray-400 leading-snug">
            Negative trend detected on followers graph more than 12 months ago,
            audience might be inauthentic.
          </p>
        </div>
      </div>

      {/* ---------- FOLLOWER GROWTH CHART ---------- */}
      <div className="w-full h-[200px] mb-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={followerData}>
            <defs>
              <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
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
            <YAxis stroke="#666" fontSize={11} tickLine={false} axisLine={false} />
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
              fill="url(#orangeGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ---------- FOLLOWER DYNAMICS ---------- */}
      <div className="border-t border-[#222] pt-6 mb-4">
        <p className="text-[12px] text-white mb-1 font-archivo">Follower Dynamics</p>
        <p className="text-xl w-1/2 font-semibold text-white mb-1">
          Follow–unfollow patterns and mass following more than 12 months ago
        </p>
        <p className="text-[12px] text-gray-400 w-1/2 leading-snug mb-4">
          Follow–unfollow patterns and mass following detected on followings
          graph more than 12 months ago, audience might be inauthentic.
        </p>

        <div className="w-full h-[200px] mb-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={followingData}>
              <defs>
                <linearGradient id="orangeGradient2" x1="0" y1="0" x2="0" y2="1">
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
                fill="url(#orangeGradient2)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ---------- MENTIONED BY ---------- */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-white text-sm font-medium font-archivo">Mentioned By</p>
          <div className="flex items-center">
            <p className="text-xs text-[#FF6B3A] cursor-pointer">VIEW ALL</p> <ChevronRight className="text-[#FF6B3A] scale-80" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="flex items-center justify-between border border-white rounded-2xl px-4 py-3"
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
                  <p className="text-xs text-white">{user.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-white">Followers</p>
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
