"use client";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useTheme } from '@/lib/contexts/ThemeContext';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PricingScreen = () => {
    const { isDark } = useTheme();

    return (
        <div className="bg-[#E2E1DC]">
        <Navbar />
        <div
            className={`min-h-screen pt-12 font-sans transition-colors duration-300 ${
                isDark ? "bg-[#0D0D0D]" : "bg-[#E2E1DC]"
            } flex flex-col justify-center items-center px-4 pt-4`}
        >
            

            <h1
                className={`text-5xl md:text-7xl font-bold leading-none transition-colors duration-300 ${
                    isDark ? "text-white" : "text-black"
                }`}
            >
                Pricing
            </h1>

            <p
                className={`mt-6 text-sm font-light w-full md:w-2/5 text-center transition-colors duration-300 ${
                    isDark ? "text-gray-300" : "text-black"
                }`}
            >
                Search millions of creators in seconds using AI-powered filters:{" "}
                <span className="font-medium">
                    audience authenticity, geo-verification, sentiment,
                    engagement quality, niche fit, and more.
                </span>
            </p>

            <div className="w-full flex flex-wrap items-center justify-center gap-8 mt-10">
                {/* Starter */}
                <div className="relative w-full md:w-[22%] group hover:cursor-pointer">
                    <div
                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 
            before:content-[''] before:absolute before:inset-0 before:rounded-3xl 
            before:bg-[linear-gradient(302.64deg,rgba(221,51,5,0.4)_-0.83%,rgba(255,107,58,0.4)_49.95%,rgba(255,179,71,0.4)_100.74%)] 
            before:blur-[120px] before:opacity-100"
                    ></div>

                    <div
                        className={`relative aspect-[4/5] rounded-3xl p-5 flex flex-col justify-between 
            transition duration-300 group-hover:shadow-xl ${
                isDark
                    ? "bg-[#1A1A1A] border border-gray-800"
                    : "bg-[#E2E1DC] border border-black"
            }`}
                    >
                        <div className="text-sm">
                            <h1
                                className={`text-3xl leading-none font-bold transition-colors duration-300 ${
                                    isDark ? "text-white" : "text-black"
                                }`}
                            >
                                Starter
                            </h1>
                            <p
                                className={`font-medium mt-6 mb-3.5 transition-colors duration-300 ${
                                    isDark ? "text-gray-400" : "text-[#4F4F4F]"
                                }`}
                            >
                                Ideal For
                            </p>
                            <p
                                className={`font-light transition-colors duration-300 ${
                                    isDark ? "text-gray-400" : "text-[#4F4F4F]"
                                }`}
                            >
                                Small Brands <span className="mx-2">•</span>{" "}
                                Individuals
                            </p>
                        </div>
                        <div className="flex gap-3 absolute top-1/2 -translate-y-1/2 flex-wrap">
                            <h3
                                className={`py-2 px-3 md:py-2.5 md:px-4 rounded-full leading-none text-[13px] transition-colors duration-300 ${
                                    isDark
                                        ? "border border-gray-600 text-gray-300"
                                        : "border border-[#828282] text-black"
                                }`}
                            >
                                400 Credits
                            </h3>
                            <h3
                                className={`py-2 px-3 md:py-2.5 md:px-4 rounded-full leading-none text-[13px] transition-colors duration-300 ${
                                    isDark
                                        ? "border border-gray-600 text-gray-300"
                                        : "border border-[#828282] text-black"
                                }`}
                            >
                                $0.12 cost per credit
                            </h3>
                        </div>
                        <div className="flex justify-between items-center">
                            <h1
                                className={`font-light transition-colors duration-300 ${
                                    isDark ? "text-[#828282]" : "text-[#828282]"
                                }`}
                            >
                                <span
                                    className={`text-3xl font-bold transition-colors duration-300 ${
                                        isDark ? "text-white" : "text-[#0D0D0D]"
                                    }`}
                                >
                                    $49
                                </span>
                                /Month
                            </h1>
                            <button className="px-4 py-2.5 bg-[#FF6B3A] text-[12px] rounded-full text-white cursor-pointer leading-tight hover:bg-[#FF5520] transition-colors">
                                START NOW
                            </button>
                        </div>
                    </div>
                </div>

                {/* Growth - Recommended */}
                <div className="relative w-full md:w-[22%] group hover:cursor-pointer">
                    <div
                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 
            before:content-[''] before:absolute before:inset-0 before:rounded-3xl 
            before:bg-[linear-gradient(302.64deg,rgba(221,51,5,0.4)_-0.83%,rgba(255,107,58,0.4)_49.95%,rgba(255,179,71,0.4)_100.74%)] 
            before:blur-[120px] before:opacity-100"
                    ></div>

                    <div
                        className="relative aspect-[4/5] rounded-3xl p-5 flex flex-col justify-between transition duration-300 group-hover:shadow-xl"
                        style={{
                            background:
                                "linear-gradient(302.64deg, #DD3305 -0.83%, #FF6B3A 49.95%, #FFB347 100.74%)",
                            color: "white",
                        }}
                    >
                        <div className="text-sm">
                            <div className="flex items-center justify-between">
                                <h1 className="text-3xl leading-none font-bold text-white">
                                    Growth
                                </h1>
                                <div className="flex items-center gap-1 font-bold text-xs">
                                    <Image
                                        className="invert"
                                        height={24}
                                        width={24}
                                        alt="logo"
                                        src={"/MONOGRAM.svg"}
                                    />
                                    <span className="text-white">Recommended</span>
                                </div>
                            </div>
                            <p className="font-medium mt-6 mb-3.5 text-white">Ideal For</p>
                            <p className="font-light text-white">
                                Marketing agencies testing campaigns
                            </p>
                        </div>
                        <div className="flex gap-3 absolute top-1/2 -translate-y-1/2 flex-wrap">
                            <h3 className="py-2 px-3 md:py-2.5 md:px-4 bg-white text-black rounded-full leading-none text-[13px]">
                                1500 Credits
                            </h3>
                            <h3 className="py-2 px-3 md:py-2.5 md:px-4 bg-white text-black rounded-full leading-none text-[13px]">
                                $0.099 cost per credit
                            </h3>
                        </div>
                        <div className="flex justify-between items-center">
                            <h1 className="font-light text-white">
                                <span className="text-3xl font-bold text-white">$149</span>
                                /Month
                            </h1>
                            <button
                                className={`px-4 py-2.5 text-[12px] rounded-full cursor-pointer leading-tight transition-colors ${
                                    isDark
                                        ? "bg-white text-black hover:bg-gray-200"
                                        : "bg-[#E2E1DC] text-black hover:bg-[#d5d4cf]"
                                }`}
                            >
                                START NOW
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pro */}
                <div className="relative w-full md:w-[22%] group hover:cursor-pointer">
                    <div
                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 
            before:content-[''] before:absolute before:inset-0 before:rounded-3xl 
            before:bg-[linear-gradient(302.64deg,rgba(221,51,5,0.4)_-0.83%,rgba(255,107,58,0.4)_49.95%,rgba(255,179,71,0.4)_100.74%)] 
            before:blur-[120px] before:opacity-100"
                    ></div>

                    <div
                        className={`relative aspect-[4/5] rounded-3xl p-5 flex flex-col justify-between 
            transition duration-300 group-hover:shadow-xl ${
                isDark
                    ? "bg-[#1A1A1A] border border-gray-800"
                    : "bg-[#E2E1DC] border border-black"
            }`}
                    >
                        <div className="text-sm">
                            <h1
                                className={`text-3xl leading-none font-bold transition-colors duration-300 ${
                                    isDark ? "text-white" : "text-black"
                                }`}
                            >
                                Pro
                            </h1>
                            <p
                                className={`font-medium mt-6 mb-3.5 transition-colors duration-300 ${
                                    isDark ? "text-gray-400" : "text-[#4F4F4F]"
                                }`}
                            >
                                Ideal For
                            </p>
                            <p
                                className={`font-light transition-colors duration-300 ${
                                    isDark ? "text-gray-400" : "text-[#4F4F4F]"
                                }`}
                            >
                                Larger influencer platforms{" "}
                                <span className="mx-2">•</span> SAAS Re-Sellers
                            </p>
                        </div>
                        <div className="flex gap-3 absolute top-1/2 -translate-y-1/2 flex-wrap">
                            <h3
                                className={`py-2 px-3 md:py-2.5 md:px-4 rounded-full leading-none text-[13px] transition-colors duration-300 ${
                                    isDark
                                        ? "border border-gray-600 text-gray-300"
                                        : "border border-[#828282] text-black"
                                }`}
                            >
                                5000 Credits
                            </h3>
                            <h3
                                className={`py-2 px-3 md:py-2.5 md:px-4 rounded-full leading-none text-[13px] transition-colors duration-300 ${
                                    isDark
                                        ? "border border-gray-600 text-gray-300"
                                        : "border border-[#828282] text-black"
                                }`}
                            >
                                $0.079 cost per credit
                            </h3>
                        </div>
                        <div className="flex justify-between items-center">
                            <h1
                                className={`font-light transition-colors duration-300 ${
                                    isDark ? "text-[#828282]" : "text-[#828282]"
                                }`}
                            >
                                <span
                                    className={`text-3xl font-bold transition-colors duration-300 ${
                                        isDark ? "text-white" : "text-[#0D0D0D]"
                                    }`}
                                >
                                    $399
                                </span>
                                /Month
                            </h1>
                            <button className="px-4 py-2.5 bg-[#FF6B3A] text-[12px] rounded-full text-white cursor-pointer leading-tight hover:bg-[#FF5520] transition-colors">
                                START NOW
                            </button>
                        </div>
                    </div>
                </div>

                {/* Enterprise */}
                <div className="relative w-full md:w-[22%] group hover:cursor-pointer">
                    <div
                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 
            before:content-[''] before:absolute before:inset-0 before:rounded-3xl 
            before:bg-[linear-gradient(302.64deg,rgba(221,51,5,0.4)_-0.83%,rgba(255,107,58,0.4)_49.95%,rgba(255,179,71,0.4)_100.74%)] 
            before:blur-[120px] before:opacity-100"
                    ></div>

                    <div
                        className={`relative aspect-[4/5] rounded-3xl p-5 flex flex-col justify-between 
            transition duration-300 group-hover:shadow-xl ${
                isDark
                    ? "bg-[#1A1A1A] border border-gray-800"
                    : "bg-[#E2E1DC] border border-black"
            }`}
                    >
                        <div className="text-sm">
                            <h1
                                className={`text-3xl leading-none font-bold transition-colors duration-300 ${
                                    isDark ? "text-white" : "text-black"
                                }`}
                            >
                                Enterprise
                            </h1>
                            <p
                                className={`font-medium mt-6 mb-3.5 transition-colors duration-300 ${
                                    isDark ? "text-gray-400" : "text-[#4F4F4F]"
                                }`}
                            >
                                Ideal For
                            </p>
                            <p
                                className={`font-light transition-colors duration-300 ${
                                    isDark ? "text-gray-400" : "text-[#4F4F4F]"
                                }`}
                            >
                                Agencies <span className="mx-2">•</span>{" "}
                                Enterprises
                            </p>
                        </div>
                        <div className="flex gap-3 absolute top-1/2 -translate-y-1/2 flex-wrap">
                            <h3
                                className={`py-2 px-3 md:py-2.5 md:px-4 rounded-full leading-none text-[13px] transition-colors duration-300 ${
                                    isDark
                                        ? "border border-gray-600 text-gray-300"
                                        : "border border-[#828282] text-black"
                                }`}
                            >
                                10,000+ Credits
                            </h3>
                            <h3
                                className={`py-2 px-3 md:py-2.5 md:px-4 rounded-full leading-none text-[13px] whitespace-nowrap transition-colors duration-300 ${
                                    isDark
                                        ? "border border-gray-600 text-gray-300"
                                        : "border border-[#828282] text-black"
                                }`}
                            >
                                Negotiable (Bulk Rate)
                            </h3>
                        </div>
                        <div className="flex justify-between items-center">
                            <h1 className="font-bold text-2xl bg-gradient-to-r from-[#FFB347] via-[#FF6B3A] to-[#DD3305] bg-clip-text text-transparent">
                                Custom
                            </h1>

                            <button className="px-4 py-2.5 bg-[#FF6B3A] text-[12px] rounded-full text-white cursor-pointer leading-tight hover:bg-[#FF5520] transition-colors">
                                CONTACT US
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`mt-6 flex gap-3 self-end items-center text-sm font-light px-4 md:px-[2.5%] flex-wrap transition-colors duration-300 ${
                    isDark ? "text-gray-300" : "text-black"
                }`}
            >
                <h3>ADD-ONS</h3>
                <p
                    className={`py-2.5 px-4 rounded-full transition-colors duration-300 ${
                        isDark
                            ? "border border-gray-600 text-gray-400"
                            : "border border-[#828282] text-[#4F4F4F]"
                    }`}
                >
                    Extra credits :{" "}
                    <span className="text-xl font-medium leading-none">
                        $0.15
                    </span>
                    /credit pay as you go
                </p>
                <p
                    className={`py-2.5 px-4 rounded-full transition-colors duration-300 ${
                        isDark
                            ? "border border-gray-600 text-gray-400"
                            : "border border-[#828282] text-[#4F4F4F]"
                    }`}
                >
                    Data enrichment (Audience demographics, Engagement analysis)
                    : Bundle at +20% Plan cost
                </p>
            </div>
        </div>
            <Footer />
</div>
    );
};

export default PricingScreen;
