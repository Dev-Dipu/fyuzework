"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { CheckCircle, Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import apiClient from "@/lib/axiosInstance";
import { authService } from "@/lib/authService";
import ChatHistorySection from "@/components/ChatHistory";
import Filter from "./Filter";
import DashboardComponent from "@/components/DashboardComponent";
import { useTheme } from "@/lib/contexts/ThemeContext";

const getProxiedImageUrl = (instagramUrl, fallbackIndex = 0) => {
    if (!instagramUrl) return "/assets/profile.png";

    const encodedUrl = encodeURIComponent(instagramUrl);

    const proxies = [
        `https://images.weserv.nl/?url=${encodedUrl}`,
        `https://wsrv.nl/?url=${encodedUrl}`,
        `https://imageproxy.pimg.tw/resize?url=${encodedUrl}`,
        instagramUrl,
    ];

    return proxies[fallbackIndex] || instagramUrl;
};

// Separate component that uses useSearchParams
const ChatPageContent = () => {
    // const { isDark, toggleTheme } = useTheme();
    const [isDark, setIsDark] = useState(true);
    const toggleTheme = () => {
        setIsDark((prev) => !prev);
    };
    const prompts = [
        "Find top 10 fashion influencers in Dubai with 100K+ followers",
        "Help me find tech YouTubers for my SaaS product launch",
        "Show me food bloggers in Mumbai who post daily content",
        "Find fitness influencers with high engagement rates in USA",
    ];

    const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");

    const params = useSearchParams();

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId] = useState(`session-${Date.now()}`);
    const [imageErrors, setImageErrors] = useState({});
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const chatContainerRef = useRef(null);
    const router = useRouter();

    const closeDashboard = () => {
        setIsDashboardOpen(false);
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return num?.toString() || "0";
    };

    useEffect(() => {
        console.log(params);
        setMessage(params.get("prompt") || "");

        let promptIndex = 0;
        let charIndex = 0;
        let typing = true;

        const typeSpeed = 30;
        const eraseSpeed = 20;
        const delayBetweenPrompts = 1200;

        const typeAnimation = () => {
            const currentPrompt = prompts[promptIndex];

            if (typing) {
                if (charIndex < currentPrompt.length) {
                    setAnimatedPlaceholder(currentPrompt.substring(0, charIndex + 1));
                    charIndex++;
                    setTimeout(typeAnimation, typeSpeed);
                } else {
                    typing = false;
                    setTimeout(typeAnimation, delayBetweenPrompts);
                }
            } else {
                if (charIndex > 0) {
                    setAnimatedPlaceholder((prev) => prev.slice(0, -1));
                    charIndex--;
                    setTimeout(typeAnimation, eraseSpeed);
                } else {
                    typing = true;
                    promptIndex = (promptIndex + 1) % prompts.length;
                    setTimeout(typeAnimation, 400);
                }
            }
        };

        typeAnimation();

        return () => {
            setAnimatedPlaceholder("");
        };
    }, []);

    useEffect(() => {
        authService.initialize();

        if (!authService.isAuthenticated()) {
            router.push("/auth");
        }
    }, [router]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = { role: "user", text: message };
        const currentMessage = message;

        setMessage("");

        setChatHistory((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await apiClient.post(
                "/functions/v1/find-influencers",
                {
                    session_id: sessionId,
                    message: currentMessage,
                    user_id: authService.getUserId(),
                }
            );

            if (response.data.success) {
                const assistantMessage = {
                    role: "assistant",
                    text: response.data.data.text,
                    influencers: response.data.data.influencers_found || [],
                };
                setChatHistory((prev) => [...prev, assistantMessage]);
            } else {
                throw new Error("API request failed");
            }
        } catch (error) {
            console.error("Error:", error);

            if (error.response?.status === 401) {
                authService.logout();
                return;
            }

            setChatHistory((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: "Sorry, there was an error processing your request. Please try again.",
                    influencers: [],
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const suggestedQueries = [
        {
            img: "/starsgroup.svg",
            text: "Find top 10 influencers on Instagram in Dubai",
        },
        {
            img: "/usermark.svg",
            text: "Help me with crypto launch campaign",
        },
        {
            img: "/crossHair.svg",
            text: "Find fashion influencers who speak french",
        },
    ];

    return (
        <div
            className={`h-screen overflow-hidden inter w-full flex justify-between relative p-6 ${
                isDark ? "bg-[#0D0D0D]" : "bg-[#E2E1DC]"
            }`}
        >
            <div className="absolute top-0 left-0 h-full w-full z-0">
                <Image
                    src="/assets/gradientEdited.svg"
                    fill
                    className="h-full w-full"
                    alt="gradient"
                />
            </div>

            {/* Left Sidebar */}
            <div className="h-full bg-[linear-gradient(244.85deg,rgba(255,255,255,0.2)_-16.54%,rgba(255,255,255,0)_-1.98%,rgba(255,255,255,0.2)_61.94%)] backdrop-blur-[500px] z-10 inter w-[20vw] p-6 border-[.5px] rounded-3xl flex flex-col justify-between">
                <div className="space-y-5">
                    <Image
                        src="/assets/fyuze-logo.svg"
                        alt="fyuze logo"
                        height={80}
                        width={80}
                        className={`${!isDark && "invert"}`}
                    />
                    <button onClick={() => {
                        router.push('/')
                    }} className="text-white uppercase text-xs cursor-pointer flex items-center gap-2.5">
                        <Image className="h-10" src={'/ArrowLeft.svg'} width={22} height={22} />
                        <span>back to home</span>
                    </button>
                    <button
                        onClick={() => {
                            setChatHistory([]);
                            setMessage("");
                        }}
                        className="text-white uppercase text-xs tracking-tighter bg-black w-full gap-2 justify-center py-3 rounded-full flex items-center hover:bg-gray-900 transition"
                    >
                        <Image
                            src="./assets/ChatCircleText.svg"
                            height={20}
                            width={20}
                            alt="chatIcon"
                        />
                        New chat
                    </button>
                    <div>
                        <ChatHistorySection closeDashboard={closeDashboard} isDark={isDark} />
                    </div>
                    <div>
                        <h1
                            onClick={() => setIsDashboardOpen((prev) => !prev)}
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
                                    src="./assets/dashBoard.svg"
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
                                src="./assets/logOut.svg"
                                height={20}
                                width={20}
                                alt="chatIcon"
                            />
                            Log out
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            {!isDashboardOpen && (
                <div
                    className={`h-full relative ${
                        isDark ? "text-white" : "text-black"
                    } w-[72vw] z-10 flex flex-col`}
                >
                    {chatHistory.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="flex flex-col justify-center items-center font-[inter]">
                                <Image
                                    className={`${isDark && "invert"}`}
                                    height={1}
                                    width={30}
                                    src={"/MONOGRAM.svg"}
                                    alt="logo"
                                />
                                <h3 className="text-2xl font-archivo font-semibold mt-2">
                                    Ask Fyuze to find your next Influencer
                                </h3>
                                <p className="w-[56%] text-center text-xs leading-tight mt-5">
                                    AI-powered influencer discovery that filters
                                    by niche, authenticity & ROI so you spend
                                    less time searching and more time growing.
                                </p>
                                <div className="w-[70%] flex gap-5 mt-8 font-light">
                                    {suggestedQueries.map((card, index) => (
                                        <div
  key={index}
  onClick={() => setMessage(card.text)}
  className={`relative w-1/3 px-6 py-4 rounded-[29px] cursor-pointer hover:scale-105 transition border border-transparent backdrop-blur-[500px] overflow-hidden
    ${
      isDark
        ? "bg-[linear-gradient(244.85deg,rgba(255,255,255,0.2)_-16.54%,rgba(255,255,255,0)_-1.98%,rgba(255,255,255,0.2)_61.94%)]"
        : "bg-[linear-gradient(244.85deg,rgba(0,0,0,0.25)_-16.54%,rgba(0,0,0,0)_-1.98%,rgba(0,0,0,0.25)_61.94%)]"
    }`}
>
  {/* 🔹 Custom Border Overlay */}
  <div
    className="w-full h-full absolute top-0 left-0 z-[90] pointer-events-none custom-border"
    style={{ willChange: "opacity, transform" }}
  ></div>

  {/* 🔹 Content */}
  <Image
    height={1}
    width={20}
    src={card.img}
    alt="icon"
    className={`${!isDark && "invert"}`}
  />
  <p className="text-xs mt-1.5 leading-tight">{card.text}</p>
</div>

                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            ref={chatContainerRef}
                            className="flex-1 overflow-y-auto px-8 pt-6 pb-16 space-y-6 scroll-smooth w-6/7 mx-auto"
                        >
                            {chatHistory.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex flex-col ${
                                        msg.role === "user"
                                            ? "items-end"
                                            : "items-start"
                                    } w-full`}
                                >
                                    {msg.role === "assistant" &&
                                        msg.influencers &&
                                        msg.influencers.length > 0 && (
                                            <div className="flex flex-wrap gap-4 mb-4 w-full">
                                                {msg.influencers.map(
                                                    (influ, i) => {
                                                        const imageKey = `${idx}-${i}`;
                                                        const currentFallbackIndex =
                                                            imageErrors[
                                                                imageKey
                                                            ] || 0;
                                                        const proxiedImageUrl =
                                                            getProxiedImageUrl(
                                                                influ.profile_pic_url,
                                                                currentFallbackIndex
                                                            );

                                                        return (
                                                            <div
                                                                key={i}
                                                                className="relative h-80 w-56 rounded-3xl overflow-hidden group cursor-pointer transition-transform hover:scale-105"
                                                            >
                                                                <Image
                                                                    src={
                                                                        proxiedImageUrl
                                                                    }
                                                                    alt={
                                                                        influ.full_name
                                                                    }
                                                                    fill
                                                                    className="absolute h-full w-full top-0 left-0 object-cover"
                                                                    onError={(
                                                                        e
                                                                    ) => {
                                                                        const nextIndex =
                                                                            currentFallbackIndex +
                                                                            1;
                                                                        if (
                                                                            nextIndex <
                                                                            4
                                                                        ) {
                                                                            setImageErrors(
                                                                                (
                                                                                    prev
                                                                                ) => ({
                                                                                    ...prev,
                                                                                    [imageKey]:
                                                                                        nextIndex,
                                                                                })
                                                                            );
                                                                        }
                                                                    }}
                                                                />
                                                                <div className="absolute h-full w-full top-0 left-0">
                                                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
                                                                </div>

                                                                <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2">
                                                                    <div className="flex gap-0.5 items-center">
                                                                        <h3 className="text-white font-bold text-[10px] leading-tight line-clamp-1">
                                                                            {
                                                                                influ.full_name
                                                                            }
                                                                        </h3>
                                                                        {influ.is_verified && (
                                                                            <div className="p-1.5">
                                                                                <Image
                                                                                    src={
                                                                                        "/sealCheck.svg"
                                                                                    }
                                                                                    alt="check"
                                                                                    width={
                                                                                        14
                                                                                    }
                                                                                    height={
                                                                                        1
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                    <p className="text-gray-300 text-[9px] leading-tight line-clamp-2 mb-1">
                                                                        {
                                                                            influ.bio
                                                                        }
                                                                    </p>

                                                                    <div className="flex items-center justify-between text-white text-xs">
                                                                        <div className="flex flex-col">
                                                                            <span className="font-semibold">
                                                                                {formatNumber(
                                                                                    influ.followers
                                                                                )}
                                                                            </span>
                                                                            <span className="text-gray-400 text-[9px]">
                                                                                Followers
                                                                            </span>
                                                                        </div>

                                                                        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                                                            <span className="text-[9px]">
                                                                                @
                                                                                {
                                                                                    influ.username
                                                                                }
                                                                            </span>
                                                                            <svg
                                                                                width="12"
                                                                                height="12"
                                                                                viewBox="0 0 12 12"
                                                                                fill="none"
                                                                                className="opacity-70"
                                                                            >
                                                                                <path
                                                                                    d="M10 4L6 8L2 4"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-3xl transition-all pointer-events-none" />
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        )}

                                    <div
                                        className={`max-w-[80%] px-6 py-4 rounded-2xl ${
                                            msg.role === "user"
                                                ? "bg-white/10 backdrop-blur-md"
                                                : "bg-[linear-gradient(244.85deg,rgba(255,255,255,0.2)_-16.54%,rgba(255,255,255,0)_-1.98%,rgba(255,255,255,0.2)_61.94%)] backdrop-blur-[500px] border border-white/10"
                                        }`}
                                    >
                                        <p className="text-xs leading-relaxed whitespace-pre-wrap">
                                            {msg.text}
                                        </p>
                                        {msg.influencers &&
                                            msg.influencers.length > 0 && (
                                                <div className="mt-4 space-y-2">
                                                    <p className="text-[9px] text-[#C1C1C1]">
                                                        Found{" "}
                                                        {msg.influencers.length}{" "}
                                                        influencers
                                                    </p>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="max-w-[80%] px-6 py-4 rounded-2xl bg-[linear-gradient(244.85deg,rgba(255,255,255,0.2)_-16.54%,rgba(255,255,255,0)_-1.98%,rgba(255,255,255,0.2)_61.94%)] backdrop-blur-[500px] border border-white/10">
                                        <p className="text-xs">
                                            Searching for influencers...
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Input Area */}
                    <div
                        className="w-4/5 mx-auto mb-6 pointer-events-auto relative"
                        style={{ willChange: "opacity, transform" }}
                    >
                        <div
                            className={`absolute h-[88vh] w-full pb-22 rounded-t-4xl flex flex-col justify-end px-6 py-2.5 font-[inter] font-medium ${
                                isDark ? "bg-[#060606]" : "bg-white"
                            } ${
                                isFilterOpen ? "-top-[80vh]" : "-top-10"
                            } transition-all duration-300`}
                            style={{
                                clipPath: `${
                                    isFilterOpen
                                        ? "inset(0 0 0% 0)"
                                        : "inset(0 0 90% 0)"
                                }`,
                            }}
                        >
                            <div className="flex h-fit items-end justify-between gap-1 cursor-pointer hover:text-white transition">
                                <Image
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    src="/X.svg"
                                    height={20}
                                    width={20}
                                    alt="Close filter modal"
                                    className={`cursor-pointer w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] ${isFilterOpen ? 'opacity-100 hover:opacity-70' : 'opacity-0 pointer-events-none'} md:w-[22px] md:h-[22px] flex-shrink-0`}
                                />
                                <div className="flex items-center gap-2">
                                    <Image
                                        height={1}
                                        width={20}
                                        src={"/faders-in.svg"}
                                        alt="faders"
                                    />
                                    <h4 onClick={() => setIsFilterOpen(!isFilterOpen)}
                                        className="text-sm font-medium text-[#C5C5C5]">
                                    Search with advanced filters
                                    </h4>
                                </div>
                            </div>
                            <div className="h-full w-full text-white z-[400] overflow-y-auto">
                                <div className="pt-2 sm:pt-3">
                                    <h1 className="font-semibold tracking-tight text-sm sm:text-base md:text-lg">
                                        Location
                                    </h1>
                                    <div className="pt-2 sm:pt-3">
                                        <p className="tracking-tight pb-1.5 text-[9px] sm:text-[10px]">
                                            Brief Description of what you are
                                            looking for
                                        </p>
                                        <input
                                            type="text"
                                            className="py-1.5 sm:py-2 md:py-4.5 px-3 sm:px-4 md:px-5 bg-[#1a1a1a] rounded-lg sm:rounded-xl w-full text-xs text-white border-none outline-none"
                                            placeholder="Enter description..."
                                        />
                                    </div>

                                    <div className="py-2 sm:py-3 md:py-6 flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6">
                                      <div className="w-full">
                                        <div className="flex pb-1.5 items-center gap-1">
                                          <Image 
                                            src="/map-pin.svg" 
                                            height={13} 
                                            width={13} 
                                            alt="Location pin icon"
                                            className="w-[11px] h-[11px] sm:w-[13px] sm:h-[13px]"
                                          />
                                          <h1 className="text-[9px] sm:text-[10px]">Location</h1>
                                        </div>
                                        <input
                                          type="text"
                                          className="py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 md:px-5 bg-[#1a1a1a] rounded-lg sm:rounded-xl w-full text-[10px] sm:text-xs text-white border-none outline-none"
                                          placeholder="Enter location..."
                                        />
                                      </div>
                            
                                      <div className="w-full">
                                        <div className="flex pb-1.5 items-center gap-1">
                                          <Image 
                                            src="/sealCheck.svg" 
                                            height={13} 
                                            width={13} 
                                            alt="Verification badge icon"
                                            className="w-[11px] h-[11px] sm:w-[13px] sm:h-[13px]"
                                          />
                                          <h1 className="text-[9px] sm:text-[10px]">Verification</h1>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                          <p className="py-2.5 px-10 rounded-full border-[1px] border-white text-[9px] sm:text-[10px] cursor-pointer hover:bg-white hover:text-black transition-colors">
                                            All
                                          </p>
                                          <p className="py-2.5 px-10 rounded-full border-[1px] border-white text-[9px] sm:text-[10px] cursor-pointer hover:bg-white hover:text-black transition-colors">
                                            Verified
                                          </p>
                                          <p className="py-2.5 px-10 rounded-full border-[1px] border-white text-[9px] sm:text-[10px] cursor-pointer hover:bg-white hover:text-black transition-colors whitespace-nowrap">
                                            Un-Verified
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                </div>

                                <div className="pt-2 sm:pt-3">
                                    <div className="flex pb-1.5 items-center gap-1">
                                      <Image 
                                        src="/sort-asc.svg" 
                                        height={16} 
                                        width={16} 
                                        alt="Sort ascending icon"
                                        className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px]"
                                      />
                                      <h1 className="font-semibold tracking-tight text-sm sm:text-base md:text-lg">Category</h1>
                                    </div>
                                    <p className="font-medium tracking-tight text-[8px] sm:text-[9px] pb-2 pt-1 opacity-70">
                                        POPULAR CATEGORIES
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pb-2 sm:pb-3">
                                        {[
                                            "Food",
                                            "Fitness",
                                            "Tech",
                                            "Design",
                                        ].map((item, index) => (
                                            <p
                                                key={index}
                                                className="tracking-tight py-2.5 px-10 border-[1px] border-white rounded-full text-[9px] sm:text-[10px] cursor-pointer hover:bg-white hover:text-black transition-colors"
                                            >
                                                {item}
                                            </p>
                                        ))}
                                    </div>
                                    <input
                                        placeholder="Browse 20+ more category"
                                        className="py-1.5 sm:py-2 md:py-4.5 px-3 sm:px-4 md:px-5 bg-[#1a1a1a] w-full tracking-tight rounded-lg sm:rounded-xl text-[10px] sm:text-xs text-white border-none outline-none"
                                    />
                                </div>

                                <div className="h-[1px] w-full bg-white mt-8 mb-4 opacity-50"></div>

                                <div className="pt-2 sm:pt-3">
                                    <h1 className="font-semibold tracking-tight text-sm sm:text-base md:text-lg pb-2 sm:pb-3">
                                        Audience
                                    </h1>

                                    <div className="flex flex-col lg:flex-row items-start gap-3 sm:gap-4 lg:gap-6">
                                      <div className="w-full lg:w-1/2">
                                        <div className="flex pb-1.5 items-center gap-1">
                                          <Image 
                                            src="/map-pin.svg" 
                                            height={13} 
                                            width={13} 
                                            alt="Location pin icon"
                                            className="w-[11px] h-[11px] sm:w-[13px] sm:h-[13px]"
                                          />
                                          <h1 className="text-[9px] sm:text-[10px]">Follower range</h1>
                                        </div>
                                        <div className="flex gap-2 sm:gap-3">
                                          <input
                                            placeholder="Min"
                                            type="text"
                                            className="py-2.5 px-5 bg-[#1a1a1a] rounded-lg sm:rounded-xl w-full text-[10px] sm:text-xs text-white border-none outline-none"
                                          />
                                          <input
                                            placeholder="Max"
                                            type="text"
                                            className="py-2.5 px-5 bg-[#1a1a1a] rounded-lg sm:rounded-xl w-full text-[10px] sm:text-xs text-white border-none outline-none"
                                          />
                                        </div>
                                      </div>
                            
                                      <div className="w-full lg:w-1/2">
                                        <div className="flex pb-1.5 items-center gap-1">
                                          <Image 
                                            src="/sealCheck.svg" 
                                            height={13} 
                                            width={13} 
                                            alt="Verification badge icon"
                                            className="w-[11px] h-[11px] sm:w-[13px] sm:h-[13px]"
                                          />
                                          <h1 className="text-[9px] sm:text-[10px]">Gender</h1>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                          <p className="py-2.5 px-10 border-[1px] rounded-full text-[9px] sm:text-[10px] cursor-pointer hover:bg-white hover:text-black transition-colors">
                                            Any
                                          </p>
                                          <p className="py-2.5 px-10 border-[1px] rounded-full text-[9px] sm:text-[10px] cursor-pointer hover:bg-white hover:text-black transition-colors">
                                            Male
                                          </p>
                                          <p className="py-2.5 px-10 border-[1px] rounded-full text-[9px] sm:text-[10px] cursor-pointer hover:bg-white hover:text-black transition-colors">
                                            Female
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="pt-3 sm:pt-4">
                                      <div className="flex pb-1.5 items-center gap-1">
                                        <Image 
                                          src="/map-pin.svg" 
                                          height={13} 
                                          width={13} 
                                          alt="Location pin icon"
                                          className="w-[11px] h-[11px] sm:w-[13px] sm:h-[13px]"
                                        />
                                        <h1 className="text-[9px] sm:text-[10px]">Age range</h1>
                                      </div>
                                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {["18-25y", "25-35y", "35-45y", "45-55y", "55-65y", "65+"].map((age, index) => (
                                          <p
                                            key={index}
                                            className="py-2.5 px-10 border-[1px] rounded-full text-[9px] sm:text-[10px] cursor-pointer hover:bg-white hover:text-black transition-colors whitespace-nowrap"
                                          >
                                            {age}
                                          </p>
                                        ))}
                                      </div>
                                    </div>
                                </div>

                                <div className="pt-3 sm:pt-4 mt-2 sm:mt-3">
                                    <button className="w-full sm:w-auto px-10 sm:px-16 md:px-20 py-1.5 sm:py-2 md:py-2.5 bg-white/30 rounded-full text-[9px] sm:text-[10px] md:text-xs font-medium cursor-pointer hover:bg-white/40 transition-colors">
                                        Apply and send
                                    </button>
                                </div>
                            </div>
                        </div>
                        <input
                            type="text"
                            placeholder={animatedPlaceholder || " "}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading}
                            className="w-[70%] h-full absolute z-90 outline-none text-white bg-transparent placeholder:text-[#5D5D5D] placeholder:font-[inter] ml-18 transition-all text-xs"
                        />

                        <div
                            className={`relative ${
                                isDark ? "bg-[#0D0D0D]" : "bg-[#E2E1DC]"
                            } w-full flex justify-between items-center p-5 h-full rounded-[28px] backdrop-blur-[120px] z-80`}
                            style={{ willChange: "opacity, filter, transform" }}
                        >
                            <div>
                                <Image
                                    height={1}
                                    width={40}
                                    src={"/circlemonologo.svg"}
                                    alt="logo"
                                />
                            </div>
                            <div
                                className="flex items-center gap-3"
                                style={{ willChange: "opacity, transform" }}
                            >
                                <div
                                    className={`relative flex items-center justify-center p-3 rounded-2xl icon-gradient cursor-pointer hover:scale-105 transition ${
                                        !isDark && "invert"
                                    }`}
                                    style={{ willChange: "opacity, transform" }}
                                >
                                    <div
                                        className="relative w-5 h-5"
                                        style={{
                                            willChange: "opacity, transform",
                                        }}
                                    >
                                        <Image
                                            src="/assets/clip.svg"
                                            alt="logo"
                                            fill
                                            className="object-contain"
                                            style={{
                                                willChange:
                                                    "opacity, transform",
                                            }}
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={handleSendMessage}
                                    disabled={isLoading || !message.trim()}
                                    className={`relative flex items-center justify-center p-3 rounded-2xl icon-gradient cursor-pointer hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed ${
                                        !isDark && "invert"
                                    }`}
                                    style={{ willChange: "opacity, transform" }}
                                >
                                    <div
                                        className="relative w-5 h-5"
                                        style={{
                                            willChange: "opacity, transform",
                                        }}
                                    >
                                        <Image
                                            src="/assets/arrow.svg"
                                            alt="logo"
                                            fill
                                            className="object-contain"
                                            style={{
                                                willChange:
                                                    "opacity, transform",
                                            }}
                                        />
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div
                            className="w-full absolute top-0 left-0 overflow-hidden custom-border h-full z-90 pointer-events-none"
                            style={{ willChange: "opacity, transform" }}
                        ></div>
                    </div>
                </div>
            )}
            {isDashboardOpen && <DashboardComponent />}

            {/* Right Sidebar */}
            <div className="h-full z-10 w-[8vw] flex flex-col justify-between items-end">
                <div className="flex flex-col gap-4">
                    <button className="hover:scale-110 transition">
                        <Image
                            src="./assets/linkIcon.svg"
                            height={50}
                            width={50}
                            alt="chatIcon"
                        />
                    </button>
                    <button className="hover:scale-110 transition">
                        <Image
                            src="./assets/linkMagnifying.svg"
                            height={50}
                            width={50}
                            alt="chatIcon"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main export with Suspense wrapper
const ChatPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChatPageContent />
        </Suspense>
    );
};

export default ChatPage;