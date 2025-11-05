"use client";

import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function BrandMentionSection() {
  const accounts = [
    {
      username: "@phoenix",
      name: "Phoenix Baker",
      followers: "346M",
      er: "0.1% ER",
      img: "/assets/profile.png",
    },
    {
      username: "@LANAS",
      name: "Lana Steiner",
      followers: "1.7M",
      er: "0.1% ER",
      img: "/assets/profile.png",
    },
    {
      username: "@Cano_Drew",
      name: "Drew Cano",
      followers: "82M",
      er: "0.1% ER",
      img: "/assets/profile.png",
    },
    {
      username: "@Kate",
      name: "Kate Morrison",
      followers: "628.7K",
      er: "0.1% ER",
      img: "/assets/profile.png",
    },
  ];

  return (
    <div className="w-full p-6 space-y-10">
      {/* ---------------- BRAND MENTION ---------------- */}
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">Brand Mention</h2>
          <div className="flex items-center gap-1 text-orange-500 text-xs cursor-pointer">
            VIEW ALL <ArrowRight size={12} />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-6 mb-6 text-sm">
          <p className="text-white font-medium border-b border-white pb-[2px] cursor-pointer">
            All Categories
          </p>
          <p className="text-gray-400 hover:text-white cursor-pointer transition">
            Beauty
          </p>
          <p className="text-gray-400 hover:text-white cursor-pointer transition">
            Cinema & Actor Actresses
          </p>
          <p className="text-gray-400 hover:text-white cursor-pointer transition">
            Shows
          </p>
          <p className="text-gray-400 hover:text-white cursor-pointer transition">
            Others
          </p>
        </div>

        {/* Mentioned Accounts */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {accounts.map((user, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-transparent border border-[#2a2a2a] rounded-2xl px-4 py-3 hover:bg-[#1a1a1a] transition"
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
                  <p className="text-white text-sm font-medium flex items-center gap-1">
                    {user.username}{" "}
                    <span className="text-gray-400 text-xs">✔</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    {user.name} | {user.er}
                  </p>
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

      {/* ---------------- SIMILAR ACCOUNTS ---------------- */}
      <div>
        <h2 className="text-white text-lg font-semibold mb-4">
          Similar Accounts
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {accounts.slice(0, 4).map((user, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-transparent border border-[#2a2a2a] rounded-2xl px-4 py-3 hover:bg-[#1a1a1a] transition"
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
                  <p className="text-white text-sm font-medium flex items-center gap-1">
                    {user.username}{" "}
                    <span className="text-gray-400 text-xs">✔</span>
                  </p>
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
