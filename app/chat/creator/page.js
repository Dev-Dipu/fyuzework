"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import {
    BarChart2,
    Calendar,
    Activity,
    CheckCircle,
    Moon,
    Sun,
    TrendingUp,
    Users,
} from "lucide-react";
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
    ScatterChart,
    Scatter,
} from "recharts";
import ChatHistorySection from "@/components/ChatHistory";
import AudienceSection from "./AudienceSection";
import GrowthAnalysis from "./GrowthAnalysis";
import EngagementAnalysis from "./EngagementAnalysis";
import ValueSection from "./ValueSection";
import ContentSection from "./ContentSection";
import BrandMentionSection from "./BrandMentionSection";
import { useRouter } from "next/navigation";

// Single-file Next.js page that renders the exact sidebar (from user) + pixel-perfect Creator Dashboard
// All data is inlined so this file is standalone. Requires TailwindCSS and Recharts.

const Dashboard = () => {

    return (
        <main className="flex-1 ml-8">
            <div className="max-w-[1100px] mx-auto">
                <header className="flex flex-col items-start justify-between gap-6 mb-4">
                    <div>
                        <h1 className="text-5xl font-semibold font-archivo text-nowrap">
                            Creator Profile
                        </h1>
                        <p className="text-sm text-[#C5C5C5] mt-1 text-nowrap">
                            Detailed report of the selected influencer
                        </p>
                    </div>
                </header>

                <div className="w-full text-white py-3 rounded-3xl">
                    {/* ----------- Header Stats Row ----------- */}
                    <div className="flex justify-between pb-6">
                        <div className="flex flex-col">
                            <p className="text-sm text-white mb-1 font-archivo">
                                Audience Quality Score
                            </p>
                            <div className="flex items-center gap-4"><div className="flex items-end gap-1">
                                <span className="text-3xl font-semibold text-green-500">
                                    78
                                </span>
                                <span className="text-sm text-white mb-1">
                                    /100
                                </span>
                            </div>
                            <p className="text-xs text-green-500 font-medium mt-1 px-2.5 py-1 border border-green-500 rounded-full leading-none">
                                Good
                            </p></div>
                        </div>
                        <div className="line h-14 w-px bg-[#E5E9EB]"></div>
                        <div className="flex flex-col">
                            <p className="text-sm text-white mb-1 font-archivo">
                                Global Rank
                            </p>
                            <p className="text-2xl font-semibold">#24</p>
                        </div>
                        <div className="line h-14 w-px bg-[#E5E9EB]"></div>
                        <div className="flex flex-col">
                            <p className="text-sm text-white mb-1 font-archivo">
                                Country Rank | Philippines
                            </p>
                            <p className="text-2xl font-semibold">#2</p>
                        </div>
                        <div className="line h-14 w-px bg-[#E5E9EB]"></div>
                        <div className="md:col-span-2 flex flex-col">
                            <p className="text-sm text-white mb-1 font-archivo">Category</p>
                            <p className="text-xl font-semibold">
                                <span className="mr-2">Design</span>|
                                <span className="mx-2">Music</span>|
                                <span className="ml-2">Fitness</span>
                            </p>
                        </div>
                    </div>

                    {/* ----------- Profile Card ----------- */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
  {/* ---------------- Left Orange Profile Card ---------------- */}
  <div className="flex flex-col justify-center gap-2 bg-gradient-to-r from-[#FF7A18] to-[#FF3D00] px-6 py-5 rounded-3xl w-full md:w-[480px] shadow-[0_0_25px_rgba(255,100,51,0.2)]">
    <div className="flex justify-between w-full">
      {/* Profile Info */}
    <div className="flex items-center gap-4">
      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shrink-0">
        <Image
          src="/assets/profile.png"
          alt="phoenix"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col">
        <div className="flex gap-1">
          <p className="font-semibold text-xl text-white">@phoenix</p>
          <Image
            src="/assets/ig-white.svg"
            width={18}
            height={18}
            alt="Instagram"
            className="opacity-80"
          />
          <Image
            src="/sealCheck.svg"
            width={18}
            height={18}
            alt="Instagram"
            className="opacity-80"
          />
        </div>

        <p className="text-xs text-white/90">Phoenix Baker</p>
      </div>
    </div>

    {/* Stats */}
    <div className="flex gap-4 text-right">
      <div>
        <p className="text-[11px] text-white/80">Followers</p>
        <p className="font-semibold text-lg text-white">628.7K</p>
      </div>
      <div className="px-4 border-x-[0.5px]">
        <p className="text-[11px] text-white/80">Following</p>
        <p className="font-semibold text-lg text-white">628</p>
      </div>
      <div>
        <p className="text-[11px] text-white/80">Posts</p>
        <p className="font-semibold text-lg text-white">120</p>
      </div>
    </div>
    </div>
    <p className="leading-none text-sm w-4/5">Co-Founder | Designer🍥 | Developer👀. DM me for personal training and achieve your...</p>
  </div>

  {/* ---------------- Right Dark Stats Card ---------------- */}
  <div className="flex flex-wrap justify-between items-center bg-gradient-to-r from-[#1a1a1a] to-[#111] rounded-3xl w-full px-6 py-5 border border-[#1f1f1f] md:flex-1">
  {/* -------- Engagement Rate -------- */}
  <div className="flex flex-col items-start min-w-[110px] mb-3 md:mb-0">
    <div className="flex flex-col gap-1 text-orange-400 mb-1">
      <TrendingUp size={14} />
      <p className="text-xs text-white font-archivo">Engagement Rate</p>
    </div>
    <p className="text-[17px] font-semibold text-white leading-none">4.9%</p>
    <p className="text-[11px] text-gray-500 mt-1">Last 30 Days</p>
  </div>

  {/* -------- Quality Audience -------- */}
  <div className="flex flex-col items-start min-w-[110px] mb-3 md:mb-0">
    <div className="flex flex-col gap-1 text-orange-400 mb-1">
      <Users size={14} />
      <p className="text-xs text-white font-archivo">Quality Audience</p>
    </div>
    <p className="text-[17px] font-semibold text-white leading-none">98%</p>
    <p className="text-[11px] text-gray-500 mt-1">628.7k</p>
  </div>

  {/* -------- Followers Growth -------- */}
  <div className="flex flex-col items-start min-w-[130px] mb-3 md:mb-0">
    <div className="flex gap-1 text-orange-400 mb-1 flex-col">
      <Activity size={14} />
      <p className="text-xs text-white font-archivo">Followers Growth</p>
    </div>

    <div className="flex items-center gap-2">
      <span className="text-[17px] font-semibold"><span className="text-green-500">↑</span> 98%</span>
      <span className="text-[11px] text-green-500 font-medium bg-green-950/30 border border-green-800 rounded-full px-2 py-1 leading-none">
        Good
      </span>
    </div>

    <p className="text-[11px] text-gray-500 mt-1">Last 30 Days</p>
  </div>

  {/* -------- Authentic Engagement -------- */}
  <div className="flex flex-col items-start min-w-[120px] mb-3 md:mb-0">
    <div className="flex flex-col gap-1 text-orange-400 mb-1">
      <BarChart2 size={14} />
      <p className="text-xs text-white font-archivo">Authentic Engagement</p>
    </div>
    <p className="text-[17px] font-semibold text-white leading-none">678k</p>
    <p className="text-[11px] text-gray-500 mt-1">per post</p>
  </div>

  {/* -------- Post Frequency -------- */}
  <div className="flex hidden flex-col items-start min-w-[100px]">
    <div className="flex flex-col gap-1 text-orange-400 mb-1">
      <Calendar size={14} />
      <p className="text-xs text-white font-archivo">Post Frequency</p>
    </div>

    <div className="flex items-center gap-2">
      <p className="text-[17px] font-semibold text-white leading-none">5</p>
      <span className="text-[11px] text-green-500 font-medium bg-green-950/30 border border-green-800 rounded-full px-2 py-1 leading-none">
        Good
      </span>
    </div>

    {/* Hide “Weekly” text on small screens for spacing */}
    <p className="text-[11px] text-gray-500 mt-1 hidden sm:block">
      Weekly
    </p>
  </div>
</div>

</div>


                    {/* ----------- Bottom Tabs ----------- */}
                    <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 text-sm text-[#5D5D5D]">
                        {[
                            "Audience",
                            "Growth",
                            "Engagement",
                            "Value",
                            "Content",
                            "Brand Mentions",
                            "Look Alike Influencers",
                        ].map((tab, index) => (
                            <button
                                key={index}
                                className={`transition cursor-pointer font-semibold leading-none hover:text-black hover:bg-white rounded-full px-2.5 py-1.5 ${
                                    index === 0
                                        ? "text-black bg-white"
                                        : ""
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Audience Section */}
                <AudienceSection />

                {/* Growth Analysis */}
                <GrowthAnalysis />

                {/* Engagement Analysis */}
                <EngagementAnalysis />
                {/* Value & Content */}
                <ValueSection />

                <ContentSection />

                <BrandMentionSection />

                <div className="h-24" />
            </div>
        </main>
    );
};

export default function CreatorDashboardPage() {
    const closeDashboard = () => {
        setIsDashboardOpen(false);
    };
    const router = useRouter();
    const [isDark, setIsDark] = useState(true);
    const [isDashboardOpen, setIsDashboardOpen] = useState(true);
    const [chatHistory, setChatHistory] = useState([]);
    const [message, setMessage] = useState("");
    const [chatResetTrigger, setChatResetTrigger] = useState(0);
    const authService = {
        initialize: () => {},
        isAuthenticated: () => true,
        logout: () => {
            if (typeof window !== "undefined") window.location.href = "/auth";
        },
        getUserId: () => "user-1",
    };

    useEffect(() => {
        // placeholder for any init logic
        authService.initialize();
    }, []);

    return (
        <div
            className={`h-screen w-full flex gap-6 p-6 ${
                isDark ? "bg-[#0D0D0D] text-white" : "bg-[#E2E1DC]"
            }`}
        >
            <div className="sidebar h-full bg-[linear-gradient(244.85deg,rgba(255,255,255,0.2)_-16.54%,rgba(255,255,255,0)_-1.98%,rgba(255,255,255,0.2)_61.94%)] backdrop-blur-[500px] z-10 inter w-[20vw] p-6 border-[.5px] rounded-3xl flex flex-col justify-between">
                <div className="space-y-5">
                    <Image
                        src="/assets/fyuze-logo.svg"
                        alt="fyuze logo"
                        height={80}
                        width={80}
                        className={`${!isDark && "invert"}`}
                    />
                    <button
                        onClick={() => {
                            router.replace("/chat");
                        }}
                        className="text-white uppercase text-xs cursor-pointer flex items-center gap-2.5"
                    >
                        <Image
                            alt="arrow"
                            className="h-10"
                            src={"/ArrowLeft.svg"}
                            width={22}
                            height={22}
                        />
                        <span>back to home</span>
                    </button>

                    <button
                        onClick={() => {
                            setChatHistory([]);
                            setMessage("");
                            setIsDashboardOpen((prev) => false);
                            // bump trigger so child ChatHistory can reset its active index
                            setChatResetTrigger((s) => s + 1);
                        }}
                        className="text-white uppercase text-sm tracking-tighter bg-black w-full gap-2 justify-center py-3 rounded-full flex items-center hover:bg-gray-900 transition"
                    >
                        <Image
                            src="/assets/ChatCircleText.svg"
                            height={20}
                            width={20}
                            alt="chatIcon"
                        />
                        New chat
                    </button>

                    <div>
                        <ChatHistorySection
                            closeDashboard={closeDashboard}
                            isDark={isDark}
                            resetTrigger={chatResetTrigger}
                        />
                    </div>
                    <div>
                        <h1
                            onClick={() => {
                                setIsDashboardOpen((prev) => !prev);
                                setChatResetTrigger((s) => s + 1);
                            }}
                            className={`text-[#E2E1DC] text-xs cursor-pointer hover:bg-white transition rounded-full ${
                                isDashboardOpen && "bg-white"
                            } ${!isDark && "invert"}`}
                        >
                            <div
                                className={`h-full w-full hover:invert flex items-center gap-2 px-3 py-1.5 ${
                                    isDashboardOpen && isDark && "invert"
                                }`}
                            >
                                <Image
                                    src="/assets/dashBoard.svg"
                                    height={24}
                                    width={24}
                                    alt="dashBoard"
                                />
                                Dashboard
                            </div>
                        </h1>
                    </div>
                </div>
                <div>
                    <div className="space-y-4">
                        <hr className={`${!isDark && "invert"}`} />
                        <h1
                            className={`text-xs ${
                                isDark ? "text-white" : "text-black"
                            }`}
                        >
                            Profile
                        </h1>
                        <div className="flex items-center gap-2">
                            <Image
                                src="/assets/profile.png"
                                alt="profile"
                                height={40}
                                width={40}
                                className="rounded-full"
                            />
                            <div>
                                <h1
                                    className={`text-sm ${
                                        isDark ? "text-white" : "text-black"
                                    }`}
                                >
                                    Jenny Wilson
                                </h1>
                                <p
                                    className={`text-[10px] ${
                                        isDark ? "text-[#c1c1c1]" : "text-black"
                                    }`}
                                >
                                    jennywilson@fyuze.com
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => authService.logout()}
                            className={`text-white text-xs tracking-tighter border-[.5px] w-full gap-2 justify-center py-2 rounded-full flex items-center hover:bg-white/10 transition ${
                                !isDark && "invert"
                            }`}
                        >
                            <Image
                                src="/assets/logOut.svg"
                                height={20}
                                width={20}
                                alt="chatIcon"
                            />
                            Log out
                        </button>
                    </div>
                </div>
            </div>

            {/* Dashboard area - scrollable independently */}
            <div className="flex-1 h-full overflow-auto font-[inter]">
                <Dashboard />
            </div>
        </div>
    );
}
